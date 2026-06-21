// Feature module: Родителям (parental settings screen).
// Stage 4 update: language selector (RU / EN / HY) added via i18n module.

function openParentScreen() {
    try { initLowPerformanceMode(); } catch(e) {}
try { ensureZooSaveVersion(); } catch(e) {}
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
    if (key === "lowPerformance") {
        applyLowPerformanceMode(parentSettings.lowPerformance);
    }

    saveProgress();
    renderParentSettings();
}

function applyLowPerformanceMode(enabled) {
    document.body.classList.toggle("low-performance", !!enabled);
    try { localStorage.setItem("zooLowPerformance", enabled ? "1" : "0"); } catch(e) {}
}

function initLowPerformanceMode() {
    try {
        const saved = localStorage.getItem("zooLowPerformance");
        const enabled = saved === "1" || (saved === null && parentSettings.lowPerformance === true);
        parentSettings.lowPerformance = !!enabled;
        document.body.classList.toggle("low-performance", !!enabled);
    } catch(e) {}
}

function resetGameProgress() {
    const ok = confirm(parentT('confirm.reset_progress', 'Сбросить весь прогресс игры?'));
    if (!ok) return;
    localStorage.clear();
    location.reload();
}


// ── Stage 4.3A: Save Stability / Release Guard ──────────────────────────────
const ZOO_RELEASE_STAGE = "Stage 4.3";
const ZOO_SAVE_VERSION = "4.3";
const ZOO_BACKUP_KEY = "zooSaveBackup_stage43";

function getZooTodayKey() {
    return new Date().toISOString().slice(0, 10);
}

function getZooSaveKeys() {
    const keys = [];
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key) continue;
            if (key.startsWith("zoo") || key.startsWith("ZOO")) keys.push(key);
        }
    } catch(e) {}
    return Array.from(new Set(keys)).sort();
}

function createZooSaveSnapshot(reason = "manual") {
    const data = {};
    getZooSaveKeys().forEach(key => {
        try { data[key] = localStorage.getItem(key); } catch(e) {}
    });
    return {
        app: "Zoo Pet World",
        releaseStage: ZOO_RELEASE_STAGE,
        saveVersion: ZOO_SAVE_VERSION,
        exportedAt: new Date().toISOString(),
        reason,
        data
    };
}

function ensureZooSaveVersion() {
    try {
        const current = localStorage.getItem("zooSaveVersion");
        if (current !== ZOO_SAVE_VERSION) {
            if (!localStorage.getItem(ZOO_BACKUP_KEY)) {
                const backup = createZooSaveSnapshot("before_stage_4_3_migration");
                localStorage.setItem(ZOO_BACKUP_KEY, JSON.stringify(backup));
            }
            localStorage.setItem("zooSaveVersion", ZOO_SAVE_VERSION);
            localStorage.setItem("zooSaveVersionUpdatedAt", new Date().toISOString());
        }
    } catch(e) {}
}

function getZooSaveHealth() {
    const result = { ok: true, problems: [] };
    const jsonKeys = [
        "zooUnlockedSkins",
        "zooLevelStars",
        "zooAlbumUnlocked",
        "zooAnimalNames",
        "zooAnimalFeedCount",
        "zooUnlockedFoods",
        "zooPlayerProfile",
        "zooAchievementClaims",
        "zooPetMoodMap",
        "zooPetCareStats",
        "zooParentSettings",
        "zooRareUnlocked",
        "zooDailyProgress",
        "zooPuzzleBestMoves",
        "zooUnlockedPuzzleImages",
        "zooColoringUnlockedTemplates",
        "zooTaskStreakV1"
    ];
    jsonKeys.forEach(key => {
        try {
            const raw = localStorage.getItem(key);
            if (raw !== null && raw !== "") JSON.parse(raw);
        } catch(e) {
            result.ok = false;
            result.problems.push(key);
        }
    });
    return result;
}

function showParentSaveToast(message) {
    try {
        if (typeof showFoodToast === "function") showFoodToast(message);
        else alert(message);
    } catch(e) { alert(message); }
    try { renderParentSettings(); } catch(e) {}
}

