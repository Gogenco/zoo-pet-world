// Feature module: Настройки звука (audio settings screen).
// Extracted verbatim during the Stage 6.1.7 RESET architecture work — logic
// unchanged, only the location moved. Loaded on demand via loadScriptOnce.
//
// Deliberately NOT moved here (stay in index.html, shared/needed eagerly):
//   toggleMusic, toggleSound, updateMusicButton, updateSoundButton, shuffle
// Reason: the main menu's own "Звук"/"Музыка" buttons call toggleMusic()/
// toggleSound() directly, with no dependency on this screen ever being
// opened — moving them here would break the main menu before this module
// ever loads. shuffle() is a generic utility used by the memory/pairs game,
// unrelated to audio, just textually adjacent in the original file.
//
// Depends on shared globals/functions defined in index.html: playSound,
// showScreen, musicTrackSelect, musicVolumeRange, soundVolumeRange,
// musicVolumeText, soundVolumeText, updateMusicButton, updateSoundButton,
// selectedMusicTrack, musicTracks, musicStep, saveProgress,
// stopBackgroundMusic, startBackgroundMusic, musicEnabled, musicVolume,
// parentSettings, musicTimer, soundVolume, soundEnabled, currentMode,
// releaseChecklistBox, playAnimalSound.

function renderAudioSettings() {
    if (musicTrackSelect) musicTrackSelect.value = selectedMusicTrack;
    if (musicVolumeRange) musicVolumeRange.value = String(Math.round(musicVolume * 100));
    if (soundVolumeRange) soundVolumeRange.value = String(Math.round(soundVolume * 100));
    if (musicVolumeText) musicVolumeText.textContent = `${Math.round(musicVolume * 100)}%`;
    if (soundVolumeText) soundVolumeText.textContent = `${Math.round(soundVolume * 100)}%`;
    updateMusicButton();
    updateSoundButton();
}

function openAudioSettings() {
    playSound("click");
    showScreen("audioScreen");
}

function changeMusicTrack(trackId) {
    selectedMusicTrack = musicTracks[trackId] ? trackId : "happyZoo";
    musicStep = 0;
    saveProgress();
    stopBackgroundMusic();
    if (musicEnabled) startBackgroundMusic();
    updateMusicButton();
    renderAudioSettings();
}

function changeMusicVolume(value) {
    musicVolume = Math.max(0, Math.min(1, Number(value) / 100));
    musicEnabled = musicVolume > 0;
    parentSettings.musicEnabled = musicEnabled;
    saveProgress();
    if (musicEnabled && !musicTimer) startBackgroundMusic();
    if (!musicEnabled) stopBackgroundMusic();
    renderAudioSettings();
}

function changeSoundVolume(value) {
    soundVolume = Math.max(0, Math.min(1, Number(value) / 100));
    soundEnabled = soundVolume > 0;
    saveProgress();
    renderAudioSettings();
}

function previewSelectedMusic() {
    musicEnabled = true;
    parentSettings.musicEnabled = true;
    saveProgress();
    stopBackgroundMusic();
    startBackgroundMusic();
    updateMusicButton();
    renderAudioSettings();
}

function previewAnimalSounds() {
    soundEnabled = true;
    if (soundVolume <= 0) soundVolume = 0.85;
    saveProgress();
    renderAudioSettings();
    const preview = ["lion", "elephant", "frog", "snake", "dog", "parrot"];
    preview.forEach((key, index) => setTimeout(() => playAnimalSound(key), index * 520));
}

function applyToddlerMode() {
    currentMode = "calm";
    parentSettings.timerEnabled = false;
    parentSettings.interstitialEnabled = false;
    selectedMusicTrack = "calmForest";
    musicVolume = 0.45;
    soundVolume = 0.65;
    musicEnabled = true;
    soundEnabled = true;
    saveProgress();
    stopBackgroundMusic();
    startBackgroundMusic();
    renderAudioSettings();
    playSound("coin");
}

function showReleaseChecklist() {
    if (!releaseChecklistBox) return;
    releaseChecklistBox.style.display = releaseChecklistBox.style.display === "none" ? "grid" : "none";
    releaseChecklistBox.innerHTML = `
        <div class="release-check-item">✅ Картинки животных встроены в HTML: нет внешних путей.</div>
        <div class="release-check-item">✅ Звуки животных работают без mp3/ogg и без авторских рисков.</div>
        <div class="release-check-item">✅ Музыка выбирается из 5 тем и сохраняется.</div>
        <div class="release-check-item">✅ Громкость музыки и звуков сохраняется отдельно.</div>
        <div class="release-check-item">✅ Есть спокойный режим и режим малыша.</div>
        <div class="release-check-item">✅ Перед Play Market нужно заменить test AdMob IDs на реальные и проверить Families policy.</div>
        <div class="release-check-item">✅ Privacy Policy RU/EN уже лежит в пакете, но перед публикацией нужно указать имя разработчика и email поддержки.</div>
    `;
}
