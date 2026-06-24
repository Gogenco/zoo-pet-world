# Stage 4.5E — Coloring Tap-Fill Hotfix

## База
`ZooPetWorld_stage4_5D_find_differences_critical_rebuild.zip`

## Цель
Починить раздел **Раскраска**, где картинка отображалась, но области не закрашивались при tap.

## Причина
После фикса размера картинки Stage 4.4C скрытый `coloringBoundaryCanvas` местами строился из исходной PNG-картинки целиком. В некоторых PNG есть near-white / anti-aliased пиксели. Старый `isBoundaryPixel()` с порогом brightness `< 250` мог считать слишком большую часть картинки границей, поэтому flood-fill не начинал закрашивание.

## Что исправлено

В `assets/js/zoo_coloring_reset_step2.js` добавлен финальный hotfix:

- `Stage 4.5E — Coloring tap-fill boundary hotfix`
- исходная картинка переводится в прозрачную black-line mask;
- только реальные тёмные контуры становятся boundary;
- белые/почти белые области остаются заливочными;
- внешние поля вокруг картинки остаются заблокированы и не красятся;
- `isBoundaryPixel()` смягчён, чтобы near-white пиксели не блокировали заливку;
- outline и hidden boundary пересобираются после render/select template.

## Что не трогалось

- Найди пары
- карта уровней Найди пары
- Найди отличия Stage 4.5D
- Пазл
- Найди животное
- Zoo Block
- Питомцы
- save/export/import
- parent release guard
- daily gift/tasks/streak
- i18n файлы

## Проверки

- External JS syntax: OK
- Inline JS syntax: OK
- RU keys: 280
- EN keys: 280
- HY keys: 280
- keysets equal: True
- t() missing keys: 0
- `.git`: отсутствует
- `index.html`: 710120 bytes
- `zoo_coloring_reset_step2.js`: 64878 bytes

## Что проверить руками

1. Главный экран → Раскраска.
2. Выбрать цвет.
3. Нажать внутри белой области картинки.
4. Область должна закраситься.
5. Нажать по внешнему полю вокруг картинки — внешний фон не должен краситься.
6. Проверить другую раскраску из ленты.
7. Проверить zoom/pan, если картинка увеличена.