function exportZooSave() {
    try { if (typeof saveProgress === "function") saveProgress(); } catch(e) {}
    ensureZooSaveVersion();
    const payload = createZooSaveSnapshot("manual_export");
    const text = JSON.stringify(payload, null, 2);
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `zoo-pet-world-save-${getZooTodayKey()}.json`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        try { URL.revokeObjectURL(url); } catch(e) {}
        try { link.remove(); } catch(e) {}
    }, 500);
    showParentSaveToast(parentT('parent.save_exported', 'Сохранение экспортировано ✅'));
}

function triggerZooSaveImport() {
    const input = document.getElementById("zooSaveImportInput");
    if (input) input.click();
}

function importZooSaveFile(event) {
    const file = event && event.target && event.target.files ? event.target.files[0] : null;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => importZooSaveText(String(reader.result || ""));
    reader.onerror = () => showParentSaveToast(parentT('parent.save_read_error', 'Не получилось прочитать файл сохранения'));
    reader.readAsText(file);
    try { event.target.value = ""; } catch(e) {}
}

function importZooSaveText(rawText) {
    let payload;
    try { payload = JSON.parse(rawText); }
    catch(e) {
        showParentSaveToast(parentT('parent.save_import_bad', 'Файл сохранения повреждён или не JSON'));
        return;
    }
    if (!payload || typeof payload !== "object" || !payload.data || typeof payload.data !== "object") {
        showParentSaveToast(parentT('parent.save_not_zoo', 'Это не похоже на сохранение Zoo Pet World'));
        return;
    }
    const ok = confirm(parentT('confirm.import_save', 'Импортировать сохранение? Текущий прогресс будет заменён, но перед заменой будет создан backup.'));
    if (!ok) return;
    try {
        const before = createZooSaveSnapshot("before_manual_import");
        localStorage.setItem("zooSaveBackup_before_import", JSON.stringify(before));
        Object.keys(payload.data).forEach(key => {
            if (!(key.startsWith("zoo") || key.startsWith("ZOO"))) return;
            const value = payload.data[key];
            if (value === null || value === undefined) localStorage.removeItem(key);
            else localStorage.setItem(key, String(value));
        });
        localStorage.setItem("zooSaveVersion", ZOO_SAVE_VERSION);
        localStorage.setItem("zooSaveImportedAt", new Date().toISOString());
        alert(parentT('parent.save_import_ok', 'Сохранение импортировано ✅') + " Страница перезагрузится.");
        location.reload();
    } catch(e) {
        showParentSaveToast(parentT('parent.save_import_error', 'Ошибка импорта сохранения'));
    }
}

function restoreZooSaveBackup() {
    let raw = null;
    try { raw = localStorage.getItem("zooSaveBackup_before_import") || localStorage.getItem(ZOO_BACKUP_KEY); } catch(e) {}
    if (!raw) {
        showParentSaveToast(parentT('parent.backup_missing', 'Backup не найден'));
        return;
    }
    const ok = confirm(parentT('confirm.restore_backup', 'Восстановить последний backup? Текущий прогресс будет заменён.'));
    if (!ok) return;
    importZooSaveText(raw);
}

function getReleaseGuardHtml() {
    ensureZooSaveVersion();
    const health = getZooSaveHealth();
    const lang = (typeof getCurrentLanguage === "function") ? getCurrentLanguage() : "ru";
    const petsCount = Array.isArray(albumUnlocked) ? albumUnlocked.length : 0;
    const totalPets = (typeof animalKeys !== "undefined" && Array.isArray(animalKeys)) ? Array.from(new Set(animalKeys.concat(["parrot"]))).length : "?";
    const backupExists = (() => { try { return !!(localStorage.getItem(ZOO_BACKUP_KEY) || localStorage.getItem("zooSaveBackup_before_import")); } catch(e) { return false; } })();
    const healthText = health.ok ? "OK ✅" : `Проблемы: ${health.problems.join(", ")}`;
    return `
        <div class="parent-setting release-guard-card">
            <div>
                <b>🧪 ${parentT('parent.release_guard', 'Release guard')}</b>
                <small>Версия: ${ZOO_RELEASE_STAGE} • Save: ${healthText}</small>
                <small>Язык: ${lang} • Монеты: ${Number(coins || 0)} • Питомцев: ${petsCount}/${totalPets}</small>
                <small>Save version: ${localStorage.getItem("zooSaveVersion") || "—"} • Backup: ${backupExists ? "есть" : "нет"}</small>
            </div>
        </div>
    `;
}

function parentT(key, fallback) {
    try { return (typeof t === "function" ? t(key) : "") || fallback; } catch(e) { return fallback; }
}

