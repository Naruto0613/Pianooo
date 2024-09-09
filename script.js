import { keys } from "./keys.js";
const allkeys = [];
const audioMap = {};
document.addEventListener("DOMContentLoaded", () => {
    const pianoKeysContainer = document.querySelector(".piano-keys");
    keys.forEach((key) => {
        const li = document.createElement("li");
        li.className = `key ${key.isBlack ? "black" : "white"}`;
        const displayKey = key.mappedKey || key.key;
        li.dataset.key = displayKey;
        li.innerHTML = `
            <div>${key.note}</div>
            <span>${key.key}</span>
        `;
        pianoKeysContainer.appendChild(li);
        allkeys.push(displayKey);
    });
    preloadAuido();
    document.addEventListener("keydown", pressedKey);
});

const preloadAuido = () => {
    allkeys.forEach(
        (key) => (audioMap[key] = new Audio(`./pianoKeys/${key}.mp3`))
    );
};

const pressedKey = (e) => {
    const selectedKey = keys.find((keyObject) => keyObject.key === e.key);
    const displayKey = selectedKey.mappedKey || e.key;
    if (allkeys.includes(displayKey)) playTune(displayKey);
};

const playTune = (key) => {
    const audio = audioMap[key];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 500);
};
