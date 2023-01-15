import json
import re
import unicodedata
from operator import itemgetter
from collections import defaultdict
from pydantic import BaseModel
from fastapi import APIRouter
from common import change_key_to_int, lectures, lectures_per_page, get_lectures_from_indices

router = APIRouter()

with open("src/title_index.json", "r") as f:
    title_index = json.load(f)
    
with open("src/name_index.json", "r") as f:
    name_index = json.load(f)
    
with open("src/main_index.json", "r") as f:
    main_index = json.load(f)
    
with open("src/text_by_faculty.json", "r") as f:
    text_data = json.load(f)

change_key_to_int(title_index)  
change_key_to_int(name_index)
change_key_to_int(main_index)
change_key_to_int(text_data)

class SearchQuery(BaseModel):
    query: str
    faculty_id: int = 0
    page: int = 1

query_split_pattern = re.compile("[ 　,、・]")

@router.get("/search")
def search_test():
    return {"hits": 100, "lectures": [lectures[100]]}

@router.post("/search")
def search(search_query: SearchQuery):
    fac_id = search_query.faculty_id
    page = search_query.page
    result = defaultdict(int)
    qlist = re.split(query_split_pattern, unicodedata.normalize("NFKC", search_query.query).upper())
    
    main = main_index[fac_id]
    title = title_index[fac_id]
    name = name_index[fac_id]
    texts = text_data[fac_id]
    
    for q in qlist:
        if not q:
            continue
            
        if q not in main:
            for i in [idx for idx, text in texts if q in text]:
                result[i] += 1
            continue
            
        for i in main[q]:
            result[i] += 1
        
        if q in title:
            for i in title[q]:
                result[i] += 3
                
        if q in name:
            for i in name[q]:
                result[i] += 3
    
    indices = sorted(result.keys(), key=result.get, reverse=True)

    page_indices = indices[(page - 1) * lectures_per_page : page * lectures_per_page]

    return {"hits" : len(indices), "lectures" : get_lectures_from_indices(page_indices)}
