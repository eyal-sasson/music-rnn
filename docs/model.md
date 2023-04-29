---
title: Model
layout: default
nav_order: 4
---

# Model

The model used to generate the music is an [RNN] written in the [Keras](https://keras.io/) Python library.

A Recurrent Neural Network (RNN) is a type of artificial neural network designed to process sequential data such as text, speech, or time series data. Unlike traditional feedforward neural networks, RNNs have a memory component that allows them to maintain an internal state and take into account previous inputs when making predictions or generating outputs. This makes them particularly useful for applications such as language modeling, speech recognition, and machine translation. RNNs can be trained using backpropagation through time (BPTT) algorithm which allows them to learn long-term dependencies in the data.
(Written by [ChatGPT](https://chat.openai.com/)).
{: .text-justify}

You can run the model in [Google Colab], including a guided walkthrough of the training process, 
[here](https://colab.research.google.com/github/eyal-sasson/music-rnn/blob/main/MusicRNN.ipynb).
Also check out the complementary [data scraping notebook](https://colab.research.google.com/github/eyal-sasson/music-rnn/blob/main/Data_Scraping.ipynb).

[RNN]: https://en.wikipedia.org/wiki/Recurrent_neural_network
[Google Colab]: https://colab.research.google.com/
