# Zoo Pet World — Stage 3 Guide Fix merged report

Base received from Cloud: `ZooPetWorld_stage3_guide_fix.zip`
Final package: `ZooPetWorld_stage3_guide_merged_final.zip`

## What Cloud changed
- Reworked Guide / Helper into a data-driven system.
- Added `getGuideFlow(screenKey)` with per-screen step arrays.
- Added safe selector lookup with fallback behavior.
- Added action types: `tap`, `drag-h`, `drag-v`, `scroll`, `select-color`.
- Added highlight frame, arrow, animated hand, skip / next controls.
- Added scroll hint helpers for horizontal/vertical lists.

## What assistant merged/preserved
- Preserved previous Stage 2.1 changes: `Zoo Pet World` naming, `goBackOrHome()`, `zooScreenHistory`, coloring lazy loading/loading state, low-performance mode sync.
- Restored `tests/smoke_test.py` from Stage 2.1 because Cloud ZIP removed the tests folder.
- Added Stage 3 polish CSS: helper overlay and bubble no longer use blur in normal mode either, added z-index stability, added missing animations for `select-color` and `scroll` hand actions.

## Static checks
- `.git`: not included.
- `assets/inline`: 54 image files.
- `coloringImages.js`: 30 embedded coloring images, ~4.75 MB.
- `warmAllCleanAnimalSprites()` remains defined but is not called on startup.
- External JS syntax check: OK.
- Inline JS syntax check: OK.

## Notes for device QA
Check manually after deploy:
1. Open menu → helper button.
2. Go to Pet Room → helper points to feed/button/bars.
3. Go to Coloring → loading appears, then helper points to palette/canvas/templates.
4. Go to Puzzle/Zoo Block/Shadow/Level Map → helper does not show crooked highlight.
5. Turn on Light/Performance mode in Parents settings and confirm helper still works without lag.
