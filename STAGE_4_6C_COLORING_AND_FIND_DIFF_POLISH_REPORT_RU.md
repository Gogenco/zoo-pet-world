# STAGE 4.6C — COLORING PRELOAD + FIND DIFFERENCES POLISH

## База
`ZooPetWorld_stage4_6B_find_differences_visual_pack_integration.zip`

## Цель
Точечно исправить 3 пункта без новых фич:
1. Раскраска: убрать неправильную картинку, которая мелькала перед загрузкой настоящей.
2. Найди отличия: заменить чужой SVG-звериный визуал на сцены с реальными PNG-животными из проекта.
3. Найди отличия: заменить кастомное поздравление на общую победную модалку игры.

---

## 1. Раскраска — preload bug

### Проблема
При открытии раскраски `showScreen("coloringScreen")` сразу вызывал `renderColoringScreen()`, и outline мог успеть отрисовать старую/дефолтную картинку до завершения lazy-load настоящих assets.

### Что сделано
- Добавлен loading guard `coloringIsLoadingScreen`.
- `openColoring()` теперь ставит loading BEFORE `showScreen("coloringScreen")`.
- `renderColoringScreen()` во время loading не рисует outline, а очищает видимый outline canvas.
- Добавлен `coloringOpenRequestToken`, чтобы старые async-callback не перерисовали экран после нового открытия.
- `requestColoringRedrawAfterAssetLoad()` не перерисовывает outline во время loading.

### Что НЕ трогалось
- Flood fill.
- Boundary mask.
- Логика заливки.
- Список раскрасок.
- Внешний фон/paint canvas.

---

## 2. Найди отличия — наши PNG-животные

### Проблема
Cloud visual pack был функционально лучше, но животные выглядели чужими SVG/clipart, не как Zoo Pet World.

### Что сделано
Заменены сцены `spotDiffLevels` на 4 уровня, где используются именно PNG-животные из `animalRasterMap`:

1. Лев — `assets/inline/asset_001_5b81d7e8e7a4.png`
2. Панда — `assets/inline/asset_002_6ff1be0e1e60.png`
3. Дельфин — `assets/inline/asset_030_3a72f0fd71e4.png`
4. Попугай — `assets/inline/asset_019_1b14d5a21d38.png`

Сцены остались offline inline SVG, но главный объект теперь — реальные игровые PNG-животные.

### Механика не менялась
Сохранены:
- tap detection;
- hint;
- found markers;
- wrong tap;
- locked/unlocked;
- reward once;
- guide;
- level rail;
- pinch zoom;
- pan;
- double tap reset.

---

## 3. Найди отличия — общая victory modal

### Проблема
После 5/5 использовался отдельный spot-diff popup без общей анимации/конфетти.

### Что сделано
- `showSpotDiffCompletePopup()` теперь использует общий `overlay` / `modalTitle` / `modalText` / `modalButton`.
- Запускается общий `createCelebration()` с confetti/stars/coins.
- В modalAnimal показывается PNG-животное текущего уровня.
- Основная кнопка: `Следующий уровень`.
- Дополнительные кнопки на время spotDiff victory:
  - `Играть снова`;
  - `Главное меню`.
- Добавлен safe restore для дефолтных secondary buttons после закрытия overlay.

---

## Проверки

- External JS syntax: OK
- Inline JS syntax: OK
- RU keys: 296
- EN keys: 296
- HY keys: 296
- i18n mismatch: 0
- Cloud visual pack source marker: 0
- New PNG spotDiff source marker: 4
- `.git`: отсутствует
- ZIP: без лишней верхней папки

## Что проверить вручную

### Раскраска
1. Открыть раскраску.
2. Проверить, что чужая/старая картинка не мелькает.
3. Проверить, что настоящая картинка загружается.
4. Проверить заливку.
5. Проверить 2–3 картинки.

### Найди отличия
1. Открыть `Найди отличия`.
2. Проверить, что животные — реальные PNG из Zoo Pet World.
3. Найти 5 отличий.
4. Проверить hint.
5. Проверить wrong tap.
6. После 5/5 проверить общую victory modal с анимацией/конфетти.
7. Проверить reward only once.
8. Проверить следующий уровень.

### Общие
1. Найди пары.
2. Раскраска.
3. Пазл.
4. Zoo Block.
5. Комната питомца + decor.
6. Save/export/import.
