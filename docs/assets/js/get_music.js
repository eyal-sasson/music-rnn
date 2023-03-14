let running = false,
    typing = false;
const LOADING = "Loading...";
async function getMusic(dataset) {
    if (running)
        return;
    running = true;
    const url = "http://35.237.174.14:8000/generate"
    console.log(`fetching music for ${dataset}...`);
    const div = document.getElementById("music");
    const pre = div.querySelector("pre");
    pre.innerHTML = "Loading...";
    div.querySelector("#caret").classList.remove("hidden");
    let text = "";
    let toWrite = [];
    try {
        for (let i = 0; i < 20; i++) {
            const music = await fetchMusic(url, dataset, text, 20);
            if (music.includes("\n\n"))
                break;
            toWrite.push(...music.replace(text, "").split(""));
            console.log(toWrite.join(""));
            text = music;
            if (!typing)
                typeWriter(toWrite, pre);
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
    if (!running)
        document.querySelector("#caret").classList.add("hidden");
}

