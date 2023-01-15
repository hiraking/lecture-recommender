import json
import numpy as np
from common import change_key_to_int, lectures, lectures_per_page, get_lectures_from_indices
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

with open("src/semester_indices.json") as f:
    semester_indices = json.load(f)

def change_value_to_set(dic):
    for key, value in dic.items():
        dic[key] = set(value)

change_key_to_int(faculty_indices)
change_key_to_int(duplicated)
change_key_to_int(semester_indices)
change_value_to_set(faculty_indices)
change_value_to_set(duplicated)
change_value_to_set(semester_indices)

class Tastes(BaseModel):
    favorites: list[int]
    unfavorites: Union[list[int], None] = []
    faculty_ids: list[int]
    semester_ids: list[int]
    page: int = 1
    
class TastesID(BaseModel):
    favorites: list[int]
    unfavorites: Union[list[int], None] = []

lecture_vectors = np.array(list(lecture_vectors.values()))

@router.post("/recommend")
def get_recommendation(tastes: Tastes):
    favorites = tastes.favorites
    unfavorites = tastes.unfavorites
    fac_ids = tastes.faculty_ids
    sem_ids = tastes.semester_ids
    page = tastes.page
    
    valid_indices = set.union(*[semester_indices[i] for i in sem_ids]).intersection(set.union(*[faculty_indices[i] for i in fac_ids]))
    invalid_indices = set(favorites)

    user_vector = lecture_vectors[favorites].sum(axis=0)
    if unfavorites:
        user_vector -= lecture_vectors[unfavorites].sum(axis=0)
        invalid_indices |= set(unfavorites)
    
    for idx in invalid_indices.copy():
        if idx in duplicated:
            invalid_indices |= duplicated[idx]
    
    valid_indices -= invalid_indices
    
    score_vec = np.dot(lecture_vectors, user_vector)
    indices = [idx for idx in np.argsort(-score_vec) if idx in valid_indices]
    
    page_indices = indices[(page - 1) * lectures_per_page : page * lectures_per_page]
    
    return {"hits" : len(indices), "lectures" : get_lectures_from_indices(page_indices)}

@router.post("/get")
def get_lectures(tastesID : TastesID):
    favorites = tastesID.favorites
    unfavorites = tastesID.unfavorites
    return {"favorites" : get_lectures_from_indices(favorites), 
            "unfavorites" : get_lectures_from_indices(unfavorites)}
