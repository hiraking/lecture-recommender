import json

lectures_per_page = 15

def change_key_to_int(dic):
    old_keys = list(dic.keys())
    for key in old_keys:
        try:
            new_key = int(key)
        except:
            new_key = key
        dic[new_key] = dic.pop(key)


with open("src/ug_lectures.json",  "r") as f:
    lectures = json.load(f)

