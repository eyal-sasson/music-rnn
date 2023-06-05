const abcjs = window.ABCJS;

const LOADING = "Loading...";

const SPACED = {
    "abcsourceforge": true,
    "isra": true,
    "folkwiki": false,
    "oldmusic": false,
    "lesession": true,
    "tradfrance": false,
    "serpent": false,
}

const NEW_SONG = "\nX:";

let running = false,
    typing = false;

async function getMusic(dataset) {
    if (running)
        return;
    const seed = getSeed();
    if (!seed)
        return;
    running = true;
    const url = "https://gen.musicrnn.eu.org";
    console.log(`fetching music for ${dataset}...`);
    const pre = document.getElementById("notes"),
        caret = document.getElementById("caret")
        sheet = document.getElementById("sheet");
    pre.innerHTML = LOADING;
    document.getElementById("convert").classList.add("hidden");
    document.getElementById("download").classList.add("hidden");
    caret.classList.remove("hidden");
    sheet.innerHTML = "";
    sheet.style = "";
    document.getElementById("audio").innerHTML = "";
    let text = `X:${SPACED[dataset] ? ' ' : ''}${seed}`
    let toWrite = text.split("");
    try {
        for (let i = 0; i < 50; i++) {
            let music = await fetchMusic(url, dataset, text, 20);
            let stop = false;
            if (music.includes(NEW_SONG)) {
                music = music.split(NEW_SONG)[0];
                stop = true;
            }
            music = music.slice(text.length);
            toWrite.push(...music.split(""));
            console.log(toWrite.join(""));
            text += music;
            if (!typing)
                typeWriter(toWrite, pre);
            if (stop)
                break;
        }
    } catch (error) {
        console.error(error);
        typing = false;
        pre.innerHTML = "Something went wrong. Please try again later."
        caret.classList.add("hidden");
    }
    running = false;
}

async function fetchMusic(url, dataset, start=null, length=10) {
    let params = {
        length
    };
    if (start)
        params["string"] = start;
    const response = await fetch(`${url}/${dataset}?${new URLSearchParams(params)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        params: params
    });
    const data = await response.json();
    return data.message;
}

async function typeWriter(toWrite, e) {
    typing = true;
    const caret = document.getElementById("caret");
    caret.classList.remove("animate");
    while (typing) {
        if (toWrite.length === 0)
            break;
        const char = toWrite.shift();
        if (e.innerHTML === LOADING)
            e.innerHTML = "";
        e.innerHTML += char;
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    typing = false;
    await new Promise(resolve => setTimeout(resolve, 100));
    if (running) {
        caret.classList.add("animate");
    } else {
        caret.classList.add("hidden");
        document.getElementById("convert").classList.remove("hidden");
    }
}

async function convert() {
    try {
        const text = document.getElementById("notes").innerHTML;
        const visualObj = abcjs.renderAbc("sheet", text, {
            responsive: "resize",
        });
        const controlOptions = {
            displayPlay: true,
            displayProgress: true,
            displayClock: true
        };
        const synthControl = new abcjs.synth.SynthController();
        synthControl.load("#audio", null, controlOptions);
        synthControl.disable(true);
        const midiBuffer = new abcjs.synth.CreateSynth();
        await midiBuffer.init({
            visualObj: visualObj[0],
        });
        await synthControl.setTune(visualObj[0], true);
        const download = document.getElementById("download");
        download.classList.remove("hidden");
        const downloadClone = download.cloneNode(true);
        download.replaceWith(downloadClone); // remove event listeners
        downloadClone.addEventListener("click", () => {
            synthControl.download("musicrnn_generated.wav");
        });
        document.querySelector(".abcjs-inline-audio").classList.remove("disabled");
    } catch (error) {
        console.error(error);
        document.getElementById("sheet").innerHTML = "Something went wrong. Please try regenerating the music.";
    }
    document.getElementById("convert").classList.add("hidden");
}

function getSeed() {
    const e = document.getElementById("seed");
    if (e.value === "") {
        return Math.floor(Math.random() * 1000);
    }
    if (e.checkValidity()) {
        return e.value;
    } else {
        e.setCustomValidity("Please enter a number between 0 and 999");
        e.reportValidity();
        return null;
    }
}

const toggleDarkMode = document.getElementById("toggle-dark-mode");
jtd.addEvent(toggleDarkMode, 'click', () => {
    if (jtd.getTheme() === 'dark') {
        jtd.setTheme('light');
        toggleDarkMode.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        jtd.setTheme('dark');
        toggleDarkMode.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});

