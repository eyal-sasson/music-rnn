---
title: Data
layout: default
nav_order: 3
---

# Data

All data is in the [ABC Notation] format. ABC notation is a widely-used music notation format that has its origins in the folk music communities of the 1970s. It was developed as a way of recording and sharing traditional tunes in a simple, easy-to-read format that could be easily printed or shared online. Since its creation, ABC notation has become a standard way of representing traditional music in many parts of the world, and has been used to transcribe thousands of tunes and songs. Today, it is commonly used by musicians and enthusiasts alike, and has played a significant role in the preservation and dissemination of traditional music.
(Written by [ChatGPT](https://chat.openai.com/)).
{: .text-justify}

The model was trained on multiple datasets. All datasets, except [Israeli Dances](#israeli-dances), were scraped from the [ABC Notation website][ABC].
The notebook showing the scraping process can be found [here](https://github.com/eyal-sasson/music-rnn/blob/main/Data_Scraping.ipynb).

## [The Nottingham Music Database](https://abc.sourceforge.net/NMD/)

The Nottingham Database is a collection of over 1200 British and American folk tunes.
It was first created by Eric Foxley and then converted to ABC notation by James Allwright.

The music is available on the [ABC Notation website](https://abcnotation.com/searchTunes?q=site:abc.sourceforge.net/NMD).

## [Israeli Dances](https://ifdo.ca/~seymour/runabc/top.html)

A collection of Israeli dance tunes, contributed by Seymour Shlien. All tunes can be [downloaded together](https://ifdo.ca/~seymour/runabc/isra.abc) directly from Seymour's website. The music is also available on the [ABC Notation website](https://abcnotation.com/searchTunes?q=site:ifdo.ca/~seymour/runabc).

## [FolkWiki](http://www.folkwiki.se/)

FolkWiki is a wiki website with Swedish and Nordic folk music. It is community maintained and includes a large amount of songs (5000+), although the model was trained on a portion of them.
The music is also available on the [ABC Notation website](https://abcnotation.com/searchTunes?q=site:www.folkwiki.se).

## [The Old Music Project](http://www.oldmusicproject.com/oneils1.html)

The Old Music Project is a transcription of the book "O'Neill's Music of Ireland". Available for listen on the [ABC Notation website](https://abcnotation..com/searchTunes?q=site:www.oldmusicproject.com).

## [The Lesession Collections](http://www.lesession.co.uk/music/)

The Lessesion Collections includes a few traditional Irish and French music collections, such as [Le Grand Session de Manchester](http://www.lesession.co.uk/music/lgsdmweb.abc) and [The woodenflute mailing list](http://www.lesession.co.uk/music/woodenflute.abc). The collections can be downloaded one by one from the Lesession website, and are also available on the [ABC Notation Website](https://abcnotation.com/searchTunes?q=site:www.Lesession.co.uk/music).

## [French Trad](http://www.tradfrance.com/)

French Trad is a website with a collection of traditional French tunes, such as Christmas songs and festival music. The songs aren't well organized on the website itself, but are available on the [ABC Notation website](https://abcnotation.com/searchTunes?q=site:www.tradfrance.com).

## [Serpent Publications](http://serpentpublications.org/)

Serpent Publications is a collection of mostly Renaissance music, but also includes more modern music, mainly French. The songs can be downloaded one by one in different formats, including ABC, from the Serpent Publications website.
The music is available on the [ABC Notation website](https://abcnotation.com/searchTunes?q=site:serpentpublications.org).

[ABC]: https://abcnotation.com
[ABC Notation]: https://en.wikipedia.org/wiki/ABC_notation
