from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from utils import generate_prefix_tree
from utils import read_all_csv_files 
from Trie import Trie
import uvicorn


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

# generating the prefix tree using the darija dataset
darija_dataset: list[dict] = read_all_csv_files('dataset')
darija_prefix_tree: Trie   = generate_prefix_tree(darija_dataset)





@app.get("/")
async def home():
    return {"hello": "world!!"}



@app.get("/words/{id}")
async def get_word(id: int):
    words: list = []
    eng_translation: str = ""

    for i in darija_dataset[id].keys():
        if i == "eng":
            eng_translation = darija_dataset[id][i]
        else:
            if not darija_dataset[id][i] == "":
                words.append(darija_dataset[id][i])

    return {"similar_words": words, "translation": eng_translation }





@app.get("/search/{prefix}")
async def complete_prefix(prefix: str, limit: int = 10):
    result: list = darija_prefix_tree.complete_prefix(prefix)

    return result[:limit]





if __name__ == "__main__":
    uvicorn.run(
            app="main:app", 
            host="localhost", 
            port=3300, 
            reload=True
        )

