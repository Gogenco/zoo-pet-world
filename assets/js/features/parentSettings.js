// Feature module: Родителям (parental settings screen).
// Stage 4 update: language selector (RU / EN / HY) added via i18n module.

function openParentScreen() {
    try { initLowPerformanceMode(); } catch(e) {}
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
    const ok = confirm("Сбросить весь прогресс игры?");
    if (!ok) return;
    localStorage.clear();
    location.reload();
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

        ${item('timerEnabled',
               'settings.timer',        'Таймер',
               'settings.timer_desc',   'Если выключить, игра будет спокойнее.')}

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
