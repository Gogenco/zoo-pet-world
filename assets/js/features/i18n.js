/**
 * Zoo Pet World — i18n Foundation  (Stage 4.2B updated)
 * ─────────────────────────────────────────────────────────────────────────────
 * • Inline RU + EN strings cover 191 keys each (no fetch needed for RU/EN)
 * • HY loaded async via fetch(assets/i18n/hy.json), falls back to RU
 * • t(key, params) with {param} interpolation
 * • setLanguage(lang) saves to localStorage and reloads
 * • Missing keys: console.warn once, returns key itself
 * • voiceKey support: guide steps carry voiceKey for future audio (no audio yet)
 */
(function () {
    'use strict';

    const STORAGE_KEY      = 'zooLanguage';
    const SUPPORTED_LANGS  = ['ru', 'en', 'hy'];
    const FALLBACK_LANG    = 'ru';
    const I18N_BASE        = 'assets/i18n/';
    const MISSING_WARNED   = new Set();

    // ── Inline RU strings — always available, authoritative fallback ──────────
    const RU_INLINE = {
        "nav.home": "Главное меню",
        "nav.back": "Назад",
        "nav.close": "Закрыть",
        "btn.next": "Дальше",
        "btn.skip": "Пропустить",
        "btn.done": "Готово",
        "btn.confirm": "Подтвердить",
        "btn.cancel": "Отмена",
        "btn.retry": "Повторить",
        "btn.save": "Сохранить",
        "btn.buy": "Купить",
        "btn.unlock": "Открыть",
        "btn.open": "Открыть игру",
        "menu.title": "Zoo Pet World",
        "menu.subtitle": "Мини-игры, питомцы и детский зоопарк",
        "menu.coins": "Монетки",
        "menu.my_zoo": "Мой зоопарк",
        "menu.play": "Играть",
        "menu.mini_games": "мини-игры",
        "menu.my_world": "Мой мир",
        "menu.profile": "Профиль",
        "menu.soon": "Скоро",
        "menu.coming_soon": "Здесь скоро появятся вольеры, животные и развитие за монетки.",
        "game.pairs": "Найди пары",
        "game.map": "Карта уровней",
        "game.shadow": "Найди животное",
        "game.puzzle": "Пазл",
        "game.block": "Zoo Block",
        "game.coloring": "Раскраска",
        "game.pet_room": "Комната питомца",
        "game.album": "Альбом животных",
        "game.pets": "Все животные",
        "game.shop": "Магазин",
        "game.tasks": "Задания",
        "game.pairs_sub": "выбери спокойный режим или таймер",
        "game.map_sub": "вольеры, звёзды и 50 уровней",
        "game.shadow_sub": "угадай животное по тени",
        "game.puzzle_sub": "этапы, замки и картинки",
        "game.block_sub": "блоки, линии и комбо",
        "game.coloring_sub": "выбери цвет и нажимай по областям",
        "game.pet_room_sub": "корми, купай и развивай питомца",
        "game.album_sub": "открывай карточки после уровней",
        "game.pets_sub": "список, уход и покупка питомцев",
        "game.shop_sub": "скины, монетки, внешний вид",
        "game.tasks_sub": "ежедневные задания и награды",
        "screen.pairs": "Найди пары",
        "screen.map": "Карта уровней",
        "screen.shadow": "Найди по тени",
        "screen.puzzle": "Пазл",
        "screen.block": "Zoo Block",
        "screen.coloring": "Раскраска",
        "screen.pet_room": "Питомец",
        "screen.album": "Альбом животных",
        "screen.pets": "Мои животные",
        "screen.shop": "Магазин",
        "screen.tasks": "Задания",
        "screen.parent": "Для родителей",
        "screen.audio": "Звук и музыка",
        "screen.profile": "Профиль игрока",
        "screen.achievements": "Достижения",
        "settings.music": "Музыка",
        "settings.music_desc": "Можно полностью выключить музыку.",
        "settings.timer": "Таймер",
        "settings.timer_desc": "Если выключить, игра будет спокойнее.",
        "settings.ads": "Interstitial реклама",
        "settings.ads_desc": "Можно выключить полноэкранную рекламу в детском режиме.",
        "settings.low_perf": "⚡ Лёгкий режим",
        "settings.low_perf_desc": "Убирает тяжёлые эффекты (blur, тени, анимации фона). Быстрее на слабых устройствах.",
        "settings.reset": "Сброс прогресса",
        "settings.reset_desc": "Удалить уровни, монеты, животных и настройки.",
        "settings.reset_btn": "Сброс",
        "settings.language": "Язык",
        "settings.on": "Вкл",
        "settings.off": "Выкл",
        "lang.ru": "Русский",
        "lang.en": "English",
        "lang.hy": "Հայերեն",
        "parent.title": "Для родителей",
        "parent.subtitle": "Простой экран доверия для Play Market",
        "parent.what_trains": "Что тренирует игра",
        "parent.what_trains_text": "Память, внимание, реакцию, распознавание одинаковых картинок и узнавание звуков животных.",
        "parent.calm_mode": "Спокойный режим",
        "parent.calm_mode_text": "Можно играть без таймера, чтобы ребёнок не нервничал.",
        "parent.privacy": "Данные и приватность",
        "parent.privacy_text": "В HTML-версии нет регистрации и аккаунта. Прогресс хранится локально на устройстве.",
        "parent.ads_info": "Реклама",
        "parent.back_btn": "Назад",
        "guide.tip": "Подсказка",
        "guide.helper": "Помощник",
        "guide.mini_help": "Мини-помощь",
        "guide.next": "Дальше",
        "guide.skip": "Пропустить",
        "guide.done": "Готово",
        "guide.tap_hint": "Нажми на нужный элемент",
        "guide.drag_hint": "Потяни пальцем",
        "guide.scroll_hint": "Прокрути экран",
        "guide.color_hint": "Выбери цвет",
        "loading.title": "Zoo Pet World",
        "loading.text": "Загружаем питомца и 50 уровней зоопарка...",
        "loading.btn": "Открыть игру",
        "daily.title": "Ежедневный подарок",
        "daily.btn": "Забрать подарок",
        "daily.coins": "+{n} монет! Серия: {days} дн.",
        "misc.coins_label": "монет",
        "misc.level": "Уровень",
        "misc.stars": "Звёзды",
        "misc.score": "Очки",
        "misc.timer": "Таймер",
        "sound.on": "Звук: Вкл",
        "sound.off": "Звук: Выкл",
        "music.on": "Музыка: Вкл",
        "music.off": "Музыка: Выкл",
        "mode.timed": "С таймером",
        "mode.calm": "Спокойный",
        "mode.timer_chip": "⏱ Таймер",
        "mode.calm_chip": "🧘 Спокойно",
        "mode.calm_html": "🧘 Без таймера",
        "mode.timed_subtitle": "Режим с таймером",
        "mode.calm_subtitle": "Спокойный режим без таймера",
        "pairs.play": "Играть",
        "pairs.locked": "Закрыто",
        "pairs.hurry": "Быстрее! Время почти закончилось ⏳",
        "pairs.found": "Супер! Найдено {matched}/{total} ⭐",
        "pairs.wrong": "Не пара, попробуй ещё 🙂",
        "pairs.no_mistake_wrong": "Ошибка! Звёзд будет меньше 🙂",
        "pairs.next_pair": "Ищи следующую пару 👀",
        "pairs.win_title": "Уровень пройден!",
        "pairs.win_all": "Игра пройдена!",
        "pairs.win_next": "Следующий уровень",
        "pairs.win_restart": "Играть заново",
        "pairs.win_text": "Получено {reward} монет. Открыто: {animal}.",
        "pairs.timeout_title": "Время вышло",
        "pairs.timeout_text": "Ничего страшного. Можно повторить уровень или включить спокойный режим.",
        "pairs.retry": "Повторить уровень",
        "myzoo.title": "Мой зоопарк",
        "myzoo.soon": "Скоро",
        "myzoo.text": "Это будет главный большой раздел игры: вольеры, животные, развитие за монетки.",
        "myzoo.ok": "Понятно",
        "myzoo.toast": "Мой зоопарк скоро откроется 🐾",
        "timer.disabled_toast": "Таймер отключён в настройках родителей 🛡️",
        "petroom.drag_food": "Дотащи еду прямо к питомцу 🙂",
        "petroom.try_drag": "Попробуй дотащить еду прямо к животному 🙂",
        "petroom.buy_food_hint": "Покупай вкусняшки за монетки 🪙",
        "petroom.fed": "{animal} покушал {food}! Всего: {count} раз(а) 🥕",
        "petroom.food_owned": "{food} уже открыта ✅",
        "petroom.food_no_coins": "Не хватает монет: нужно {price} 🪙",
        "petroom.food_bought": "{food} открыта! {emoji}",
        "pets.stage_level": "Этап {stage} • уровень {level}",
        "pets.locked_fact": "Можно открыть по прогрессу или купить за {price} монет.",
        "pets.select_main": "Сделать главным питомцем",
        "pets.open_room": "Открыть комнату питомца ✅",
        "pets.voice_btn": "🔊 Голос",
        "pets.in_room": "Сейчас живёт в комнате 🏠",
        "pets.buy_price": "Купить за {price} 🪙",
        "pets.need_price": "Нужно {price} 🪙",
        "pets.mood": "Настроение: {mood}",
        "puzzle.assemble": "Собери: {label}",
        "puzzle.complete": "Пазл собран!<br/><small>Награда: +{reward} монет 🪙{extra}</small>",
        "shadow.level_badge": "⭐ Уровень {level} • {diff}",
        "shadow.streak": "🔥 Серия {n}",
        "shadow.find_one": "Найди животное по тени 👆",
        "shadow.find_many": "Найди {n} зверька по тени 👆",
        "shadow.correct_remain": "Верно! Это {name}! Осталось: {left} 💚",
        "shadow.level_done": "Уровень пройден! +{reward}🪙 🎉",
        "shadow.wrong_one": "Почти! Этот зверёк не из теней 💚",
        "shadow.wrong_many": "Почти! Попробуй ещё раз 💚",
        "shadow.hint_remove": "Подсказка убрала одного лишнего зверька 💡",
        "shadow.hint_highlight": "Подсказка мягко подсветила нужного зверька 💡",
        "shadow.new_stage": "Новый этап открыт!",
        "shadow.perfect": "Идеально!",
        "shadow.great": "Молодец!",
        "shadow.celeb_text": "Ты нашёл: {done}. Награда: +{reward} монет.{perfect}{stage}",
        "shadow.find_progress": "Найди всех {word}: {found} / {total}",
        "shop.free": "Бесплатно",
        "shop.price_coins": "{price} монет",
        "shop.selected": "Выбран",
        "shop.select": "Выбрать",
        "shop.buy": "Купить",
        "shop.no_coins": "Не хватает",
        "tasks.done_toast": "Задание выполнено: +{reward} 🪙",
        "tasks.no_ready": "Пока нет готовых наград 🙂",
        "tasks.claim_all": "Все готовые задания: +{reward} 🪙",
        "tasks.claimed": "Получено",
        "tasks.claim": "Забрать",
        "daily.gift_text": "Сегодняшний подарок: +{coins} монет! Серия: {streak} дн.",
        "daily.gift_toast": "Ежедневный подарок: +{coins} 🪙",
        "block.reward_pop": "Награда: +{coins} монет 🪙",
        "block.gameover": "Игра окончена",
        "error.game": "Ошибка игры исправляется: {msg}",
        "misc.no_timer": "🧘 Без таймера",
        "lang.ru_btn": "🇷🇺 Русская версия"
    };

    // ── Inline EN strings — available immediately for EN users ───────────────
    const EN_INLINE = {
        "nav.home": "Home",
        "nav.back": "Back",
        "nav.close": "Close",
        "btn.next": "Next",
        "btn.skip": "Skip",
        "btn.done": "Done",
        "btn.confirm": "Confirm",
        "btn.cancel": "Cancel",
        "btn.retry": "Retry",
        "btn.save": "Save",
        "btn.buy": "Buy",
        "btn.unlock": "Unlock",
        "btn.open": "Open Game",
        "menu.title": "Zoo Pet World",
        "menu.subtitle": "Mini-games, pets and a children's zoo",
        "menu.coins": "Coins",
        "menu.my_zoo": "My Zoo",
        "menu.play": "Play",
        "menu.mini_games": "mini-games",
        "menu.my_world": "My World",
        "menu.profile": "Profile",
        "menu.soon": "Soon",
        "menu.coming_soon": "Coming soon: enclosures, animals and upgrades for coins.",
        "game.pairs": "Find Pairs",
        "game.map": "Level Map",
        "game.shadow": "Find the Animal",
        "game.puzzle": "Puzzle",
        "game.block": "Zoo Block",
        "game.coloring": "Coloring",
        "game.pet_room": "Pet Room",
        "game.album": "Animal Album",
        "game.pets": "All Animals",
        "game.shop": "Shop",
        "game.tasks": "Tasks",
        "game.pairs_sub": "choose calm mode or timer",
        "game.map_sub": "enclosures, stars and 50 levels",
        "game.shadow_sub": "guess the animal by its shadow",
        "game.puzzle_sub": "stages, locks and pictures",
        "game.block_sub": "blocks, lines and combos",
        "game.coloring_sub": "pick a color and tap to fill",
        "game.pet_room_sub": "feed, wash and grow your pet",
        "game.album_sub": "unlock cards after completing levels",
        "game.pets_sub": "list, care and buy pets",
        "game.shop_sub": "skins, coins, appearance",
        "game.tasks_sub": "daily tasks and rewards",
        "screen.pairs": "Find Pairs",
        "screen.map": "Level Map",
        "screen.shadow": "Find the Shadow",
        "screen.puzzle": "Puzzle",
        "screen.block": "Zoo Block",
        "screen.coloring": "Coloring",
        "screen.pet_room": "My Pet",
        "screen.album": "Animal Album",
        "screen.pets": "My Animals",
        "screen.shop": "Shop",
        "screen.tasks": "Tasks",
        "screen.parent": "For Parents",
        "screen.audio": "Sound & Music",
        "screen.profile": "Player Profile",
        "screen.achievements": "Achievements",
        "settings.music": "Music",
        "settings.music_desc": "You can fully turn off the music.",
        "settings.timer": "Timer",
        "settings.timer_desc": "Turn off for a calmer experience.",
        "settings.ads": "Interstitial Ads",
        "settings.ads_desc": "Disable full-screen ads in children's mode.",
        "settings.low_perf": "⚡ Light Mode",
        "settings.low_perf_desc": "Removes heavy effects (blur, shadows, background animations). Faster on weak devices.",
        "settings.reset": "Reset Progress",
        "settings.reset_desc": "Delete levels, coins, animals and settings.",
        "settings.reset_btn": "Reset",
        "settings.language": "Language",
        "settings.on": "On",
        "settings.off": "Off",
        "lang.ru": "Русский",
        "lang.en": "English",
        "lang.hy": "Հայերեն",
        "parent.title": "For Parents",
        "parent.subtitle": "Simple trust screen for the Play Store",
        "parent.what_trains": "What the game trains",
        "parent.what_trains_text": "Memory, attention, reaction, pattern recognition and animal sound identification.",
        "parent.calm_mode": "Calm Mode",
        "parent.calm_mode_text": "Play without a timer so the child stays relaxed.",
        "parent.privacy": "Data & Privacy",
        "parent.privacy_text": "The HTML version has no registration or account. Progress is stored locally on the device.",
        "parent.ads_info": "Advertising",
        "parent.back_btn": "Back",
        "guide.tip": "Hint",
        "guide.helper": "Helper",
        "guide.mini_help": "Mini-help",
        "guide.next": "Next",
        "guide.skip": "Skip",
        "guide.done": "Done",
        "guide.tap_hint": "Tap the element",
        "guide.drag_hint": "Drag with your finger",
        "guide.scroll_hint": "Scroll the screen",
        "guide.color_hint": "Pick a color",
        "loading.title": "Zoo Pet World",
        "loading.text": "Loading your pet and 50 zoo levels...",
        "loading.btn": "Open Game",
        "daily.title": "Daily Gift",
        "daily.btn": "Claim Gift",
        "daily.coins": "+{n} coins! Streak: {days} days.",
        "misc.coins_label": "coins",
        "misc.level": "Level",
        "misc.stars": "Stars",
        "misc.score": "Score",
        "misc.timer": "Timer",
        "sound.on": "Sound: On",
        "sound.off": "Sound: Off",
        "music.on": "Music: On",
        "music.off": "Music: Off",
        "mode.timed": "Timed",
        "mode.calm": "Calm",
        "mode.timer_chip": "⏱ Timer",
        "mode.calm_chip": "🧘 Calm",
        "mode.calm_html": "🧘 No timer",
        "mode.timed_subtitle": "Timed mode",
        "mode.calm_subtitle": "Calm mode without timer",
        "pairs.play": "Play",
        "pairs.locked": "Locked",
        "pairs.hurry": "Hurry! Time is almost up ⏳",
        "pairs.found": "Great! Found {matched}/{total} ⭐",
        "pairs.wrong": "Not a pair, try again 🙂",
        "pairs.no_mistake_wrong": "Mistake! Fewer stars 🙂",
        "pairs.next_pair": "Find the next pair 👀",
        "pairs.win_title": "Level complete!",
        "pairs.win_all": "All done!",
        "pairs.win_next": "Next level",
        "pairs.win_restart": "Play again",
        "pairs.win_text": "Earned {reward} coins. Unlocked: {animal}.",
        "pairs.timeout_title": "Time's up",
        "pairs.timeout_text": "No worries. Retry the level or switch to calm mode.",
        "pairs.retry": "Retry level",
        "myzoo.title": "My Zoo",
        "myzoo.soon": "Coming soon",
        "myzoo.text": "The main zoo section is coming: enclosures, animals, upgrades for coins.",
        "myzoo.ok": "Got it",
        "myzoo.toast": "My Zoo opens soon 🐾",
        "timer.disabled_toast": "Timer disabled in parent settings 🛡️",
        "petroom.drag_food": "Drag food to your pet 🙂",
        "petroom.try_drag": "Try dragging food to the animal 🙂",
        "petroom.buy_food_hint": "Buy treats for coins 🪙",
        "petroom.fed": "{animal} ate {food}! Total: {count} time(s) 🥕",
        "petroom.food_owned": "{food} already owned ✅",
        "petroom.food_no_coins": "Not enough coins: need {price} 🪙",
        "petroom.food_bought": "{food} unlocked! {emoji}",
        "pets.stage_level": "Stage {stage} • level {level}",
        "pets.locked_fact": "Unlock via progress or buy for {price} coins.",
        "pets.select_main": "Set as main pet",
        "pets.open_room": "Open pet room ✅",
        "pets.voice_btn": "🔊 Voice",
        "pets.in_room": "Currently in room 🏠",
        "pets.buy_price": "Buy for {price} 🪙",
        "pets.need_price": "Need {price} 🪙",
        "pets.mood": "Mood: {mood}",
        "puzzle.assemble": "Assemble: {label}",
        "puzzle.complete": "Puzzle done!<br/><small>Reward: +{reward} coins 🪙{extra}</small>",
        "shadow.level_badge": "⭐ Level {level} • {diff}",
        "shadow.streak": "🔥 Streak {n}",
        "shadow.find_one": "Find the animal by shadow 👆",
        "shadow.find_many": "Find {n} animals by shadow 👆",
        "shadow.correct_remain": "Correct! It's {name}! Left: {left} 💚",
        "shadow.level_done": "Level done! +{reward}🪙 🎉",
        "shadow.wrong_one": "Almost! That animal is not from the shadows 💚",
        "shadow.wrong_many": "Almost! Try again 💚",
        "shadow.hint_remove": "Hint removed one extra animal 💡",
        "shadow.hint_highlight": "Hint gently highlighted the right animal 💡",
        "shadow.new_stage": "New stage unlocked!",
        "shadow.perfect": "Perfect!",
        "shadow.great": "Well done!",
        "shadow.celeb_text": "You found: {done}. Reward: +{reward} coins.{perfect}{stage}",
        "shadow.find_progress": "Find all {word}: {found} / {total}",
        "shop.free": "Free",
        "shop.price_coins": "{price} coins",
        "shop.selected": "Selected",
        "shop.select": "Select",
        "shop.buy": "Buy",
        "shop.no_coins": "Not enough",
        "tasks.done_toast": "Task complete: +{reward} 🪙",
        "tasks.no_ready": "No rewards ready yet 🙂",
        "tasks.claim_all": "All ready tasks: +{reward} 🪙",
        "tasks.claimed": "Claimed",
        "tasks.claim": "Claim",
        "daily.gift_text": "Today's gift: +{coins} coins! Streak: {streak} days.",
        "daily.gift_toast": "Daily gift: +{coins} 🪙",
        "block.reward_pop": "Reward: +{coins} coins 🪙",
        "block.gameover": "Game over",
        "error.game": "Game error being fixed: {msg}",
        "misc.no_timer": "🧘 No timer",
        "lang.ru_btn": "🇷🇺 Russian"
    };

    // ── State ─────────────────────────────────────────────────────────────────
    const cache = { ru: RU_INLINE, en: EN_INLINE };
    let currentLanguage = FALLBACK_LANG;
    let _pendingLoad = null;

    // ── Helpers ───────────────────────────────────────────────────────────────
    function _resolve(key, lang) {
        const strings = cache[lang];
        if (strings && strings[key] !== undefined) return strings[key];
        if (lang !== FALLBACK_LANG && RU_INLINE[key] !== undefined) return RU_INLINE[key];
        return null;
    }

    function _interpolate(str, params) {
        if (!params || typeof str !== 'string') return str;
        return str.replace(/\{(\w+)\}/g, (_, k) => (params[k] !== undefined ? params[k] : `{${k}}`) );
    }

    // ── Async JSON loader (HY only) ───────────────────────────────────────────
    async function _loadLang(lang) {
        if (cache[lang]) return;
        try {
            const url = `${I18N_BASE}${lang}.json`;
            const r = await fetch(url);
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const data = await r.json();
            const clean = {};
            for (const [k, v] of Object.entries(data)) {
                if (k !== '_meta') clean[k] = v;
            }
            cache[lang] = clean;
        } catch (e) {
            console.warn(`[i18n] failed to load ${lang}.json (${e.message}), using RU fallback`);
            cache[lang] = RU_INLINE;
        }
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * t(key, params?)
     * Translated string for current language with {param} interpolation.
     * Falls back: currentLang → RU_INLINE → key itself.
     * voiceKey: step.voiceKey field is reserved for future audio, not played here.
     */
    window.t = function t(key, params) {
        if (!key) return '';
        const str = _resolve(key, currentLanguage);
        if (str === null) {
            if (!MISSING_WARNED.has(key)) {
                console.warn(`[i18n] missing key: "${key}" for lang: "${currentLanguage}"`);
                MISSING_WARNED.add(key);
            }
            return key;
        }
        return _interpolate(str, params);
    };

    /** getCurrentLanguage() — overrides the same-named function in index.html */
    window.getCurrentLanguage = function getCurrentLanguage() {
        return currentLanguage;
    };

    /**
     * setLanguage(lang) — persists and reloads.
     * Called from language selector in parent settings.
     */
    window.setLanguage = function setLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) {
            console.warn(`[i18n] unsupported lang "${lang}", using "${FALLBACK_LANG}"`);
            lang = FALLBACK_LANG;
        }
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
        try { if (window.safeStorage) safeStorage.set(STORAGE_KEY, lang); } catch (e) {}
        location.reload();
    };

    window.I18N_SUPPORTED_LANGS = SUPPORTED_LANGS;
    window.i18nReady = function i18nReady() { return !!cache[currentLanguage]; };

    // ── Initialization ────────────────────────────────────────────────────────
    (function _init() {
        let saved = FALLBACK_LANG;
        try { saved = localStorage.getItem(STORAGE_KEY) || FALLBACK_LANG; } catch (e) {}
        if (!SUPPORTED_LANGS.includes(saved)) saved = FALLBACK_LANG;
        currentLanguage = saved;

        if (currentLanguage === 'hy' && !cache['hy']) {
            _pendingLoad = _loadLang('hy');
            _pendingLoad.then(() => {
                try { window.dispatchEvent(new CustomEvent('i18nReady', { detail: { lang: 'hy' } })); } catch(e) {}
            });
        }
    })();

})();
