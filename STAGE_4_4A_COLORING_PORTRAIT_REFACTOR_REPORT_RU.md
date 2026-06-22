# Stage 4.4A — Coloring Portrait UX Refactor

## База

`ZooPetWorld_stage4_3D_release_critical_bugfix_merged_final.zip`

## Цель

Переделать раздел **Раскраска** под вертикальный телефон без принуждения ребёнка переворачивать экран.

## Что удалено

- HTML overlay `coloringRotateOverlay`.
- Тексты и подсказки про поворот телефона.
- Зелёные scroll-кнопки раскраски `↑ / ↓`.
- DOM-кнопки `coloringScrollBtn` и `coloringScrollUpBtn`.
- JS-функции:
  - `getColoringScrollContainer`
  - `coloringScrollUpdateBtn`
  - `coloringScrollToTop`
  - `coloringScrollToBottom`
  - `coloringScrollToggle`
- Старые scroll/resize listeners для этих кнопок.
- Старые CSS-блоки:
  - rotate/landscape overlay;
  - Stage 4.4 wider coloring art fix;
  - Stage 4.5 edge-to-edge coloring canvas;
  - Stage 4.8 tap-to-fill coloring canvas layout patch;
  - Stage 4.2C dual coloring buttons override;
  - `coloring-import-patch`;
  - `coloring-mobile-polish-patch`;
  - `coloring-loupe-hotfix-style`.

## Что заменено

- Старый порядок раскраски заменён на portrait-first:
  1. Холст / картинка.
  2. Палитра горизонтальной swipe-лентой.
  3. Инструменты.
  4. Выбор раскрасок горизонтальной swipe-лентой.
- Canvas теперь адаптируется под вертикальный экран.
- Нативный скролл страницы используется только если экран реально не помещается.
- Зелёных кнопок скролла больше нет.

## Что сохранено

- Сами изображения раскрасок не менялись.
- Tap-to-fill сохранён.
- Покупка закрытых раскрасок сохранена через Stage 4.3C confirm.
- Popup “не хватает X 🪙” сохранён.
- Save/export/import не трогались.
- Parent release guard не трогался.
- Task streak не трогался.
- Pet room voice не трогался.
- Puzzle / food / memory / block / shadow не трогались.

## i18n

Добавлены ключи:

- `coloring.canvas_hint`
- `coloring.portrait_hint`

Key count:

- RU: 280
- EN: 280
- HY: 280

Все keyset совпадают: `True`.

## Проверки

- `coloringScrollBtn`: 0
- `coloringScrollUpBtn`: 0
- `coloringScrollUpdateBtn`: 0
- `coloringScrollToggle`: 0
- `coloring-rotate-overlay`: 0
- `Поверни`: 0
- `горизонтально`: 0
- CSS `content` с кириллицей: 0
- External JS syntax: OK
- Inline JS syntax: OK
- `t()` missing keys: 0
- `.git`: отсутствует
- `index.html`: 664381 bytes
- ZIP: будет собран без лишней верхней папки

## Smoke test

`tests/smoke_test.py` не удалось запустить в текущей среде, потому что Playwright browser executable отсутствует в контейнере:

`BrowserType.launch: Executable doesn't exist ... please run playwright install`

Это не JS-синтаксическая ошибка проекта, а ограничение среды проверки.

## Что проверить вручную

1. Открыть Раскраску на телефоне в portrait.
2. Убедиться, что просьбы повернуть экран нет.
3. Убедиться, что зелёных кнопок `↑ / ↓` нет.
4. Проверить, что холст виден нормально.
5. Проверить выбор цвета свайпом.
6. Проверить tap-to-fill.
7. Проверить выбор раскраски снизу.
8. Проверить покупку закрытой раскраски:
   - если хватает монет → confirm перед списанием;
   - если не хватает → маленький popup.
9. Проверить RU / EN / HY.
