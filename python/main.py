import time
import json
import numpy as np
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://lecture-recommender.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Taste(BaseModel):
    favorites: list[int]

records_json = open("../records.json", "r")
records = json.load(records_json)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

@app.get("/")
def root():
    return {"fastapi": "success!"}

sample_mat = np.random.random(size=(3000, 100))

@app.post("/test")
def post_test(taste: Taste):
    user_vector = sample_mat[taste.favorites].mean(axis=0)
    scores = np.dot(sample_mat, user_vector)
    ret = np.argsort(-scores)
    return list(map(int, ret[:10]))

@app.get("/test")
def test_json():
    return records
