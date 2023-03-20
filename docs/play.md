---
title: Play
layout: default
nav_order: 2
---

# Try the model

---

Enter seed (leave blank for random):
<input type="text" class="input" id="seed" placeholder="###"
    pattern="\d{1,3}" oninput="setCustomValidity('')">

---

### Choose a dataset:

- [<i class="fa-solid fa-star"></i> The Nottingham Music Database](javascript:getMusic("abcsourceforge")){: .btn .btn-blue} \
    [American and British folk tunes](data#the-nottingham-music-database). Recommended, gives best results.

- [Israeli Dances](javascript:getMusic("isra")){: .btn} \
    [Israeli folk and dance music](data#israeli-dances). Results may not be original.

- [FolkWiki](javascript:getMusic("folkwiki")){: .btn} \
    [Swedish / Nordic folk music](data#folkwiki).

- [The Old Music Project](javascript:getMusic("oldmusic")){: .btn} \
    [Irish music](data#the-old-music-project).

- [Le Grand Session de Manchester](javascript:getMusic("lesession")){: .btn} \
    [Mainly traditional Irish and French tunes](data#le-grand-session-de-manchester).

- [French Trad](javascript:getMusic("tradfrance")){: .btn} \
    [Traditional French music](data#french-trad). Doesn't work well with large seeds; try manually setting a seed under 100.

- [Serpent Publications](javascript:getMusic("serpent")){: .btn} \
    [Renaissance-like music](data#serpent-publications). Same as above, better results with smaller seeds.

---

<div id="music">
<pre id="notes"></pre>
<span id="caret" class="hidden animate"></span>
<div id="sheet"></div>
<div id="audio"></div>
</div>

[<i class="fa-solid fa-arrows-rotate"></i> Convert](javascript:convert()){: #convert .btn .btn-primary .hidden}
<div id="download" class="btn btn-green hidden"><i class="fa-solid fa-download"></i> Download</div>

<script src="https://cdn.jsdelivr.net/npm/abcjs@6.1.9/dist/abcjs-basic-min.js"></script>
<script src="{{ '/assets/js/util.js' | relative_url }}"></script>

