# STAGE 4.6D — FIND DIFFERENCES SCENE ART POLISH MERGE

## База
`ZooPetWorld_stage4_6C_coloring_and_find_diff_polish.zip`

## Вход от Cloud
`FIND_DIFFERENCES_SCENE_ART_POLISH_STAGE_4_6D.md`

## Цель
Заменить только визуальные сцены и coordinates в мини-игре `Найди отличия`, не трогая механику.

## Что сделано
Интегрирован Scene Art Polish Pack:
- 4 уровня;
- 8 SVG-сцен;
- viewBox `0 0 1000 700`;
- 5 отличий на каждый уровень;
- используются только реальные PNG-животные из Zoo Pet World.

## PNG-животные
1. Лев: `assets/inline/asset_001_5b81d7e8e7a4.png`
2. Панда: `assets/inline/asset_002_6ff1be0e1e60.png`
3. Дельфин: `assets/inline/asset_030_3a72f0fd71e4.png`
4. Попугай: `assets/inline/asset_019_1b14d5a21d38.png`

## Аккуратные корректировки при интеграции
Cloud pack был хорошим, но перед вставкой были сделаны 2 точечные правки:
1. В Level 3 координата и объект `diff_fish` были внутри зоны PNG-дельфина. Рыбка перенесена вправо на `x=710`, чтобы отличие было вне животного и было видно.
2. В Level 4 в JSON был `diff_cloud`, но right SVG не уменьшал облако. Исправлено: right cloud scale `0.72`.

## Что НЕ трогалось
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
- double tap reset;
- Раскраска;
- Pet Room Decor;
- Найди пары;
- Пазл;
- Zoo Block;
- питомцы;
- save/export/import;
- parent release guard;
- tasks/streak;
- i18n.

## Проверки
- SVG blocks parsed: 8/8
- JSON levels parsed: 4/4
- Differences per level: 5/5/5/5
- PNG refs: 8
- External URL in SVG: 0
- Max radius: 38
- Source marker: `cloud_scene_art_polish_stage_4_6d_our_png`

## Ручная проверка
1. Главное меню → Найди отличия.
2. Проверить 4 уровня.
3. Проверить, что животные — наши PNG.
4. Проверить, что сцены богаче/приятнее.
5. Проверить tap по отличиям.
6. Проверить hint и markers.
7. Проверить общую victory modal после 5/5.
8. Проверить Раскраску, Pet Room Decor, Найди пары, Пазл, Zoo Block.
