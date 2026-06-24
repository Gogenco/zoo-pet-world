# STAGE 4.6B — FIND DIFFERENCES VISUAL PACK INTEGRATION REPORT RU

## База

`ZooPetWorld_stage4_6A_pet_room_decor_mvp.zip`

## Что сделано

- Интегрирован Cloud visual pack `FIND_DIFFERENCES_VISUAL_PACK_STAGE_4_6.md`.
- Старые слабые procedural-сцены заменены на inline SVG-сцены из visual pack.
- Добавлено 4 уровня:
  1. Львёнок в солнечном парке — easy
  2. Панда у бамбука — medium
  3. Дельфин у моря — hard
  4. Попугай в джунглях — hard+
- Каждый уровень содержит левую SVG-сцену, правую SVG-сцену и ровно 5 отличий.
- Координаты переведены на систему `1000×700`, чтобы совпадать с `viewBox`.
- Радиусы оставлены из файла Cloud: 22–40 px в SVG-координатах.
- Исправлена tap-detection логика под SVG `1000×700`.
- Исправлены маркеры найденных отличий и подсказки под SVG `1000×700`.
- Возвращена карточка “Найди отличия” в главное меню для теста.
- Сохранены guide, locked/unlocked, покупка закрытых уровней, reward once, popup completion, pinch/pan/double tap.

## Что не трогалось

- Найди пары
- Карта уровней Найди пары
- Раскраска Stage 4.5E
- Puzzle
- Shadow
- Zoo Block
- Pet Room Decor Stage 4.6A
- Save/export/import
- Parent release guard
- Daily gift/tasks/streak

## Проверки

- Visual pack levels: 4
- SVG blocks: 8
- JSON blocks: 4
- Diff count per level: 5/5/5/5
- Diff coordinates in range: OK
- Max radius: <= 40
- External JS: OK
- Inline JS: OK
- t() missing keys: 0
- `.git`: absent

## Что проверить вручную

1. Главное меню → Найди отличия.
2. Уровень 1 показывает Cloud SVG-сцены, а не старый прототип.
3. Тап по реальному отличию засчитывает.
4. Тап вне отличия показывает miss.
5. Подсказка мигает на точном месте.
6. После 5/5 появляется popup.
7. Уровень 2 закрыт до прохождения 1 или покупки.
8. Pinch zoom / pan / double tap reset работают.
9. Раскраска после 4.5E всё ещё работает.
10. Pet Room Decor 4.6A всё ещё работает.
