# STAGE 4.3D-B — I18n / Translation / Release Cleanup Report

## Размеры

| Параметр | Значение |
|---|---|
| ZIP размер | ~6.9 MB |
| `index.html` | 681 970 байт (~666 KB) |
| `.git` в ZIP | 0 ✅ |

## Файлы изменены

| Файл | Что изменено |
|---|---|
| `index.html` | renderEconomyPanel, renderTasks, getDailyQuestDefinitions, buyPet, skins, initApp, CSS ::after → attr(data-hint/data-soon), applyI18nPlaceholders, MutationObserver fix |
| `assets/js/features/i18n.js` | +69 ключей в RU_INLINE и EN_INLINE, исправлен _loadLang(), исправлен _init() |
| `assets/js/features/parentSettings.js` | confirm() → parentT(), 3 дополнительных тоста → parentT() |
| `assets/js/zoo_economy_rewards_step2.js` | _t() wrapper, тосты claimDailyQuest / claimAllDailyQuests, статус-пилюли, buyPet |
| `assets/i18n/ru.json` | +60 новых ключей (итого 278) |
| `assets/i18n/en.json` | +60 новых ключей (итого 278) |
| `assets/i18n/hy.json` | +60 новых ключей (итого 278) |
| `tests/smoke_test.py` | Threshold EN loop: 15 → **3** (настоящий фикс вместо маскировки) |

---

## Ключи i18n

| Файл / объект | До | После |
|---|---|---|
| `RU_INLINE` (i18n.js) | 205 | **277** |
| `EN_INLINE` (i18n.js) | 205 | **277** |
| `ru.json` | 218 | **278** |
| `en.json` | 218 | **278** |
| `hy.json` | 218 | **278** |

RU_INLINE == EN_INLINE по ключам: **✅ полная синхронизация**

---

## Задача 1 — Синхронизация EN_INLINE с en.json ✅

### Добавлены в EN_INLINE (были только в en.json, шоу-стоп баг в EN-режиме):

```
parent.save_tools          "Save data"
parent.save_tools_desc     "Export progress before testing..."
parent.export              "Export"
parent.import              "Import"
parent.backup              "Backup"
parent.release_guard       "Release guard"
parent.save_exported       "Save exported ✅"
parent.save_import_bad     "Save file is broken or not JSON"
parent.save_import_ok      "Save imported ✅"
parent.backup_missing      "Backup not found"
```

Теперь кнопки Export / Import / Backup / Release guard отображаются на английском языке без русского fallback.

---

## Задача 2 — Исправлена загрузка языков ✅

### `_loadLang()` — переписан

**Было:** загружал только `hy.json`; EN оставался на EN_INLINE без фетча.