function renderSaveTools() {
    return `
        <div class="parent-setting parent-save-tools">
            <div>
                <b>💾 ${parentT('parent.save_tools', 'Сохранение')}</b>
                <small>${parentT('parent.save_tools_desc', 'Экспортируй прогресс перед тестами или импортируй backup на другом устройстве.')}</small>
            </div>
            <div class="parent-save-actions">
                <button class="parent-action-btn" onclick="exportZooSave()">${parentT('parent.export', 'Экспорт')}</button>
                <button class="parent-action-btn" onclick="triggerZooSaveImport()">${parentT('parent.import', 'Импорт')}</button>
                <button class="parent-action-btn soft" onclick="restoreZooSaveBackup()">${parentT('parent.backup', 'Backup')}</button>
                <input id="zooSaveImportInput" type="file" accept="application/json,.json" style="display:none" onchange="importZooSaveFile(event)">
            </div>
        </div>
        ${getReleaseGuardHtml()}
    `;
}

// ── Language selector ─────────────────────────────────────────────────────────
// Uses window.setLanguage(lang) from i18n.js.
// Falls back gracefully if i18n.js is not yet loaded.
function renderLanguageSelector() {
    const langs = (typeof I18N_SUPPORTED_LANGS !== 'undefined')
        ? I18N_SUPPORTED_LANGS
        : ['ru', 'en', 'hy'];
    const curLang = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ru';

    const labels = { ru: '🇷🇺 Русский', en: '🇬🇧 English', hy: '🇦🇲 Հայereн' };

    const buttons = langs.map(lang => {
        const active = lang === curLang ? ' lang-btn-active' : '';
        return `<button class="lang-btn${active}" onclick="setLanguage('${lang}')">${labels[lang] || lang}</button>`;
    }).join('');

    return `
        <div class="parent-setting parent-setting-lang">
            <div>
                <b>🌐 Язык / Language</b>
                <small>Выбери язык интерфейса. После выбора страница перезагрузится.</small>
            </div>
            <div class="lang-btn-row">${buttons}</div>
        </div>
    `;
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

    const _t  = (key, fallback) => (typeof t === 'function') ? t(key) || fallback : fallback;
    const on  = _t('settings.on',  'Вкл');
    const off = _t('settings.off', 'Выкл');

    const item = (key, titleKey, titleFb, descKey, descFb) => {
        const active = parentSettings[key] !== false;
        return `
            <div class="parent-setting">
                <div>
                    <b>${_t(titleKey, titleFb)}</b>
                    <small>${_t(descKey, descFb)}</small>
                </div>
                <button class="toggle-switch ${active ? '' : 'off'}"
                        onclick="toggleParentSetting('${key}')">
                    ${active ? on : off}
                </button>
            </div>`;
    };

    const lpOn = parentSettings.lowPerformance === true;

    box.innerHTML = `
        ${item('musicEnabled',
               'settings.music',        'Музыка',
               'settings.music_desc',   'Можно полностью выключить музыку.')}

        <!-- Stage 4.3D: timer toggle removed from Parents; mode is chosen before the game. -->

        ${item('interstitialEnabled',
               'settings.ads',          'Interstitial реклама',
               'settings.ads_desc',     'Можно выключить полноэкранную рекламу в детском режиме.')}

        <div class="parent-setting">
            <div>
                <b>${_t('settings.low_perf', '⚡ Лёгкий режим')}</b>
                <small>${_t('settings.low_perf_desc',
                    'Убирает тяжёлые эффекты (blur, тени, анимации фона). Быстрее на слабых устройствах.')}</small>
            </div>
            <button class="toggle-switch ${lpOn ? '' : 'off'}"
                    onclick="toggleParentSetting('lowPerformance')">
                ${lpOn ? on : off}
            </button>
        </div>

        ${renderLanguageSelector()}

        ${renderSaveTools()}

        <div class="parent-setting">
            <div>
                <b>${_t('settings.reset',      'Сброс прогресса')}</b>
                <small>${_t('settings.reset_desc', 'Удалить уровни, монеты, животных и настройки.')}</small>
            </div>
            <button class="toggle-switch parent-danger" onclick="resetGameProgress()">
                ${_t('settings.reset_btn', 'Сброс')}
            </button>
        </div>
    `;
}

try { initLowPerformanceMode(); } catch(e) {}
try { ensureZooSaveVersion(); } catch(e) {}
