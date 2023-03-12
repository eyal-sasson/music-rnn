from fastapi import FastAPI
from uvicorn import run
import os
import tensorflow as tf
from tensorflow import keras
import random
import json
import numpy as np

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/generate/{dataset}")
async def generate(dataset: str):
    model = keras.models.load_model(dataset + ".h5")
    char2idx, idx2char = load_maps(dataset)
    seed = random.randint(0, 100)
    return generate_text(model, char2idx, idx2char, f"X:{seed}")

def load_maps(dataset):
    with open(dataset + "_char2idx.json", "r") as f:
        char2idx = json.load(f)
    idx2char = np.array(sorted(set(char2idx.keys())))
    return char2idx, idx2char

def generate_text(model, char2idx, idx2char, start_string, generation_length=1000):
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

