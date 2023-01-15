import json
from operator import itemgetter

lectures_per_page = 10

def change_key_to_int(dic):
    old_keys = list(dic.keys())
    for key in old_keys:
        try:
            new_key = int(key)
        except:
            new_key = key
        dic[new_key] = dic.pop(key)

with open("src/lectures.json",  "r") as f:
    lectures = json.load(f)

def get_lectures_from_indices(indices):
    if len(indices) == 0:
        return []
    elif len(indices) == 1:
        return [lectures[indices[0]]]
    else:
        return list(itemgetter(*indices)(lectures))
