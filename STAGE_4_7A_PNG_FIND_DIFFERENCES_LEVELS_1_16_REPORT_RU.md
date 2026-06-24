# Stage 4.7A — PNG Find Differences Levels 1–16 Integration

## Что сделано

Интегрированы premium PNG-сцены в мини-игру **«Найди отличия»**.

Теперь в игре 16 уровней:
1. lion
2. panda
3. dolphin
4. parrot
5. elephant
6. giraffe
7. zebra
8. hippo
9. kangaroo
10. koala
11. turtle
12. penguin
13. rabbit
14. fox
15. deer
16. squirrel

## Источники

Использованы загруженные пользователем ZIP:
- `previous_chat_lion_collection_images 2(1).zip`
- `animals_levels_5_16(1).zip`

## Что изменено

- Добавлена папка: `assets/spotdiff_png/`
- Добавлено 32 PNG-файла: left/right для 16 уровней.
- `spotDiffLevels` заменён на 16 PNG-based уровней.
- Каждая картинка приведена к размеру 1000x700.
- Для portrait PNG уровней 5–16 сделан landscape canvas 1000x700 с blurred side background.
- Для каждого уровня добавлены 5 координат отличий.

## Что НЕ трогалось

- механика tap detection;
- hint;
- found markers;
- wrong tap;
- zoom/pan/double tap;
- unlock/rewards;
- victory modal;
- coloring;
- pet room;
- другие мини-игры.

## Проверки

- External JS syntax: OK
- Inline JS syntax: OK
- spotDiffLevels: 16
- differences per level: 5/5/5/5/5/5/5/5/5/5/5/5/5/5/5/5
- PNG assets: 32
- RU/EN/HY i18n keys unchanged: 296/296/296

## Файл

`ZooPetWorld_stage4_7A_png_find_differences_levels_1_16.zip`
