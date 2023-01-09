import json
import numpy as np
from common import change_key_to_int, lectures, lectures_per_page
from typing import Union
from operator import itemgetter
from pydantic import BaseModel
from fastapi import APIRouter

router = APIRouter()

with open("src/lecture_vectors.json") as f:
    lecture_vectors = json.load(f)

with open("src/faculty_indices.json") as f:
    faculty_indices = json.load(f)
    
with open("src/duplicated.json") as f:
    duplicated = json.load(f)

def change_value_to_set(dic):
    for key, value in dic.items():
        dic[key] = set(value)

change_key_to_int(faculty_indices)
change_key_to_int(duplicated)
change_value_to_set(faculty_indices)
change_value_to_set(duplicated)

class Taste(BaseModel):
    favorites: list[int]
    unfavorites: Union[list[int], None] = None
    faculty_id: int = 0
    page: int = 1

lecture_vectors = np.array(list(lecture_vectors.values()))

@router.post("/recommend")
def get_recommendation(taste: Taste):
    favorites = taste.favorites
    unfavorites = taste.unfavorites
    fac_id = taste.faculty_id
    page = taste.page
    
    invalid_indices = set(favorites)

    user_vector = lecture_vectors[favorites].sum(axis=0)
    if unfavorites:
        user_vector -= lecture_vectors[unfavorites].sum(axis=0)
        invalid_indices |= set(unfavorites)
    
    for idx in invalid_indices.copy():
        if idx in duplicated:
            invalid_indices |= duplicated[idx]
    
    valid_indices = faculty_indices[fac_id] - invalid_indices
    
    score_vec = np.dot(lecture_vectors, user_vector)
    indices = [idx for idx in np.argsort(-score_vec) if idx in valid_indices]
    
    page_indices = indices[(page - 1) * lectures_per_page : page * lectures_per_page]
    if page_indices: 
        return list(itemgetter(*page_indices)(lectures))
    
    return None
