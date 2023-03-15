const abcjs = window.ABCJS;

const LOADING = "Loading...";

let running = false,
    typing = false;

async function getMusic(dataset) {
    if (running)
        return;
    running = true;
    const url = "http://localhost:8000/generate"
    console.log(`fetching music for ${dataset}...`);
    const div = document.getElementById("music");
    const pre = div.querySelector("pre");
    pre.innerHTML = "Loading...";
    document.getElementById("convert").classList.add("hidden");
    div.querySelector("#caret").classList.remove("hidden");
    const sheet = document.getElementById("sheet");
    sheet.innerHTML = "";
    sheet.style = "";
    div.querySelector("#audio").innerHTML = "";
    let text = "";
    let toWrite = [];
    try {
        for (let i = 0; i < 10; i++) {
            let music = await fetchMusic(url, dataset, text, 20);
            let stop = false;
            if (music.includes("\n\n")) {
                music = music.split("\n\n")[0];
                stop = true;
            }
            toWrite.push(...music.replace(text, "").split(""));
            console.log(toWrite.join(""));
            text = music;
            if (!typing)
                typeWriter(toWrite, pre);
            if (stop)
                break;
        }
    } catch (error) {
        console.error(error);
        typing = false;
        pre.innerHTML = "Something went wrong. Please try again later."
        document.querySelector("#caret").classList.add("hidden");
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
    const caret = document.querySelector("#caret");
    caret.classList.remove("animate");
    while (typing) {
        const char = toWrite.shift();
        if (!char)
            break;
        if (e.innerHTML === LOADING)
            e.innerHTML = "";
        e.innerHTML += char;
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    typing = false;
    if (running)
        caret.classList.add("animate");
    else {
        document.getElementById("caret").classList.add("hidden");
        document.getElementById("convert").classList.remove("hidden");
    }
}

async function convert() {
    const text = document.getElementById("music").querySelector("pre").innerHTML;
    const visualObj = abcjs.renderAbc("sheet", text);
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
    document.querySelector(".abcjs-inline-audio").classList.remove("disabled");
    document.getElementById("convert").classList.add("hidden");
}

