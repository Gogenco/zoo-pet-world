# Stage 4.1 Economy Critical Fix + Stage 3.4 Stability Merge Report

## База

Смержено:

- Cloud ZIP: `ZooPetWorld_economy_fix.zip`
- Наша стабильная база: `ZooPetWorld_stage4_i18n_stage34_merged_final.zip`

Итоговая версия сохраняет Stage 4 i18n и Stage 3.4 overlay/modal fixes.

## Что изменено в экономике

1. `PRICE_MULTIPLIER` изменён с `5` на `3` в `assets/js/zoo_economy_rewards_step2.js`.
2. Daily tasks теперь сохраняют полный reward, без `halfReward(task.reward)`.
3. Achievements теперь сохраняют полный reward, без `halfReward(item.reward)`.
4. Daily gift теперь выдаёт полную сумму `20–50` монет через `getDailyGiftReward()`.
5. Daily gift overlay больше не показывает жёстко прошитое `+20`; стартовый текст заменён на безопасное `Загружаем подарок...`, дальше UI берёт актуальную сумму.
6. Zoo Block теперь выдаёт полный score-based reward: минимум `8` монет за завершённую партию.
7. Shadow теперь выдаёт полный reward за животное/уровень: минимум `5`, дальше по сложности.

## Что сохранено из Stage 3.4

- `assistant-stage3-4-overlay-audit` CSS/script в `index.html`.
- `body.zoo-modal-open`.
- Усиленные modal/popup стили для покупки, rewarded ad, daily gift, shadow celebration, Zoo Block gameover, standard modal, guide overlay.
- Hardened `showPurchaseConfirm()` и `ensureRewardedAdOverlay()` в `assets/js/zoo_economy_rewards_step2.js`.
- Защита от popup-as-plain-text бага.
- `tests/smoke_test.py` сохранён.

## Что сохранено из Stage 4 i18n

- `assets/i18n/ru.json`, `en.json`, `hy.json`.
- `assets/js/features/i18n.js`.
- Language selector в `parentSettings.js`.
- `voiceKey` в guide steps.

## Проверки

- `.git`: отсутствует.
- `assets/inline`: 54 файла.
- `coloringImages.js`: 30 embedded coloring PNG.
- `warmAllCleanAnimalSprites()`: не вызывается на старте.
- External JS syntax: OK.
- Inline JS syntax: OK.

## Замечание

Некоторые legacy-вызовы `halfReward(...)` ещё остаются в других местах, например в отдельных game rewards типа memory/puzzle. Это не трогалось в Stage 4.1, чтобы не менять всю экономику сразу. В рамках задачи убран halfReward с daily tasks, achievements, daily gift, Zoo Block и Shadow.
