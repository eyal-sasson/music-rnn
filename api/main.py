from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run
import os
import tensorflow as tf
from tensorflow import keras
from random import randint
import numpy as np

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models_dir = "../models"
datasets = [f.name for f in os.scandir(models_dir) if f.is_dir()]
print(f"Datasets: {datasets}")

def load_models_and_maps():
    models = {}
    maps = {}
    for dataset in datasets:
        print(f"Loading {dataset}...")
        models[dataset] = keras.models.load_model(f"{models_dir}/{dataset}/model.h5")
        idx2char = np.load(f"{models_dir}/{dataset}/idx2char.npy")
        char2idx = {v: k for k,v in enumerate(idx2char)}
        maps[dataset] = (char2idx, idx2char)
    return models, maps

print("Loading models and maps...")
models, maps = load_models_and_maps()
print("Done loading models and maps.")

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/generate/{dataset}")
async def generate(dataset: str, string: str = None, length: int = 10):
    if dataset not in datasets:
        return {"message": "Invalid dataset"}
    string = string or f"X: {randint(1, 100)}"
    model = models[dataset]
    char2idx, idx2char = maps[dataset]
    return {"message": generate_text(model, char2idx, idx2char, string, length)}

def generate_text(model, char2idx, idx2char, start_string, generation_length):
  text = start_string

  for i in range(generation_length):
    input = tf.expand_dims([char2idx[s] for s in text], 0)
    predictions = model.predict(input, verbose=0)
    predicted_id = predictions[0, -1].argmax()
    text += idx2char[predicted_id]
    
  return text

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    run(app, host="0.0.0.0", port=port)

