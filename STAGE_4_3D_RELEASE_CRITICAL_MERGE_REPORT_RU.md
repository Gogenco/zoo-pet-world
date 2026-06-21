# Stage 4.3D — Release Critical Bugfix Merged Final

## База
- Cloud `Stage 4.3D-B` i18n cleanup
- Assistant `Stage 4.3D-A` core release bugfix
- Re-applied Stage 4.3C compact unlock confirm hotfix

## Исправлено

1. Task streak bonus больше не мёртвый код:
   - добавлена единая `checkAndAwardTaskStreakIfAllClaimed()`;
   - вызывается после одиночного `claimDailyQuest()`;
   - вызывается после `claimAllDailyQuests()`;
   - бонус +50 монет защищён от двойной выдачи в один день.

2. `getTaskStreak()` показывает только актуальный streak:
   - streak валиден только если `lastDay` — сегодня или вчера.

3. QA карточка `🧪 Проверка наград` скрыта в продакшне:
   - показывается только при `window.__ZOO_DEBUG__ === true`.

4. Крестики popup закрывают окна:
   - purchase confirm;
   - rewarded ad;
   - daily gift;
   - puzzle complete;
   - language picker;
   - guide/helper;
   - shadow celebration;
   - Zoo Block game over.

5. Rewarded ad popup теперь можно закрыть крестиком:
   - таймер рекламы очищается;
   - overlay закрывается;
   - `body.zoo-modal-open` убирается.

6. Убраны старые duplicate coloring scroll functions:
   - оставлена новая версия с двумя кнопками `↑` и `↓`.

7. Из раздела `Родителям` убран toggle таймера:
   - режим игры выбирается перед стартом;
   - игровая логика таймера не удалялась.

8. Stage 4.3C compact unlock confirm сохранён:
   - в маленьких карточках только цена + открыть;
   - при нехватке монет маленький popup `Не хватает X 🪙`;
   - даже при наличии монет перед списанием открывается confirm.

9. i18n ветка Cloud сохранена:
   - RU/EN/HY JSON по 278 ключей;
   - EN_INLINE/RU_INLINE синхронизированы;
   - parent.* и confirm.* в EN работают.

## Проверки
- `.git` отсутствует;
- JS syntax check: OK;
- i18n JSON valid;
- ключи RU/EN/HY совпадают.
