function getMusic(dataset) {
    console.log(`fetching music for ${dataset}...`);
    const div = document.getElementById("music");
    div.innerHTML = "Loading...";
    const audio = new Audio("https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg.wav");
    audio.controls = true;
    audio.autoplay = true;
    div.innerHTML = "";
    div.appendChild(audio);
}

