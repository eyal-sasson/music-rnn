# [MusicRNN](https://mrnn.sasson.ml/)

[![Deploy Jekyll site to Pages](https://github.com/eyal-sasson/music-rnn/actions/workflows/pages.yml/badge.svg)](https://github.com/eyal-sasson/music-rnn/actions/workflows/pages.yml)

**MusicRNN** is a [recurrent neural network](https://en.wikipedia.org/wiki/Recurrent_neural_network) that generates music notes in the [ABC notation](https://en.wikipedia.org/wiki/Recurrent_neural_network) format.
Using a simple RNN model written in Python using Keras, and trained on scraped data, the network is able to generate formatted text which can later be converted to actual audio.

---

This repository consists of 3 main parts:

### Jupyter Notebooks

1. [Data Scraping](Data_Scraping.ipynb), showing the data acquisition process, and minimal preprocessing.
1. [MusicRNN](MusicRNN.ipynb), containing an example of training the model on a specific dataset.

### Backend

Found in the [api](api/) directory.

A simple Python FastAPI server, responding to GET requests at `/[dataset]` with a random string generated with the model trained on the dataset.

Query parameters available: 
 - `string`: The starting string passed as an input to the model.
 - `length`: The number of characters to generate at the end of the starting string.
 
The server is deployed on Google Cloud and can be accessed [here](https://gen.musicrnn.eu.org/) (remember to include a dataset name at the end of the URL).

### Frontend

A [Jekyll](https://github.com/jekyll/jekyll) website (written in Markdown) including JavaScript code to fetch a generation from the backend URL.

The website is hosted on GitHub Pages, and is available [here](https://mrnn.sasson.ml/).
