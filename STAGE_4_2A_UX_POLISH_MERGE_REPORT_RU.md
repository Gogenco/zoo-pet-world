# STAGE 4.2A UX POLISH + 4.2B MERGE REPORT

База: Cloud `ZooPetWorld_stage4_2B_i18n_completion.zip`.

Что добавлено мной поверх Cloud Stage 4.2B:

1. Главное меню: кнопка языка теперь открывает popup выбора языка RU / EN / HY, а не переключает только RU/EN.
2. Во всплывающие окна добавлен безопасный крестик `×`: покупки, реклама, daily gift, уровень, shadow celebration, Zoo Block gameover, guide/helper, language picker, puzzle complete.
3. Звук животного убран из списка `Мои животные` и перенесён в комнату активного питомца (`petRoomVoiceBtn`).
4. После сборки пазла теперь открывается action-popup с вариантами: следующий режим/уровень, другая открытая картинка, открыть новую картинку, сыграть ещё раз, поиграть в другую игру.
5. В комнате питомца добавлен заголовок `Поиграй в другую игру` над мини-играми.
6. Иконки главного меню не менялись — ждём отдельный набор от пользователя.
7. Поверх Cloud ZIP возвращён hardened `assets/js/zoo_economy_rewards_step2.js` из Stage 4.1 + Stage 3.4, чтобы не потерять modal/overlay stability.

Что сохранено от Cloud Stage 4.2B:

- 191 i18n keys в RU / EN / HY;
- расширенный перевод UI;
- `assets/js/features/i18n.js`;
- `parentSettings.js`;
- отчёт `STAGE_4_2B_I18N_COMPLETION_REPORT_RU.md`.

Проверки выполнены:

- `.git` отсутствует;
- `assets/inline` = 54 файла;
- `coloringImages.js` содержит 30 embedded PNG раскрасок;
- `warmAllCleanAnimalSprites()` не вызывается на старте;
- External JS syntax OK;
- Inline JS syntax OK.

Полный Playwright smoke test в моей среде не запускался из-за отсутствующего Playwright Chromium.
