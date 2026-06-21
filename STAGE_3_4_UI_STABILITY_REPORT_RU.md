# Zoo Pet World — Stage 3.4 UI Stability / Overlay Audit

База: `ZooPetWorld_stage3_3_hotfix_purchase_modal.zip`.

## Цель
Не добавлять новые фичи и не трогать i18n, а стабилизировать UI-слои, чтобы всплывающие окна не вылезали обычным текстом поверх фона.

## Что изменено

### 1. Общий overlay audit
В `index.html` добавлен блок:

- `assistant-stage3-4-overlay-audit`
- `assistant-stage3-4-overlay-audit-script`

Он контролирует основные всплывающие окна:

- обычный level/modal overlay;
- purchase confirm overlay;
- rewarded ad overlay;
- daily gift overlay;
- shadow celebration overlay;
- Zoo Block gameover overlay;
- guide/helper overlay.

### 2. Единый modal-layer
Для overlay-окон усилены:

- `position: fixed`;
- `inset: 0`;
- высокий `z-index`;
- центрирование карточки;
- `pointer-events`;
- `max-height` и scroll внутри карточки;
- `safe-area` padding для телефона;
- отключение тяжёлого blur в лёгком режиме.

### 3. Purchase modal hardening
В `assets/js/zoo_economy_rewards_step2.js` усилен `showPurchaseConfirm()`:

- overlay получает inline failsafe-стили при каждом открытии;
- карточка покупки получает max-width/max-height;
- добавлен `closePurchaseConfirm()`;
- Escape закрывает окно покупки;
- кнопки работают с `touch-action: manipulation`;
- при открытом modal отключается плавающая кнопка гида, чтобы не перекрывала окно.

### 4. Rewarded ad modal hardening
В `assets/js/zoo_economy_rewards_step2.js` усилен `rewardedAdOverlay`:

- overlay получает inline failsafe-стили;
- при закрытии снимается modal-state;
- окно рекламы не должно превращаться в обычный текст на фоне.

### 5. Body modal state
Добавлен класс:

- `body.zoo-modal-open`

Когда открыт popup/modal, он блокирует лишние поверхностные элементы типа `#guideFab` и `#pageScrollHint`.

## Что не трогалось

- i18n / языки;
- новые мини-игры;
- Unity / React Native;
- игровые механики;
- магазин по логике;
- экономика по балансам;
- раскраска по логике;
- музыка и звуки.

## Проверки

- `.git`: нет.
- `assets/inline`: 54 файла.
- `coloringImages.js`: 30 embedded coloring PNG.
- `warmAllCleanAnimalSprites()` на старте: не вызывается.
- External JS syntax: OK.
- Inline JS syntax: OK.

## Что проверить вручную после деплоя

1. Купить картинку в Puzzle.
2. Купить этап в Puzzle.
3. Купить питомца.
4. Купить еду.
5. Купить раскраску.
6. Купить скин.
7. Открыть rewarded ad / бонус подсказок.
8. Открыть helper `?` поверх разных экранов.
9. Проверить всё в лёгком режиме.
