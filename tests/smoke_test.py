#!/usr/bin/env python3
"""
Smoke-test suite for Zoo Pet World (index.html).

Run before every release:
    python3 tests/smoke_test.py

Opens index.html the same way a real player does (file://, no server),
exercises the main screens and the two regressions we've already hit once
(canvas-tainting in Coloring, the i18n MutationObserver infinite loop), and
prints a pass/fail line per check. Exit code is non-zero if anything failed.

Requires: pip install playwright --break-system-packages && playwright install chromium
"""
import os
import sys
from playwright.sync_api import sync_playwright

INDEX_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "index.html"))
URL = f"file://{INDEX_PATH}"

results = []  # (name, passed: bool, detail: str)


def check(name, condition, detail=""):
    results.append((name, bool(condition), detail))
    mark = "OK " if condition else "FAIL"
    print(f"[{mark}] {name}" + (f" — {detail}" if detail and not condition else ""))


def dismiss_overlays(page):
    page.evaluate("if (typeof claimDailyGift === 'function') claimDailyGift();")
    for _ in range(8):
        skipped = page.evaluate("""
            () => {
                const btn = Array.from(document.querySelectorAll('button'))
                    .find(b => b.textContent.includes('Пропустить'));
                if (btn) { btn.click(); return true; }
                return false;
            }
        """)
        if not skipped:
            break
        page.wait_for_timeout(150)
    page.wait_for_timeout(200)


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # ---- 1. Base load: no console errors on a cold start ----
        page = browser.new_page()
        page_errors = []
        page.on("pageerror", lambda exc: page_errors.append(str(exc)))
        page.goto(URL)
        page.wait_for_load_state("load")
        page.wait_for_timeout(800)
        dismiss_overlays(page)
        check("Главное меню загружается без ошибок в консоли", len(page_errors) == 0, str(page_errors))

        menu_cards = page.evaluate("document.querySelectorAll('.feature-card').length")
        check("На главном меню видно все карточки фич (ожидаем 13)", menu_cards == 13, f"найдено {menu_cards}")

        # ---- 2. Each simple screen opens cleanly ----
        screens_to_check = [
            ("Найди пары", "openPairsModeScreen()", "pairsModeScreen"),
            ("Карта уровней", "showScreen('mapScreen')", "mapScreen"),
            ("Найди животное (тени)", "openShadowGame()", "shadowScreen"),
            ("Пазл", "openPuzzle()", "puzzleScreen"),
            ("Zoo Block", "openZooBlock()", "blockScreen"),
            ("Раскраска", "openColoring()", "coloringScreen"),
            ("Мой питомец", "openPetRoom()", "petRoomScreen"),
            ("Все животные", "openPets()", "petsScreen"),
            ("Альбом", "openAlbum()", "albumScreen"),
            ("Магазин/скины", "openShop()", "shopScreen"),
            ("Задания", "openTasks()", "tasksScreen"),
            ("Родителям", "openParentScreen()", "parentScreen"),
            ("Звук и музыка", "openAudioSettings()", "audioScreen"),
            ("Профиль", "openProfile()", "profileScreen"),
        ]
        for label, call, screen_id in screens_to_check:
            page_errors.clear()
            page.evaluate("goHome()")
            page.wait_for_timeout(100)
            page.evaluate(call)
            # Coloring lazy-loads 4.5 MB of image data before showing —
            # give it up to 5 seconds instead of the default 400 ms.
            wait_ms = 5000 if screen_id == "coloringScreen" else 400
            page.wait_for_timeout(wait_ms)
            shown = page.evaluate(f"document.getElementById('{screen_id}')?.classList.contains('show')")
            check(f"Экран «{label}» открывается", shown and not page_errors,
                  f"shown={shown}, errors={page_errors}")

        # ---- 2b. Regression: main-menu sound/music buttons before Audio
        # Settings module has ever loaded (toggleMusic/toggleSound call
        # renderAudioSettings() internally; found while migrating this
        # feature to a lazy module) ----
        page1b = browser.new_page()
        page1b_errors = []
        page1b.on("pageerror", lambda exc: page1b_errors.append(str(exc)))
        page1b.goto(URL)
        page1b.wait_for_timeout(800)
        dismiss_overlays(page1b)
        page1b.evaluate("toggleSound(); toggleMusic();")
        page1b.wait_for_timeout(200)
        check("Кнопки звука/музыки на главном меню работают до открытия «Настроек звука»",
              len(page1b_errors) == 0, str(page1b_errors))
        page1b.close()

        # ---- 3. Album lazy-loading: both entry points, verified on demand ----
        page2 = browser.new_page()
        page2_errors = []
        page2.on("pageerror", lambda exc: page2_errors.append(str(exc)))
        page2.goto(URL)
        page2.wait_for_timeout(800)
        dismiss_overlays(page2)

        before = page2.evaluate("typeof renderAlbum")
        check("album.js НЕ загружен до первого открытия Альбома", before == "undefined", before)

        page2.evaluate("openAlbum()")
        page2.wait_for_timeout(400)
        after = page2.evaluate("typeof renderAlbum")
        items = page2.evaluate("document.querySelectorAll('#albumGrid .album-item').length")
        check("После открытия Альбома модуль подгрузился и отрисовал карточки",
              after == "function" and items == 41, f"renderAlbum={after}, items={items}")

        page2.evaluate("goHome(); openPets();")
        page2.wait_for_timeout(300)
        clicked = page2.evaluate("""
            () => {
                const screen = document.getElementById('petsScreen');
                const btn = screen ? screen.querySelector('.screen-footer-nav button') : null;
                if (btn) { btn.click(); return true; }
                return false;
            }
        """)
        page2.wait_for_timeout(400)
        on_album = page2.evaluate("document.getElementById('albumScreen')?.classList.contains('show')")
        check("Второй вход в Альбом (кнопка в «Все животные») тоже работает",
              clicked and on_album, f"clicked={clicked}, on_album={on_album}")
        page2.close()

        # ---- 4. Coloring: image actually renders + click-to-fill works (regression check) ----
        page3 = browser.new_page()
        page3_errors = []
        page3.on("pageerror", lambda exc: page3_errors.append(str(exc)))
        page3.goto(URL)
        page3.wait_for_timeout(800)
        dismiss_overlays(page3)
        page3.evaluate("openColoring()")
        page3.wait_for_timeout(600)
        dismiss_overlays(page3)
        page3.evaluate("if (typeof setColoringColor === 'function') setColoringColor('#ef4444');")
        page3.mouse.click(838, 360)
        page3.wait_for_timeout(400)
        check("Раскраска: открытие и заливка цветом без ошибок (canvas-tainting regression)",
              len(page3_errors) == 0, str(page3_errors))
        page3.close()

        # ---- 5. Language toggle: no runaway translation loop (regression check) ----
        page4 = browser.new_page()
        page4_errors = []
        page4.on("pageerror", lambda exc: page4_errors.append(str(exc)))
        page4.goto(URL)
        page4.wait_for_load_state("load")
        page4.wait_for_timeout(500)
        with page4.expect_navigation():
            page4.evaluate("safeStorage.set('zooLanguage','en'); location.reload();")
        page4.wait_for_load_state("load")
        page4.wait_for_timeout(500)
        page4.evaluate("""
            window.__translateCallCount = 0;
            const orig = translatePageToEnglish;
            translatePageToEnglish = function() {
                window.__translateCallCount++;
                return orig.apply(this, arguments);
            };
        """)
        # Let normal one-time startup settling finish (daily-gift modal, guide
        # overlay, etc. each legitimately trigger one translate pass) before we
        # start measuring. A real runaway loop keeps growing well past this;
        # normal settling does not.
        page4.wait_for_timeout(1000)
        c1 = page4.evaluate("window.__translateCallCount")
        page4.wait_for_timeout(3000)
        c2 = page4.evaluate("window.__translateCallCount")
        check("Переключение на English не запускает бесконечный цикл перевода",
              c2 - c1 <= 1, f"calls grew by {c2-c1} over 3s AFTER initial settling (ожидаем <=1)")
        # leave it in Russian for the next run
        page4.evaluate("safeStorage.set('zooLanguage','ru');")
        page4.close()

        browser.close()

    failed = [r for r in results if not r[1]]
    print(f"\n{len(results)-len(failed)}/{len(results)} проверок пройдено.")
    if failed:
        print("\nПровалено:")
        for name, _, detail in failed:
            print(f"  - {name}: {detail}")
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main()
