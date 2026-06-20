// Feature module: Родителям (parental settings screen).
// Extracted verbatim during the Stage 6.1.7 RESET architecture work — logic
// unchanged, only the location moved. Loaded on demand via loadScriptOnce.
//
// Depends on shared globals defined in index.html: parentSettings,
// musicEnabled, startBackgroundMusic, stopBackgroundMusic, updateMusicButton,
// currentMode, normalizeMemoryMode, saveProgress, playSound, showScreen.

function openParentScreen() {
    playSound("click");
    showScreen("parentScreen");
}

function toggleParentSetting(key) {
    parentSettings[key] = !parentSettings[key];

    if (key === "musicEnabled") {
        musicEnabled = parentSettings.musicEnabled;
        if (musicEnabled) startBackgroundMusic(); else stopBackgroundMusic();
        updateMusicButton();
    }

    if (key === "timerEnabled" && !parentSettings.timerEnabled) {
        currentMode = normalizeMemoryMode("calm");
    }

    saveProgress();
    renderParentSettings();
}

function resetGameProgress() {
    const ok = confirm("Сбросить весь прогресс игры?");
    if (!ok) return;
    localStorage.clear();
    location.reload();
}

function renderParentSettings() {
    const parentPanel = document.querySelector("#parentScreen .card-panel");
    if (!parentPanel) return;

    let box = document.getElementById("parentSettingsBox");
    if (!box) {
        box = document.createElement("div");
        box.id = "parentSettingsBox";
        box.className = "parent-settings-list";
        parentPanel.appendChild(box);
    }

    const item = (key, title, desc) => {
        const on = parentSettings[key] !== false;
        return `
            <div class="parent-setting">
                <div>
                    <b>${title}</b>
                    <small>${desc}</small>
                </div>
                <button class="toggle-switch ${on ? "" : "off"}" onclick="toggleParentSetting('${key}')">${on ? "Вкл" : "Выкл"}</button>
            </div>
        `;
    };

    box.innerHTML = `
        ${item("musicEnabled", "Музыка", "Можно полностью выключить музыку.")}
        ${item("timerEnabled", "Таймер", "Если выключить, игра будет спокойнее.")}
        ${item("interstitialEnabled", "Interstitial реклама", "Можно выключить полноэкранную рекламу в детском режиме.")}
        <div class="parent-setting">
            <div>
                <b>Сброс прогресса</b>
                <small>Удалить уровни, монеты, животных и настройки.</small>
            </div>
            <button class="toggle-switch parent-danger" onclick="resetGameProgress()">Сброс</button>
        </div>
    `;
}
