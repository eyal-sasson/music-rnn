---
title: Play
layout: default
---

Choose a dataset:

[The Nottingham Music Database](javascript:getMusic("abcsourceforge")){: .btn}
[FolkWiki](javascript:getMusic("folkwiki")){: .btn}
[French Trad](javascript:getMusic("tradfrance")){: .btn}
[The Old Music Project](javascript:getMusic("oldmusic")){: .btn}
[Serpent Publications](javascript:getMusic("serpent")){: .btn}

<div id="music">
<pre></pre>
<span id="caret" class="hidden animate"></span>
<div id="sheet"></div>
<div id="audio"></div>
</div>

[<i class="fa-solid fa-arrows-rotate"></i> Convert](javascript:convert()){: #convert .btn .btn-blue .hidden}

<script src="https://cdn.jsdelivr.net/npm/abcjs@6.1.9/dist/abcjs-basic-min.js"></script>
<script src="{{ '/assets/js/util.js' | relative_url }}"></script>

