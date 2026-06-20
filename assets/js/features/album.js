// Feature module: Альбом животных (album screen).
// Extracted verbatim from the main script during the Stage 6.1.7 RESET
// architecture pilot — logic unchanged, only the location moved.
// Loaded on demand by the openAlbum() stub in index.html (see loadScriptOnce).
// Depends on shared globals defined in index.html: playSound, showScreen,
// albumGrid, animalKeys, albumUnlocked, animalInfo, animalImageSrc.

function openAlbum() {
    playSound("click");
    showScreen("albumScreen");
}

function renderAlbum() {
    albumGrid.innerHTML = "";
    Array.from(new Set(animalKeys.concat(["parrot"]))).forEach(key => {
        const unlocked = albumUnlocked.includes(key);
        const item = document.createElement("div");
        item.className = unlocked ? "album-item" : "album-item locked";

        const imgBox = document.createElement("div");
        imgBox.className = "album-img";
        const img = document.createElement("img");
        img.src = animalImageSrc(key);
        imgBox.appendChild(img);

        const content = document.createElement("div");
        const title = document.createElement("div");
        title.className = "album-title";
        title.textContent = unlocked ? animalInfo[key].name : "Не открыто";
        const text = document.createElement("div");
        text.className = "album-text";
        text.textContent = unlocked ? animalInfo[key].fact : "Пройди уровни зоопарка, чтобы открыть эту карточку.";

        content.appendChild(title);
        content.appendChild(text);
        item.appendChild(imgBox);
        item.appendChild(content);
        albumGrid.appendChild(item);
    });
}
