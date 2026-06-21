/**
 * Zoo Pet World — i18n Foundation  (Stage 4)
 * ─────────────────────────────────────────────────────────────────────────────
 * • Lazy-loads only the selected language JSON (assets/i18n/{lang}.json)
 * • Falls back to inline RU strings if fetch fails (file:// / offline)
 * • Falls back RU key → key itself if nothing found
 * • Provides  t(key, params)  and  setLanguage(lang)  globally
 * • Saves selection in localStorage['zooLanguage'] (same key as existing code)
 * • Logs missing keys via console.warn
 * • voiceKey field is supported in guide steps — no audio files yet
 * ─────────────────────────────────────────────────────────────────────────────
 */
(function () {
    'use strict';

    const STORAGE_KEY      = 'zooLanguage';
    const SUPPORTED_LANGS  = ['ru', 'en', 'hy'];
    const FALLBACK_LANG    = 'ru';
    const I18N_BASE        = 'assets/i18n/';
    const MISSING_WARNED   = new Set();

    // ── Inline RU strings — always available, no network needed ──────────────
    // These are the authoritative fallback for all languages.
    const RU_INLINE = {
        "nav.home":"Главное меню","nav.back":"Назад","nav.close":"Закрыть",
        "btn.next":"Дальше","btn.skip":"Пропустить","btn.done":"Готово",
        "btn.confirm":"Подтвердить","btn.cancel":"Отмена","btn.retry":"Повторить",
        "btn.save":"Сохранить","btn.buy":"Купить","btn.unlock":"Открыть","btn.open":"Открыть игру",
        "menu.title":"Zoo Pet World","menu.subtitle":"Мини-игры, питомцы и детский зоопарк",
        "menu.coins":"Монетки","menu.my_zoo":"Мой зоопарк","menu.play":"Играть",
        "menu.mini_games":"мини-игры","menu.my_world":"Мой мир","menu.profile":"Профиль",
        "menu.soon":"Скоро","menu.coming_soon":"Здесь скоро появятся вольеры, животные и развитие за монетки.",
        "game.pairs":"Найди пары","game.map":"Карта уровней","game.shadow":"Найди животное",
        "game.puzzle":"Пазл","game.block":"Zoo Block","game.coloring":"Раскраска",
        "game.pet_room":"Комната питомца","game.album":"Альбом животных",
        "game.pets":"Все животные","game.shop":"Магазин","game.tasks":"Задания",
        "screen.pairs":"Найди пары","screen.map":"Карта уровней","screen.shadow":"Найди по тени",
        "screen.puzzle":"Пазл","screen.block":"Zoo Block","screen.coloring":"Раскраска",
        "screen.pet_room":"Питомец","screen.album":"Альбом животных",
        "screen.pets":"Мои животные","screen.shop":"Магазин","screen.tasks":"Задания",
        "screen.parent":"Для родителей","screen.audio":"Звук и музыка",
        "screen.profile":"Профиль игрока","screen.achievements":"Достижения",
        "settings.music":"Музыка","settings.music_desc":"Можно полностью выключить музыку.",
        "settings.timer":"Таймер","settings.timer_desc":"Если выключить, игра будет спокойнее.",
        "settings.ads":"Interstitial реклама","settings.ads_desc":"Можно выключить полноэкранную рекламу в детском режиме.",
        "settings.low_perf":"⚡ Лёгкий режим",
        "settings.low_perf_desc":"Убирает тяжёлые эффекты (blur, тени, анимации фона). Быстрее на слабых устройствах.",
        "settings.reset":"Сброс прогресса","settings.reset_desc":"Удалить уровни, монеты, животных и настройки.",
        "settings.reset_btn":"Сброс","settings.language":"Язык","settings.on":"Вкл","settings.off":"Выкл",
        "lang.ru":"Русский","lang.en":"English","lang.hy":"Հայerен",
        "parent.title":"Для родителей","parent.subtitle":"Простой экран доверия для Play Market",
        "parent.what_trains":"Что тренирует игра",
        "parent.what_trains_text":"Память, внимание, реакцию, распознавание одинаковых картинок и узнавание звуков животных.",
        "parent.calm_mode":"Спокойный режим","parent.calm_mode_text":"Можно играть без таймера, чтобы ребёнок не нервничал.",
        "parent.privacy":"Данные и приватность",
        "parent.privacy_text":"В HTML-версии нет регистрации и аккаунта. Прогресс хранится локально на устройстве.",
        "parent.ads_info":"Реклама","parent.back_btn":"Назад",
        "guide.tip":"Подсказка","guide.helper":"Помощник","guide.mini_help":"Мини-помощь",
        "guide.next":"Дальше","guide.skip":"Пропустить","guide.done":"Готово",
        "guide.tap_hint":"Нажми на нужный элемент","guide.drag_hint":"Потяни пальцем",
        "guide.scroll_hint":"Прокрути экран","guide.color_hint":"Выбери цвет",
        "loading.title":"Zoo Pet World","loading.text":"Загружаем питомца и 50 уровней зоопарка...",
        "loading.btn":"Открыть игру",
        "daily.title":"Ежедневный подарок","daily.btn":"Забрать подарок",
        "daily.coins":"+{n} монет! Серия: {days} дн.",
        "misc.coins_label":"монет","misc.level":"Уровень","misc.stars":"Звёзды",
        "misc.score":"Очки","misc.timer":"Таймер"
    };

    // ── Inline EN strings — available immediately for EN users ───────────────
    const EN_INLINE = {
        "nav.home":"Home","nav.back":"Back","nav.close":"Close",
        "btn.next":"Next","btn.skip":"Skip","btn.done":"Done",
        "btn.confirm":"Confirm","btn.cancel":"Cancel","btn.retry":"Retry",
        "btn.save":"Save","btn.buy":"Buy","btn.unlock":"Unlock","btn.open":"Open Game",
        "menu.title":"Zoo Pet World","menu.subtitle":"Mini-games, pets and a children's zoo",
        "menu.coins":"Coins","menu.my_zoo":"My Zoo","menu.play":"Play",
        "menu.mini_games":"mini-games","menu.my_world":"My World","menu.profile":"Profile",
        "menu.soon":"Soon","menu.coming_soon":"Coming soon: enclosures, animals and upgrades for coins.",
        "game.pairs":"Find Pairs","game.map":"Level Map","game.shadow":"Find the Animal",
        "game.puzzle":"Puzzle","game.block":"Zoo Block","game.coloring":"Coloring",
        "game.pet_room":"Pet Room","game.album":"Animal Album",
        "game.pets":"All Animals","game.shop":"Shop","game.tasks":"Tasks",
        "screen.pairs":"Find Pairs","screen.map":"Level Map","screen.shadow":"Find the Shadow",
        "screen.puzzle":"Puzzle","screen.block":"Zoo Block","screen.coloring":"Coloring",
        "screen.pet_room":"My Pet","screen.album":"Animal Album",
        "screen.pets":"My Animals","screen.shop":"Shop","screen.tasks":"Tasks",
        "screen.parent":"For Parents","screen.audio":"Sound & Music",
        "screen.profile":"Player Profile","screen.achievements":"Achievements",
        "settings.music":"Music","settings.music_desc":"You can fully turn off the music.",
        "settings.timer":"Timer","settings.timer_desc":"Turn off for a calmer experience.",
        "settings.ads":"Interstitial Ads","settings.ads_desc":"Disable full-screen ads in children's mode.",
        "settings.low_perf":"⚡ Light Mode",
        "settings.low_perf_desc":"Removes heavy effects (blur, shadows, animations). Faster on weak devices.",
        "settings.reset":"Reset Progress","settings.reset_desc":"Delete levels, coins, animals and settings.",
        "settings.reset_btn":"Reset","settings.language":"Language","settings.on":"On","settings.off":"Off",
        "lang.ru":"Русский","lang.en":"English","lang.hy":"Հայерен",
        "parent.title":"For Parents","parent.subtitle":"Simple trust screen for the Play Store",
        "parent.what_trains":"What the game trains",
        "parent.what_trains_text":"Memory, attention, reaction, pattern recognition and animal sound identification.",
        "parent.calm_mode":"Calm Mode","parent.calm_mode_text":"Play without a timer so the child stays relaxed.",
        "parent.privacy":"Data & Privacy",
        "parent.privacy_text":"The HTML version has no registration or account. Progress is stored locally on the device.",
        "parent.ads_info":"Advertising","parent.back_btn":"Back",
        "guide.tip":"Hint","guide.helper":"Helper","guide.mini_help":"Mini-help",
        "guide.next":"Next","guide.skip":"Skip","guide.done":"Done",
        "guide.tap_hint":"Tap the element","guide.drag_hint":"Drag with your finger",
        "guide.scroll_hint":"Scroll the screen","guide.color_hint":"Pick a color",
        "loading.title":"Zoo Pet World","loading.text":"Loading your pet and 50 zoo levels...",
        "loading.btn":"Open Game",
        "daily.title":"Daily Gift","daily.btn":"Claim Gift","daily.coins":"+{n} coins! Streak: {days} days.",
        "misc.coins_label":"coins","misc.level":"Level","misc.stars":"Stars",
        "misc.score":"Score","misc.timer":"Timer"
    };

    // ── State ─────────────────────────────────────────────────────────────────
    const cache = { ru: RU_INLINE, en: EN_INLINE };
    let currentLanguage = FALLBACK_LANG;
    let _pendingLoad = null;  // Promise for async HY load

    // ── Helpers ───────────────────────────────────────────────────────────────
    function _resolve(key, lang) {
        const strings = cache[lang];
        if (strings && strings[key] !== undefined) return strings[key];
        // fallback chain: selected lang → RU inline → key itself
        if (lang !== FALLBACK_LANG && RU_INLINE[key] !== undefined) {
            return RU_INLINE[key];
        }
        return null;
    }

    function _interpolate(str, params) {
        if (!params || typeof str !== 'string') return str;
        return str.replace(/\{(\w+)\}/g, (_, k) => (params[k] !== undefined ? params[k] : `{${k}}`));
    }

    // ── Async JSON loader ─────────────────────────────────────────────────────
    async function _loadLang(lang) {
        if (cache[lang]) return;  // already loaded
        try {
            const url = `${I18N_BASE}${lang}.json`;
            const r = await fetch(url);
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const data = await r.json();
            // Strip _meta, store clean key→value map
            const clean = {};
            for (const [k, v] of Object.entries(data)) {
                if (k !== '_meta') clean[k] = v;
            }
            cache[lang] = clean;
        } catch (e) {
            console.warn(`[i18n] failed to load ${lang}.json (${e.message}), using RU fallback`);
            cache[lang] = RU_INLINE; // silently fall back
        }
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * t(key, params?)
     * Returns translated string for the current language.
     * Falls back: currentLang → RU inline → key itself.
     * Logs missing keys once via console.warn.
     *
     * voiceKey support: step objects may carry a `voiceKey` property
     * (e.g. voiceKey: 'guide.tap') for future audio — no audio played here.
     */
    window.t = function t(key, params) {
        if (!key) return '';
        const str = _resolve(key, currentLanguage);
        if (str === null) {
            if (!MISSING_WARNED.has(key)) {
                console.warn(`[i18n] missing key: "${key}" for lang: "${currentLanguage}"`);
                MISSING_WARNED.add(key);
            }
            return key; // return the key itself as last resort
        }
        return _interpolate(str, params);
    };

    /**
     * getCurrentLanguage()
     * Returns the active language code ('ru' | 'en' | 'hy').
     * Overrides the same-named function defined inline in index.html.
     */
    window.getCurrentLanguage = function getCurrentLanguage() {
        return currentLanguage;
    };

    /**
     * setLanguage(lang)
     * Persists the choice and reloads the page to apply uniformly.
     * Called from the language selector in parent settings.
     */
    window.setLanguage = function setLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) {
            console.warn(`[i18n] unsupported lang "${lang}", using "${FALLBACK_LANG}"`);
            lang = FALLBACK_LANG;
        }
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
        // Also update safeStorage for backward compat with translatePageToEnglish()
        try {
            if (window.safeStorage) safeStorage.set(STORAGE_KEY, lang);
        } catch (e) {}
        location.reload();
    };

    /** List of supported languages for the UI selector */
    window.I18N_SUPPORTED_LANGS = SUPPORTED_LANGS;

    /** Check if a language JSON is ready (for optional re-render after HY loads) */
    window.i18nReady = function i18nReady() {
        return !!cache[currentLanguage];
    };

    // ── Initialization ────────────────────────────────────────────────────────
    (function _init() {
        // Read saved preference (same key used by existing safeStorage calls)
        let saved = FALLBACK_LANG;
        try { saved = localStorage.getItem(STORAGE_KEY) || FALLBACK_LANG; } catch (e) {}
        if (!SUPPORTED_LANGS.includes(saved)) saved = FALLBACK_LANG;
        currentLanguage = saved;

        // HY needs async fetch (RU + EN are already inline)
        if (currentLanguage === 'hy' && !cache['hy']) {
            _pendingLoad = _loadLang('hy');
            // When ready, if page is still loading, the main script will use t()
            // which already returns RU fallback — so no render glitch.
            _pendingLoad.then(() => {
                // Optionally signal the app that HY strings are now available.
                // The app can listen for this to re-render if needed.
                try { window.dispatchEvent(new CustomEvent('i18nReady', { detail: { lang: 'hy' } })); } catch(e) {}
            });
        }
    })();

})();
