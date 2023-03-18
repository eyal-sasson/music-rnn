---
title: Play
layout: default
nav_order: 2
---

Enter seed (leave blank for random):
<input type="text" class="input" id="seed" placeholder="###"
    pattern="\d{1,3}" oninput="setCustomValidity('')">

---

### Choose a dataset:

- [<i class="fa-solid fa-star"></i> The Nottingham Music Database](javascript:getMusic("abcsourceforge")){: .btn .btn-blue} \
    American and British folk tunes. Recommended, gives best results.

- [FolkWiki](javascript:getMusic("folkwiki")){: .btn} \
    Swedish / Nordic folk music.

- [French Trad](javascript:getMusic("tradfrance")){: .btn} \
    Traditional French music.

- [The Old Music Project](javascript:getMusic("oldmusic")){: .btn} \
    Irish music.

- [Serpent Publications](javascript:getMusic("serpent")){: .btn} \
    Renaissance-like music. Doesn't work well with large seeds; try manually setting one or two digits.

- [Le Grand Session de Manchester](javascript:getMusic("lesession")){: .btn} \
    Mainly traditional Irish and French tunes.

---

<div id="music">
<pre id="notes"></pre>
<span id="caret" class="hidden animate"></span>
<div id="sheet"></div>
<div id="audio"></div>
</div>

[<i class="fa-solid fa-arrows-rotate"></i> Convert](javascript:convert()){: #convert .btn .btn-primary .hidden}

<script src="https://cdn.jsdelivr.net/npm/abcjs@6.1.9/dist/abcjs-basic-min.js"></script>
<script src="{{ '/assets/js/util.js' | relative_url }}"></script>

