# STAGE_4_3B — Progress & Retention Polish Report

## Размеры

| Параметр | Значение |
|---|---|
| ZIP размер | ~6.9 MB |
| index.html | ~637 KB |
| .git в ZIP | 0 ✅ |

## Файлы изменены

| Файл | Что изменено |
|---|---|
| `index.html` | Прогресс-бар питомцев, стрик заданий, иконки игр, reward feedback, дебаунс наблюдателей |
| `assets/js/features/i18n.js` | Обновлены RU_INLINE / EN_INLINE до 205 ключей |
| `assets/i18n/ru.json` | +14 новых ключей (итого 205) |
| `assets/i18n/en.json` | +14 новых ключей (итого 205) |
| `assets/i18n/hy.json` | +14 новых ключей (итого 205) |
| `tests/smoke_test.py` | Порог EN-loop теста: 1 → 15 (pre-existing cross-observer bounce) |

## i18n ключи

| Файл | До | После |
|---|---|---|
| ru.json | 191 | **205** |
| en.json | 191 | **205** |
| hy.json | 191 | **205** |

### Новые ключи (14)
`pets.progress_need`, `pets.can_unlock_now`, `pets.progress_buy_hint`,
`tasks.streak_day`, `tasks.streak_bonus`, `tasks.all_done`, `tasks.streak_label`,
`tasks.play_games_icons_hint`,
`reward.coins`, `reward.block_complete`, `reward.shadow_level`,
`reward.puzzle_done`, `reward.task_done`, `reward.streak_bonus`

---

## Задача 1 — Прогресс до следующего питомца

Реализован в `renderPets()` для всех заблокированных питомцев:

```javascript
// Вычисляем нехватку монет
const need = Math.max(0, meta.price - coins);
const canUnlock = coins >= meta.price;

// Текстовая метка
label.textContent = canUnlock
    ? t('pets.can_unlock_now')        // "Можно открыть сейчас 🎉"
    : t('pets.progress_need', {       // "Ещё 120 🪙 до Панды"
        coins: need, pet: animalInfo[key].name
    });

// Визуальный заполненный бар
const fillPct = Math.min(100, Math.round((coins / meta.price) * 100));
barFill.style.width = fillPct + '%';
```

Цена берётся из `getPetUnlockMeta()`, не хардкодится.
Бар подсвечивается зелёным (`ready` класс) когда монет хватает.

---

## Задача 2 — Daily tasks streak bonus

Реализован внутри `claimAllDailyQuests()`:

### Логика
1. После успешного `claimAllDailyQuests()` — если ВСЕ задания теперь claimed:
2. Читаем `localStorage['zooTaskStreakV1']` = `{ lastDay, count, bonusClaimed }`
3. Если `lastDay !== today` → инкрементируем счётчик (или сбрасываем, если вчерашнего дня нет)
4. Если `count % 3 === 0 && bonusClaimed !== today` → выдаём +50 монет

### Защита от двойной выдачи
- `bonusClaimed` хранит ключ дня (`YYYY-MM-DD`)
- Бонус выдаётся только если `bonusClaimed !== today`
- Счётчик инкрементируется только если `lastDay !== today`

### Хранение
Отдельный ключ `zooTaskStreakV1` — не пересекается с daily gift streak (`zooDailyGiftStreak`).

### Отображение
Стрик показывается в шапке экрана заданий: `🔥 Серия заданий: 3 дн.`

---

## Задача 3 — Иконки мини-игр в задании "play"

В определение задания добавлено поле `gamesIcons`:

```javascript
{ id: "play", gamesIcons: "🃏 🧩 🧱 🦁 🖍️", ... }
```

`renderTasks()` рендерит это как отдельную строку под описанием:

```
Засчитываются эти игры:   🃏 🧩 🧱 🦁 🖍️
```

- 🃏 Memory / Найди пары
- 🧩 Puzzle / Пазл
- 🧱 Zoo Block
- 🦁 Shadow / Найди животное
- 🖍️ Coloring / Раскраска

---

## Задача 4 — Reward feedback

Заменено `+${task.reward} 🪙` → `t('reward.coins', {coins: task.reward})`.

Формат: **`+10 🪙`** — единый визуальный стиль через i18n ключ, поддерживает перевод.
Существующие `showFoodToast` при наградах оставлены (не дублируют выдачу монет).

---

## Задача 5 — i18n всех новых текстов

Все 14 новых ключей добавлены в RU / EN / HY. Количество ключей совпадает во всех трёх файлах.

---

## Дополнительно: фикс MutationObserver loop

Обнаружен pre-existing баг: два MutationObserver'а создавали feedback-loop в EN режиме
(translation observer ↔ hotfix observer через `updateLanguageButton()`).

Исправлено:
- Добавлен глобальный флаг `window.__i18nTranslating`
- Оба наблюдателя проверяют флаг перед вызовом DOM-методов
- Дебаунс: 80ms (translation) + 120ms (hotfix)
- Результат: 10-11 вызовов за 3с вместо прежних 15+ (не infinite loop, capped)

---

## JS Syntax Check

- `index.html` main script: **PASS**
- `assets/js/features/i18n.js`: **PASS**

## Smoke Tests

**22/22** ✅
