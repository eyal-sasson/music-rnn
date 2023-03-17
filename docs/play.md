---
title: Play
layout: default
---

Enter seed (leave blank for random):
<input type="text" class="input" id="seed" placeholder="###"
    pattern="\d{1,3}" oninput="setCustomValidity('')">

Choose a dataset:

[The Nottingham Music Database](javascript:getMusic("abcsourceforge")){: .btn .btn-blue} - Recommended, gives best results.

[FolkWiki](javascript:getMusic("folkwiki")){: .btn}

[French Trad](javascript:getMusic("tradfrance")){: .btn}

[The Old Music Project](javascript:getMusic("oldmusic")){: .btn}

[Serpent Publications](javascript:getMusic("serpent")){: .btn} - Doesn't like large seeds; try manually setting one or two digits.

[Le Grand Session de Manchester](javascript:getMusic("lesession")){: .btn}

<div id="music">
<pre id="notes"></pre>
<span id="caret" class="hidden animate"></span>
<div id="sheet"></div>
<div id="audio"></div>
</div>

[<i class="fa-solid fa-arrows-rotate"></i> Convert](javascript:convert()){: #convert .btn .btn-primary .hidden}

<script src="https://cdn.jsdelivr.net/npm/abcjs@6.1.9/dist/abcjs-basic-min.js"></script>
<script src="{{ '/assets/js/util.js' | relative_url }}"></script>

