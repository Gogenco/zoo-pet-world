# STAGE 4.3A — Save Stability / Release Guard + 4.3B merge

## База
Cloud ZIP: `ZooPetWorld_stage4_3B_progress_retention.zip`

## Что добавлено ассистентом

1. **Save schema version**
   - добавлен `zooSaveVersion = 4.3`;
   - при первом запуске Stage 4.3 создаётся backup перед миграцией.

2. **Backup перед миграцией / импортом**
   - `zooSaveBackup_stage43`;
   - `zooSaveBackup_before_import`.

3. **Export / Import save в разделе “Родителям”**
   - кнопка `Экспорт`;
   - кнопка `Импорт`;
   - кнопка `Backup`;
   - экспорт создаёт JSON-файл `zoo-pet-world-save-YYYY-MM-DD.json`.

4. **Проверка битых сохранений**
   - проверяются основные JSON-ключи localStorage;
   - статус виден в блоке Release guard.

5. **Release guard**
   В родительском разделе отображается:
   - версия Stage 4.3;
   - Save status;
   - язык;
   - монеты;
   - число открытых питомцев;
   - наличие backup.

## Что сохранено от Cloud Stage 4.3B
- Progress до питомца;
- Daily tasks streak;
- иконки мини-игр в задании;
- reward feedback;
- i18n keys 4.3B.

## Изменённые файлы
- `assets/js/features/parentSettings.js`;
- `assets/i18n/ru.json`;
- `assets/i18n/en.json`;
- `assets/i18n/hy.json`;
- `assets/js/features/i18n.js`;
- `index.html`.

## Проверки
- JS syntax check: OK;
- `.git`: отсутствует;
- `assets/inline`: 54 файла;
- `coloringImages.js`: 30 embedded PNG;
- `warmAllCleanAnimalSprites()` на старте: не вызывается.
