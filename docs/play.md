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

<div id="music"><pre></pre><span id="caret" class="hidden animate"></span></div>

<script src="{{ '/assets/js/get_music.js' | relative_url }}"></script>

