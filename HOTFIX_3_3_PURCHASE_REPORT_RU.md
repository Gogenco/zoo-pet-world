# Zoo Pet World — Stage 3.3 Purchase Modal Hotfix

Дата: 2026-06-21
База: `ZooPetWorld_stage3_2_hotfix_guide_button.zip`

## Что исправлено

Баг: окно покупки пазлов/этапов/питомцев/еды/раскрасок/скинов отображалось как обычный текст справа на фоне игры, а не как модальное окно.

Причина: модуль `assets/js/zoo_economy_rewards_step2.js` создавал `purchase-confirm-overlay`, но для классов `purchase-confirm-*` не было гарантированных CSS-стилей в основной сборке.

## Изменения

- Добавлены стабильные стили для `.purchase-confirm-overlay`, `.purchase-confirm-card`, `.purchase-confirm-actions`.
- Overlay теперь фиксированный, по центру экрана, выше игровых слоёв.
- Добавлена поддержка `body.low-performance` без тяжёлого blur.
- Добавлена защита в JS: модуль сам добавляет CSS через `ensurePurchaseConfirmStyles()`, если стили отсутствуют.
- Добавлены `role="dialog"`, `aria-modal`, `aria-hidden`.
- Добавлено закрытие по фону, кнопке «Не купить» и клавише Escape.
- Фикс применяется ко всем местам, которые используют `showPurchaseConfirm()`:
  - покупка еды;
  - покупка питомца;
  - покупка этапа пазла;
  - покупка картинки пазла;
  - покупка раскраски;
  - покупка скина в магазине.

## Не трогалось

- Игровые механики.
- Магазин по логике.
- Цены и баланс.
- Раскраска по логике.
- Guide/Helper logic.
- Performance mode.
- Back navigation.
- I18n/voice задачи.

## Проверки

- External JS syntax: OK.
- Inline JS syntax: OK.
- `.git`: нет.
- `warmAllCleanAnimalSprites()` на старте: не вызывается.