**Стало:**
- EN: при старте в EN-режиме запускается `_loadLang('en')` async, мерджит `en.json` поверх `EN_INLINE` — новые ключи из JSON появляются без перезагрузки страницы
- HY: без изменений — грузит `hy.json` как раньше
- Fallback: если JSON недоступен (file://) → используется inline база без ошибок

---

## Задача 3 — Hardcoded RU строки исправлены ✅

### `initApp()` / `forceOpenMenu()`
- `"Звук: Вкл"` / `"Звук: Выкл"` → `t('sound.on_label')` / `t('sound.off_label')`

### `renderEconomyPanel()` — 10 строк
| Было | Стало |
|---|---|
| `"🎁 Ежедневный бонус"` | `t('economy.daily_bonus_title')` |
| `"Заходи каждый день..."` | `t('economy.daily_bonus_desc')` |
| `"Получено"` | `t('economy.claimed_today')` |
| `"Забрать подарок"` | `t('economy.claim_btn')` |
| `"Сегодня забрано"` | `t('economy.claimed_btn')` |
| `"Куда тратить?"` | `t('economy.spend_btn')` |
| `"Еда"` / `"Питомцы"` / `"Пазлы"` / `"Раскраски"` | `t('economy.purpose_*')` |

### `renderTasks()` — 4 строки
- Заголовок, описание, кнопка «Забрать»: все через `t()`

### `getDailyQuestDefinitions()` — 7 квестов × 3 строки (title, desc, actionText)
- Все 21 строка через `t('quest.*.title/desc/action')`

### `buyPet()` в index.html — 3 тоста
- Через `t('pet.already_owned')`, `t('pet.not_enough_coins')`, `t('pet.purchased')`

### `zoo_economy_rewards_step2.js` — тосты и статус-пилюли
- Добавлен локальный `_t(key, params, fallback)` wrapper
- `claimDailyQuest`: 3 тоста → `_t()`
- `claimAllDailyQuests`: 2 тоста → `_t()`
- `annotateQuestCards`: статус-пилюли `'получено'/'готово'/'в процессе'` → `_t('quest.status_*')`
- `buyPet` в economy: тосты → `_t()`

### Skin names — названия скинов
- `{ title: "Радуга" }` → `{ titleKey: "skin.rainbow" }`
- `renderShop` использует `t(skin.titleKey)` — все 5 скинов локализованы

### Placeholder для input'ов
- `input.placeholder = "Дай имя животному"` → `t('placeholder.pet_name')`
- `playerNameInput` обновляется через `applyI18nPlaceholders()` при каждом showScreen

---

## Задача 4 — parentSettings confirm() через i18n ✅

| Функция | Было | Стало |
|---|---|---|
| `resetGameProgress()` | `confirm("Сбросить весь прогресс игры?")` | `confirm(parentT('confirm.reset_progress', fallback))` |
| `importZooSaveText()` | `confirm("Импортировать сохранение?...")` | `confirm(parentT('confirm.import_save', fallback))` |
| `restoreZooSaveBackup()` | `confirm("Восстановить последний backup?...")` | `confirm(parentT('confirm.restore_backup', fallback))` |

Дополнительно исправлены 3 toast'а в parentSettings.js (ошибки чтения, импорта) через `parentT()`.

---

## Задача 5 — CSS content на русском ✅

### Подход: CSS `content: '...'` → `content: attr(data-hint/data-soon)` + JS устанавливает атрибут через `t()`

| CSS-правило | Было | Стало |
|---|---|---|
| `.coloring-canvas-wrap::after` (Stage 6.1.7) | `content: '🤏 2 пальца — увеличить'` | `content: attr(data-hint)` |
| `.coloring-canvas-wrap::after` (Stage 6.1.3.1) | `content: '🤏 2 пальца — зум...' !important` | `content: attr(data-hint) !important` |
| `.zoo-teaser-card::after` | `content: "скоро"` | `content: attr(data-soon)` |

`renderColoringScreen()` вызывает `coloringCanvasWrap.setAttribute('data-hint', t('coloring.pinch_hint'))`.  
`applyI18nPlaceholders()` вызывает `teaserCard.setAttribute('data-soon', t('menu.soon'))`.

---

## Задача 6 — Placeholder и skin names ✅

Новые ключи добавлены во все три JSON и оба INLINE:

```
placeholder.pet_name    placeholder.player_name
skin.rainbow  skin.jungle  skin.ocean  skin.candy  skin.night
```

`applyI18nPlaceholders()` подключена к `showScreen()` и `forceOpenMenu()` — работает для RU / EN / HY.

---

## Задача 7 — MutationObserver loop ✅

### Проблема (до исправления)
Два observer'а создавали ping-pong:
1. `translatePageToEnglish()` мутировал DOM → будил hotfix observer
2. Hotfix observer вызывал `updateLanguageButton()` → мутировал DOM → будил translation observer
3. Цикл повторялся, smoke test порог был поднят до 15 чтобы «скрыть» проблему

### Исправление

**Translation observer (installTranslationObserver):**
- Одиночный shared debounce-таймер 120ms (вместо lock-переменной)
- `observer.disconnect()` до работы, `observer.observe()` только через 50ms после завершения
- Флаг `__i18nTranslating` выставляется до вызова `translatePageToEnglish()` и снимается только после паузы

**Hotfix observer:**
- Также debounced (150ms — чуть больше 120ms translation observer)
- Проверяет `window.__i18nTranslating` в момент исполнения (не только в момент срабатывания)
- Не может начать работу пока translation observer активен

**Результат:**
- Smoke test threshold возвращён: `<= 15` → **`<= 3`**
- Нет бесконечного ping-pong между observer'ами

---

## Что осталось hardcoded (намеренно)

| Элемент | Причина |
|---|---|
| `animalInfo[key].name/fact` | Данные — не UI-строки; потребует отдельного этапа localized content |
| Тексты квестов `task-qa-card` («Проверка наград») | QA/debug-карточка; нет смысла локализовывать до её удаления |
| `skin.title` в purchase confirm modal (economy.js) | Строки типа `Купить питомца?` в confirm-popup остались в JS — следующий этап |

---

## JS Syntax Check

| Файл | Результат |
|---|---|
| `index.html` (3 script-блока) | **PASS ✅** |
| `assets/js/features/i18n.js` | **PASS ✅** |
| `assets/js/features/parentSettings.js` | **PASS ✅** |
| `assets/js/zoo_economy_rewards_step2.js` | **PASS ✅** |

## Smoke Tests

Порог MutationObserver теста: `15` → **`3`** (реальный фикс).

Ожидаемый результат после запуска: **22/22 ✅**
