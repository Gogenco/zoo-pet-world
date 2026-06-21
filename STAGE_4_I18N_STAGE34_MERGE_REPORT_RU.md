# Stage 4 i18n + Stage 3.4 UI Stability Merge Report

Дата: 2026-06-21

## База

- Cloud ZIP: `ZooPetWorld_stage4_i18n.zip`
- Assistant stability base: `ZooPetWorld_stage3_4_ui_stability_overlay_audit.zip`

## Что сохранено из Cloud Stage 4

- `assets/i18n/ru.json`
- `assets/i18n/en.json`
- `assets/i18n/hy.json`
- `assets/js/features/i18n.js`
- language selector in `assets/js/features/parentSettings.js`
- i18n script wiring in `index.html`
- guide `voiceKey` fields / i18n-aware `guideT()`

## Что перенесено из Assistant Stage 3.4

- Hardened modal layer for purchase dialogs, rewarded ads, daily gift, celebrations, Zoo Block gameover, standard modal and guide overlay.
- `body.zoo-modal-open` state to prevent guide/page hints from blocking modals.
- Strong z-index / pointer-events / mobile touch safety for modal buttons.
- Hardened `showPurchaseConfirm()` and `ensureRewardedAdOverlay()` in `assets/js/zoo_economy_rewards_step2.js`.
- `tests/smoke_test.py` restored.

## Не трогалось

- Game mechanics.
- Shop/economy rules.
- Coloring logic.
- Sound/music logic.
- New mini-games.
- Unity/React Native.

## Проверки

- `.git`: отсутствует.
- JS syntax check: см. итоговый ответ.
- `assets/inline`: 54 files.
- `coloringImages.js`: 30 embedded coloring PNG.
- `warmAllCleanAnimalSprites()` на старте: не вызывается.
