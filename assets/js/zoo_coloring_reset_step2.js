// Guarded module: safe against duplicate script injection.
(function(){
  if (window.__ZOO_COLORING_RESET_STEP2__) return;
  window.__ZOO_COLORING_RESET_STEP2__ = true;

// Zoo Pet World — Stage 6.1.7 RESET Step 2.1 coloring PNG fallback cleanup module
// Imported coloring templates, palette, tap-fill, pinch zoom.
(function(){
    const importedTemplates = [
        { id: 'lion_savanna', file: 'lion.svg', title: 'Львенок в саванне', emoji: '🦁' },
        { id: 'elephant_jungle', file: 'elephant.svg', title: 'Слонёнок в джунглях', emoji: '🐘' },
        { id: 'penguin_ice', file: 'penguin.svg', title: 'Пингвин на льду', emoji: '🐧' },
        { id: 'rabbit_meadow', file: 'bunny.svg', title: 'Кролик на лугу', emoji: '🐰' },
        { id: 'tiger_tropics', file: 'tiger.svg', title: 'Тигренок в тропиках', emoji: '🐯' },
        { id: 'parrot_jungle', file: 'parrot.svg', title: 'Попугай в джунглях', emoji: '🦜' },
        { id: 'bear_forest', file: 'bear.svg', title: 'Медвежонок в лесу', emoji: '🐻' },
        { id: 'camel_desert', file: 'camel.svg', title: 'Верблюд в пустыне', emoji: '🐫' },
        { id: 'crocodile_river', file: 'crocodile.svg', title: 'Крокодил у реки', emoji: '🐊' },
        { id: 'deer_forest', file: 'deer.svg', title: 'Оленёнок в лесу', emoji: '🦌' },
        { id: 'dolphin_sea', file: 'dolphin.svg', title: 'Дельфин в море', emoji: '🐬' },
        { id: 'fox_forest', file: 'fox.svg', title: 'Лисёнок в лесу', emoji: '🦊' },
        { id: 'frog_pond', file: 'frog.svg', title: 'Лягушонок у пруда', emoji: '🐸' },
        { id: 'giraffe_savanna', file: 'giraffe.svg', title: 'Жирафик в саванне', emoji: '🦒' },
        { id: 'hedgehog_garden', file: 'hedgehog.svg', title: 'Ёжик в саду', emoji: '🦔' },
        { id: 'hippo_lake', file: 'hippo.svg', title: 'Бегемотик у воды', emoji: '🦛' },
        { id: 'kangaroo_field', file: 'kangaroo.svg', title: 'Кенгурёнок', emoji: '🦘' },
        { id: 'koala_tree', file: 'koala.svg', title: 'Коала на дереве', emoji: '🐨' },
        { id: 'monkey_jungle', file: 'monkey.svg', title: 'Обезьянка в джунглях', emoji: '🐵' },
        { id: 'octopus_sea', file: 'octopus.svg', title: 'Осьминог в море', emoji: '🐙' },
        { id: 'owl_branch', file: 'owl.svg', title: 'Совёнок на ветке', emoji: '🦉' },
        { id: 'panda_bamboo', file: 'panda.svg', title: 'Панда в бамбуке', emoji: '🐼' },
        { id: 'pony_meadow', file: 'pony.svg', title: 'Пони на лугу', emoji: '🐴' },
        { id: 'rhino_savanna', file: 'rhino.svg', title: 'Носорог в саванне', emoji: '🦏' },
        { id: 'seal_beach', file: 'seal.svg', title: 'Тюлень на берегу', emoji: '🦭' },
        { id: 'squirrel_forest', file: 'squirrel.svg', title: 'Белочка в лесу', emoji: '🐿️' },
        { id: 'turtle_coast', file: 'turtle.svg', title: 'Черепашка у моря', emoji: '🐢' },
        { id: 'whale_ocean', file: 'whale.svg', title: 'Кит в океане', emoji: '🐋' },
        { id: 'wolf_forest', file: 'wolf.svg', title: 'Волчонок в лесу', emoji: '🐺' },
        { id: 'zebra_savanna', file: 'zebra.svg', title: 'Зебра в саванне', emoji: '🦓' }
    ];

    const extraPalette = [
        '#111827','#374151','#6b7280','#9ca3af','#ffffff',
        '#ef4444','#f97316','#f59e0b','#fde047','#84cc16',
        '#22c55e','#16a34a','#14b8a6','#06b6d4','#0ea5e9',
        '#3b82f6','#6366f1','#8b5cf6','#a855f7','#d946ef',
        '#ec4899','#fb7185','#fca5a5','#fed7aa','#fde68a',
        '#bef264','#86efac','#67e8f9','#93c5fd','#c4b5fd',
        '#7c2d12','#92400e','#a16207','#4d7c0f','#166534'
    ];

    function patchColoringToolbar() {
        const grid = document.querySelector('#coloringScreen .coloring-tool-grid-mobile');
        if (grid) {
            grid.innerHTML = '' +
                '<button id="toolBrush" type="button" class="coloring-tool-btn" onclick="setColoringTool(\'brush\')">🖌️<small>Краска</small></button>' +
                '<button id="toolEraser" type="button" class="coloring-tool-btn" onclick="setColoringTool(\'eraser\')">🧽<small>Ластик</small></button>';
        }
        const actionRow = document.querySelector('#coloringScreen .coloring-actions');
        if (actionRow && !document.getElementById('coloringZoomResetBtn')) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.id = 'coloringZoomResetBtn';
            btn.className = 'coloring-action-btn';
            btn.setAttribute('aria-label', 'Сбросить масштаб');
            btn.textContent = '🔍';
            btn.onclick = () => resetColoringZoom(true);
            actionRow.appendChild(btn);
        }
    }

    function addImportedAssets() {
        const existing = new Map(coloringTemplatesCatalog.map(item => [item.id, item]));
        importedTemplates.forEach(item => {
            const src = (window.__COLORING_INLINE_SOURCES__ && window.__COLORING_INLINE_SOURCES__[item.file]) || ('assets/coloring/' + item.file);
            const asset = coloringLineArtAssets[item.id] || { width: COLORING_SCENE_WIDTH, height: COLORING_SCENE_HEIGHT, offsetX: 0, offsetY: 0 };
            asset.src = src;
            asset.boundarySrc = src;
            asset.loaded = false;
            asset.boundaryLoaded = false;
            asset.width = COLORING_SCENE_WIDTH;
            asset.height = COLORING_SCENE_HEIGHT;
            coloringLineArtAssets[item.id] = asset;

            const img = new Image();
            img.decoding = 'async';
            img.onload = () => {
                asset.loaded = true;
                asset.boundaryLoaded = true;
                requestColoringRedrawAfterAssetLoad();
            };
            img.onerror = () => {
                asset.loaded = false;
                asset.boundaryLoaded = false;
                console.warn('Coloring asset failed to load:', src);
                requestColoringRedrawAfterAssetLoad();
            };
            img.src = src;
            coloringLineArtImages[item.id] = img;
            coloringLineArtBoundaryImages[item.id] = img;

            const merged = Object.assign({}, existing.get(item.id) || {}, item, { thumbSrc: src, price: 0 });
            if (existing.has(item.id)) {
                Object.assign(existing.get(item.id), merged);
            } else {
                coloringTemplatesCatalog.push(merged);
            }
            if (!coloringUnlockedTemplates.includes(item.id)) coloringUnlockedTemplates.push(item.id);
        });
        coloringUnlockedTemplates = Array.from(new Set(coloringUnlockedTemplates)).filter(id => coloringTemplatesCatalog.some(item => item.id === id));
        if (!coloringTemplatesCatalog.some(item => item.id === coloringCurrentTemplateId)) coloringCurrentTemplateId = 'lion_savanna';
        if (!coloringUnlockedTemplates.includes(coloringCurrentTemplateId)) coloringCurrentTemplateId = coloringUnlockedTemplates[0] || 'lion_savanna';
    }

    function drawImportedAssetIntoCanvas(ctx, img) {
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        const imgWidth = img.naturalWidth || img.width || canvasWidth;
        const imgHeight = img.naturalHeight || img.height || canvasHeight;
        const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;
        const dx = Math.round((canvasWidth - drawWidth) / 2);
        const dy = Math.round((canvasHeight - drawHeight) / 2);
        try {
            ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
        } catch (e) {
            console.warn('Coloring drawImage fallback:', e);
            ctx.save();
            ctx.strokeStyle = '#111827';
            ctx.lineWidth = Math.max(4, Math.round(Math.min(canvasWidth, canvasHeight) * 0.006));
            ctx.strokeRect(18, 18, canvasWidth - 36, canvasHeight - 36);
            ctx.restore();
        }
    }

    const originalDrawColoringTemplateById = drawColoringTemplateById;
    drawColoringTemplateById = function(ctx, templateId) {
        const asset = coloringLineArtAssets[templateId];
        const img = coloringLineArtImages[templateId];
        if (asset && img && (asset.loaded || img.complete)) {
            drawImportedAssetIntoCanvas(ctx, img);
            return;
        }
        return originalDrawColoringTemplateById(ctx, templateId);
    };

    renderColoringTemplates = function() {
        if (!coloringTemplates) return;
        coloringTemplates.innerHTML = '';
        coloringTemplatesCatalog.forEach(item => {
            const unlocked = isColoringTemplateUnlocked(item.id);
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'coloring-template-card' + (item.id === coloringCurrentTemplateId ? ' active' : '') + (unlocked ? '' : ' locked');
            const thumbSrc = item.thumbSrc || animalImageSrc(item.thumb);
            btn.innerHTML = '\n                <div class="coloring-template-thumb">\n                    <img src="' + thumbSrc + '" alt="' + item.title + '"/>\n                    ' + (unlocked ? '' : '<span class="lock-badge">🔒</span><span class="price-badge">' + item.price + ' 🪙</span>') + '\n                </div>\n                <div>' + item.title + '</div>';
            btn.onclick = () => unlocked ? selectColoringTemplate(item.id) : purchaseColoringTemplate(item.id);
            coloringTemplates.appendChild(btn);
        });
        try { refreshGuideHelpers('coloringScreen'); } catch(e) {}
    };

    const originalSetColoringTool = setColoringTool;
    setColoringTool = function(tool) {
        const safeTool = (tool === 'eraser') ? 'eraser' : 'brush';
        coloringCurrentTool = safeTool;
        renderColoringTools();
        updateColoringHint(safeTool === 'eraser'
            ? guideT('Ластик: нажми на закрашенную область, чтобы сделать её белой. Двумя пальцами можно приблизить мелкие детали 🧽', 'Eraser: tap a painted area to make it white. Use two fingers to zoom into details 🧽')
            : guideT('Выбери цвет и нажми на область для заливки. Двумя пальцами можно увеличить картинку 🖌️', 'Choose a color and tap an area to fill it. Use two fingers to zoom in 🖌️'));
        playSound('click');
    };

    renderColoringTools = function() {
        ['brush','eraser'].forEach(tool => {
            const el = document.getElementById('tool' + tool.charAt(0).toUpperCase() + tool.slice(1));
            if (el) el.classList.toggle('active', coloringCurrentTool === tool);
        });
    };

    renderColoringSizes = function() {
        if (coloringSizeRow) coloringSizeRow.innerHTML = '';
    };

    setColoringSize = function(size) {
        coloringCurrentSize = size;
        updateColoringHint(guideT('В этой раскраске работает заливка по нажатию. Для мелких деталей используй увеличение двумя пальцами ✨', 'This coloring mode uses tap-to-fill. Use two fingers to zoom into small details ✨'));
    };

    coloringPalette.splice(0, coloringPalette.length, ...extraPalette);
    coloringCurrentTool = 'brush';
    coloringCurrentColor = coloringPalette[Math.min(10, coloringPalette.length - 1)] || '#22c55e';

    let zoomState = {
        scale: 1,
        minScale: 1,
        maxScale: 4,
        tx: 0,
        ty: 0,
        pointers: new Map(),
        gesture: null,
        activePanId: null,
        tapCandidate: null
    };

    function getZoomWrap() {
        return document.getElementById('coloringCanvasWrap');
    }
    function getZoomViewport() {
        return document.getElementById('coloringCanvasViewport');
    }
    function ensureColoringZoomLayer() {
        const wrap = getZoomWrap();
        if (!wrap) return null;
        let viewport = getZoomViewport();
        if (!viewport) {
            viewport = document.createElement('div');
            viewport.id = 'coloringCanvasViewport';
            while (wrap.firstChild) viewport.appendChild(wrap.firstChild);
            wrap.appendChild(viewport);
        }
        return viewport;
    }
    function clampColoringZoomPosition() {
        const wrap = getZoomWrap();
        if (!wrap) return;
        const minTx = wrap.clientWidth * (1 - zoomState.scale);
        const minTy = wrap.clientHeight * (1 - zoomState.scale);
        zoomState.tx = Math.min(0, Math.max(minTx, zoomState.tx));
        zoomState.ty = Math.min(0, Math.max(minTy, zoomState.ty));
    }
    function applyColoringZoom() {
        const viewport = getZoomViewport();
        if (!viewport) return;
        clampColoringZoomPosition();
        viewport.style.transform = 'translate(' + zoomState.tx + 'px,' + zoomState.ty + 'px) scale(' + zoomState.scale + ')';
    }
    function resetColoringZoom(silent = false) {
        zoomState.scale = 1;
        zoomState.tx = 0;
        zoomState.ty = 0;
        zoomState.gesture = null;
        zoomState.activePanId = null;
        zoomState.tapCandidate = null;
        applyColoringZoom();
        if (!silent) {
            updateColoringHint(guideT('Масштаб сброшен. Двумя пальцами можно приблизить картинку ещё раз 🔍', 'Zoom reset. Use two fingers to zoom in again 🔍'));
        }
    }
    window.resetColoringZoom = resetColoringZoom;

    // ── Thumb-friendly side/bottom scroll handles ──────────────────────
    // Dragging these pans the zoomed canvas WITHOUT triggering drawing.
    function buildScrollHandles() {
        const wrap = getZoomWrap();
        if (!wrap || wrap.querySelector('.coloring-scroll-handle-v')) return;

        const vHandle = document.createElement('div');
        vHandle.className = 'coloring-scroll-handle-v';
        vHandle.innerHTML = '<div class="coloring-scroll-thumb-v"></div>';
        wrap.appendChild(vHandle);

        const hHandle = document.createElement('div');
        hHandle.className = 'coloring-scroll-handle-h';
        hHandle.innerHTML = '<div class="coloring-scroll-thumb-h"></div>';
        wrap.appendChild(hHandle);

        function updHandles() {
            if (zoomState.scale <= 1.05) {
                vHandle.style.opacity = '0'; vHandle.style.pointerEvents = 'none';
                hHandle.style.opacity = '0'; hHandle.style.pointerEvents = 'none';
                return;
            }
            vHandle.style.opacity = '1'; vHandle.style.pointerEvents = 'auto';
            hHandle.style.opacity = '1'; hHandle.style.pointerEvents = 'auto';

            const minTy = wrap.clientHeight * (1 - zoomState.scale);
            if (minTy < 0) {
                const tv = vHandle.querySelector('.coloring-scroll-thumb-v');
                const trackH = vHandle.clientHeight;
                const sz = Math.max(44, trackH / zoomState.scale);
                tv.style.height = sz + 'px';
                tv.style.top = ((zoomState.ty / minTy) * (trackH - sz)) + 'px';
            }
            const minTx = wrap.clientWidth * (1 - zoomState.scale);
            if (minTx < 0) {
                const th = hHandle.querySelector('.coloring-scroll-thumb-h');
                const trackW = hHandle.clientWidth;
                const sz = Math.max(44, trackW / zoomState.scale);
                th.style.width = sz + 'px';
                th.style.left = ((zoomState.tx / minTx) * (trackW - sz)) + 'px';
            }
        }

        let vDrag = null;
        vHandle.addEventListener('pointerdown', e => {
            e.stopPropagation(); e.preventDefault();
            vHandle.setPointerCapture(e.pointerId);
            vDrag = { y: e.clientY, ty0: zoomState.ty };
        }, { passive: false });
        vHandle.addEventListener('pointermove', e => {
            if (!vDrag) return;
            e.stopPropagation(); e.preventDefault();
            const minTy = wrap.clientHeight * (1 - zoomState.scale);
            if (minTy >= 0) return;
            const sz = Math.max(44, vHandle.clientHeight / zoomState.scale);
            const ratio = minTy / (vHandle.clientHeight - sz);
            zoomState.ty = vDrag.ty0 + (e.clientY - vDrag.y) * ratio;
            applyColoringZoom(); updHandles();
        }, { passive: false });
        vHandle.addEventListener('pointerup', () => vDrag = null);

        let hDrag = null;
        hHandle.addEventListener('pointerdown', e => {
            e.stopPropagation(); e.preventDefault();
            hHandle.setPointerCapture(e.pointerId);
            hDrag = { x: e.clientX, tx0: zoomState.tx };
        }, { passive: false });
        hHandle.addEventListener('pointermove', e => {
            if (!hDrag) return;
            e.stopPropagation(); e.preventDefault();
            const minTx = wrap.clientWidth * (1 - zoomState.scale);
            if (minTx >= 0) return;
            const sz = Math.max(44, hHandle.clientWidth / zoomState.scale);
            const ratio = minTx / (hHandle.clientWidth - sz);
            zoomState.tx = hDrag.tx0 + (e.clientX - hDrag.x) * ratio;
            applyColoringZoom(); updHandles();
        }, { passive: false });
        hHandle.addEventListener('pointerup', () => hDrag = null);

        // Hook applyColoringZoom to also update handle positions
        const _orig = applyColoringZoom;
        applyColoringZoom = function() { _orig(); updHandles(); };
        window.applyColoringZoom = applyColoringZoom;

        updHandles();
    }
    window.buildColoringScrollHandles = buildScrollHandles;

    function viewportToCanvasPoint(clientX, clientY) {
        const wrap = getZoomWrap();
        if (!wrap) return { x: 0, y: 0 };
        const rect = wrap.getBoundingClientRect();
        const localX = clientX - rect.left;
        const localY = clientY - rect.top;
        const contentX = (localX - zoomState.tx) / zoomState.scale;
        const contentY = (localY - zoomState.ty) / zoomState.scale;
        const x = Math.max(0, Math.min(coloringPaintCanvas.width - 1, Math.round((contentX / rect.width) * coloringPaintCanvas.width)));
        const y = Math.max(0, Math.min(coloringPaintCanvas.height - 1, Math.round((contentY / rect.height) * coloringPaintCanvas.height)));
        return { x, y };
    }
    function fillColoringFromClientPoint(clientX, clientY) {
        if (!coloringOutlineReady) return;
        const point = viewportToCanvasPoint(clientX, clientY);
        const changed = floodFillColoringArea(point.x, point.y);
        if (!changed) return;
        pushColoringUndoState();
        if (coloringCurrentTool !== 'eraser') updateTaskProgress('coloring', 1);
        playSound('click');
        updateColoringHint(guideT('Готово! Продолжай раскрашивать. Для маленьких деталей увеличивай картинку двумя пальцами ✨', 'Done! Keep coloring. Use two fingers to zoom into small details ✨'));
    }

    function distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.hypot(dx, dy);
    }
    function midpoint(a, b) {
        return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    }

    function installZoomEvents() {
        const wrap = getZoomWrap();
        const viewport = ensureColoringZoomLayer();
        if (!wrap || !viewport || wrap.__zoomEventsInstalled) return;
        wrap.__zoomEventsInstalled = true;

        const onPointerDown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            viewport.setPointerCapture && viewport.setPointerCapture(e.pointerId);
            zoomState.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
            if (zoomState.pointers.size === 1) {
                zoomState.activePanId = e.pointerId;
                zoomState.tapCandidate = { id: e.pointerId, x: e.clientX, y: e.clientY, time: Date.now(), moved: false };
                zoomState.gesture = { type: 'pan', startTx: zoomState.tx, startTy: zoomState.ty, startX: e.clientX, startY: e.clientY };
            } else if (zoomState.pointers.size === 2) {
                const pts = Array.from(zoomState.pointers.values());
                const mid = midpoint(pts[0], pts[1]);
                zoomState.gesture = {
                    type: 'pinch',
                    startScale: zoomState.scale,
                    startDistance: Math.max(8, distance(pts[0], pts[1])),
                    contentMidX: (mid.x - wrap.getBoundingClientRect().left - zoomState.tx) / zoomState.scale,
                    contentMidY: (mid.y - wrap.getBoundingClientRect().top - zoomState.ty) / zoomState.scale
                };
                zoomState.tapCandidate = null;
            }
        };

        const onPointerMove = (e) => {
            if (!zoomState.pointers.has(e.pointerId)) return;
            e.preventDefault();
            e.stopPropagation();
            const prev = zoomState.pointers.get(e.pointerId);
            const next = { x: e.clientX, y: e.clientY };
            zoomState.pointers.set(e.pointerId, next);
            const wrapRect = wrap.getBoundingClientRect();

            if (zoomState.tapCandidate && zoomState.tapCandidate.id === e.pointerId) {
                const moved = Math.hypot(next.x - zoomState.tapCandidate.x, next.y - zoomState.tapCandidate.y);
                if (moved > 8) zoomState.tapCandidate.moved = true;
            }

            if (zoomState.pointers.size >= 2) {
                const pts = Array.from(zoomState.pointers.values());
                const mid = midpoint(pts[0], pts[1]);
                const dist = Math.max(8, distance(pts[0], pts[1]));
                if (!zoomState.gesture || zoomState.gesture.type !== 'pinch') {
                    zoomState.gesture = {
                        type: 'pinch',
                        startScale: zoomState.scale,
                        startDistance: dist,
                        contentMidX: (mid.x - wrapRect.left - zoomState.tx) / zoomState.scale,
                        contentMidY: (mid.y - wrapRect.top - zoomState.ty) / zoomState.scale
                    };
                }
                const newScale = Math.min(zoomState.maxScale, Math.max(zoomState.minScale, zoomState.gesture.startScale * (dist / zoomState.gesture.startDistance)));
                zoomState.scale = newScale;
                zoomState.tx = (mid.x - wrapRect.left) - zoomState.gesture.contentMidX * newScale;
                zoomState.ty = (mid.y - wrapRect.top) - zoomState.gesture.contentMidY * newScale;
                applyColoringZoom();
                return;
            }

            if (zoomState.gesture && zoomState.gesture.type === 'pan' && zoomState.activePanId === e.pointerId && zoomState.scale > 1.001) {
                zoomState.tx = zoomState.gesture.startTx + (next.x - zoomState.gesture.startX);
                zoomState.ty = zoomState.gesture.startTy + (next.y - zoomState.gesture.startY);
                applyColoringZoom();
            }
        };

        const endPointer = (e) => {
            if (!zoomState.pointers.has(e.pointerId)) return;
            e.preventDefault();
            e.stopPropagation();
            const startTap = zoomState.tapCandidate && zoomState.tapCandidate.id === e.pointerId ? zoomState.tapCandidate : null;
            const endPoint = zoomState.pointers.get(e.pointerId);
            zoomState.pointers.delete(e.pointerId);

            if (startTap && !startTap.moved && (Date.now() - startTap.time) < 300 && zoomState.pointers.size === 0) {
                fillColoringFromClientPoint(endPoint.x, endPoint.y);
            }

            if (zoomState.pointers.size === 1) {
                const [[id, point]] = Array.from(zoomState.pointers.entries());
                zoomState.activePanId = id;
                zoomState.gesture = { type: 'pan', startTx: zoomState.tx, startTy: zoomState.ty, startX: point.x, startY: point.y };
            } else {
                zoomState.activePanId = null;
                zoomState.gesture = null;
            }
            zoomState.tapCandidate = null;
            applyColoringZoom();
        };

        viewport.addEventListener('pointerdown', onPointerDown, { passive: false });
        viewport.addEventListener('pointermove', onPointerMove, { passive: false });
        viewport.addEventListener('pointerup', endPointer, { passive: false });
        viewport.addEventListener('pointercancel', endPointer, { passive: false });
        viewport.addEventListener('pointerleave', endPointer, { passive: false });
    }

    setupColoringCanvasEvents = function() {
        ensureColoringZoomLayer();
        installZoomEvents();
        applyColoringZoom();
    };

    const originalRenderColoringScreen = renderColoringScreen;
    renderColoringScreen = function() {
        originalRenderColoringScreen();
        patchColoringToolbar();
        ensureColoringZoomLayer();
        installZoomEvents();
        resetColoringZoom(true);
        updateColoringHint(guideT('Поверни телефон горизонтально, выбери цвет и нажми на область. Для маленьких деталей увеличивай картинку двумя пальцами ✨', 'Rotate your phone, choose a color and tap an area. Use two fingers to zoom into small details ✨'));
    };

    const originalSelectColoringTemplate = selectColoringTemplate;
    selectColoringTemplate = function(id) {
        originalSelectColoringTemplate(id);
        resetColoringZoom(true);
    };
    const originalClearColoringCanvas = clearColoringCanvas;
    clearColoringCanvas = function() {
        originalClearColoringCanvas();
        resetColoringZoom(true);
        updateColoringHint(guideT('Холст очищен. Выбери цвет и нажми на область. Для маленьких деталей используй зум двумя пальцами 🧼', 'Canvas cleared. Choose a color and tap an area. Use two-finger zoom for small details 🧼'));
    };

    const originalGetGuideFlow = getGuideFlow;
    getGuideFlow = function(screenKey) {
        if (screenKey === 'coloringScreen') {
            return [
                { selector: '#coloringPaletteGrid', title: guideT('Выбери цвет', 'Pick a color'), text: guideT('Сначала нажми на цвет справа или снизу. Цветов стало больше, чтобы раскраска была ярче.', 'First tap a color on the side or below. There are more colors now for brighter artwork.'), arrow: 'left', hand: 'tap' },
                { selector: '#coloringCanvasWrap', title: guideT('Раскрашивай по областям', 'Color by areas'), text: guideT('Нажимай внутри белой области, и она аккуратно закрасится выбранным цветом.', 'Tap inside a white area and it will fill neatly with the selected color.'), arrow: 'down', hand: 'tap' },
                { selector: '#coloringCanvasWrap', title: guideT('Увеличение двумя пальцами', 'Two-finger zoom'), text: guideT('Раздвинь два пальца, чтобы увеличить картинку. Подвинь один палец по увеличенной картинке, чтобы добраться до мелких деталей.', 'Spread two fingers to zoom in. Move one finger on the zoomed picture to reach tiny details.'), arrow: 'down', hand: 'drag-h' },
                { selector: '#coloringZoomResetBtn', title: guideT('Сбросить масштаб', 'Reset zoom'), text: guideT('Если картинка слишком увеличилась, нажми на кнопку с лупой, чтобы быстро вернуть обычный вид.', 'If the picture is too zoomed in, tap the magnifier button to quickly return to the normal view.'), arrow: 'left', hand: 'tap' },
                { selector: '#coloringTemplates', title: guideT('Выбирай другие картинки', 'Choose more pictures'), text: guideT('Листай карточки и выбирай новые картинки животных для раскрашивания.', 'Scroll through the cards and choose new animal pages to color.'), arrow: 'up', hand: 'drag-h' }
            ];
        }
        return originalGetGuideFlow(screenKey);
    };

    patchColoringToolbar();
    addImportedAssets();
    ensureColoringZoomLayer();
})();

// Mobile coloring HUD.
(function(){
    function currentLangRu(ru, en) {
        try { return getCurrentLanguage && getCurrentLanguage() === 'en' ? en : ru; } catch(e) { return ru; }
    }
    function getScaleFromViewport() {
        const viewport = document.getElementById('coloringCanvasViewport');
        const transform = viewport ? viewport.style.transform || '' : '';
        const match = transform.match(/scale\(([^)]+)\)/);
        const value = match ? parseFloat(match[1]) : 1;
        return Number.isFinite(value) && value > 0 ? value : 1;
    }
    function ensureColoringMobileHelpBar() {
        const hero = document.querySelector('#coloringScreen .coloring-hero');
        const topbar = document.querySelector('#coloringScreen .coloring-topbar');
        if (!hero || !topbar) return;
        let bar = document.getElementById('coloringMobileHelpBar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'coloringMobileHelpBar';
            bar.innerHTML = '' +
                '<span id="coloringSelectedColorDot" aria-hidden="true"></span>' +
                '<span class="help-pill">🎨 ' + currentLangRu('цвет', 'color') + '</span>' +
                '<span class="help-pill">👆 ' + currentLangRu('нажми область', 'tap area') + '</span>' +
                '<span id="coloringZoomBadge" class="help-pill">🔍 x1.0</span>' +
                '<span id="coloringTemplateCounter" class="help-pill">🖼️ 0</span>';
            topbar.insertAdjacentElement('afterend', bar);
        }
    }
    function updateColoringMobileHud() {
        ensureColoringMobileHelpBar();
        const colorDot = document.getElementById('coloringSelectedColorDot');
        if (colorDot && typeof coloringCurrentColor !== 'undefined') colorDot.style.background = coloringCurrentColor;
        const zoomBadge = document.getElementById('coloringZoomBadge');
        if (zoomBadge) zoomBadge.textContent = '🔍 x' + getScaleFromViewport().toFixed(1);
        const counter = document.getElementById('coloringTemplateCounter');
        if (counter && Array.isArray(coloringTemplatesCatalog)) counter.textContent = '🖼️ ' + coloringTemplatesCatalog.length;
    }
    window.updateColoringMobileHud = updateColoringMobileHud;

    function bindColoringHudPointerEvents() {
        const wrap = document.getElementById('coloringCanvasWrap');
        if (!wrap || wrap.__hudPointerBound) return;
        wrap.__hudPointerBound = true;
        ['pointerdown','pointermove','pointerup','pointercancel','pointerleave'].forEach(type => {
            wrap.addEventListener(type, () => setTimeout(updateColoringMobileHud, 40), true);
        });
    }

    const prevRenderColoringScreen = renderColoringScreen;
    renderColoringScreen = function() {
        prevRenderColoringScreen();
        ensureColoringMobileHelpBar();
        bindColoringHudPointerEvents();
        updateColoringMobileHud();
        updateColoringHint(currentLangRu('Выбери цвет, нажми на область. Двумя пальцами увеличивай картинку для маленьких деталей ✨', 'Pick a color and tap an area. Use two fingers to zoom into tiny details ✨'));
    };

    const prevSetColoringColor = setColoringColor;
    setColoringColor = function(color) {
        prevSetColoringColor(color);
        updateColoringMobileHud();
    };

    const prevRenderColoringPalette = renderColoringPalette;
    renderColoringPalette = function() {
        prevRenderColoringPalette();
        updateColoringMobileHud();
    };

    const prevRenderColoringTemplates = renderColoringTemplates;
    renderColoringTemplates = function() {
        prevRenderColoringTemplates();
        updateColoringMobileHud();
    };

    if (typeof resetColoringZoom === 'function') {
        const prevResetColoringZoom = resetColoringZoom;
        resetColoringZoom = function(silent) {
            prevResetColoringZoom(silent);
            setTimeout(updateColoringMobileHud, 20);
        };
        window.resetColoringZoom = resetColoringZoom;
    }

    const prevGetGuideFlow = getGuideFlow;
    getGuideFlow = function(screenKey) {
        const flow = prevGetGuideFlow(screenKey);
        if (screenKey !== 'coloringScreen') return flow;
        const enhanced = flow.slice();
        if (!enhanced.some(step => step.selector === '#coloringMobileHelpBar')) {
            enhanced.unshift({ selector: '#coloringMobileHelpBar', title: currentLangRu('Мини-помощь', 'Mini help'), text: currentLangRu('Здесь видно выбранный цвет, масштаб картинки и сколько раскрасок доступно.', 'Here you can see the selected color, zoom level, and how many coloring pages are available.'), arrow: 'down', hand: 'tap' });
        }
        return enhanced;
    };

    setTimeout(() => {
        ensureColoringMobileHelpBar();
        bindColoringHudPointerEvents();
        updateColoringMobileHud();
    }, 0);
})();

// Externalized inline coloring assets readiness.
(function(){
    function markInlineColoringAssetsReady() {
        try {
            Object.keys(coloringLineArtAssets || {}).forEach(function(key){
                var img = coloringLineArtImages && coloringLineArtImages[key];
                var asset = coloringLineArtAssets[key];
                if (img && asset && (img.complete || (img.naturalWidth && img.naturalHeight))) {
                    asset.loaded = true;
                    asset.boundaryLoaded = true;
                    if (coloringLineArtBoundaryImages) coloringLineArtBoundaryImages[key] = img;
                }
            });
        } catch (e) {}
    }
    var prevOpenColoring = openColoring;
    openColoring = function(){
        markInlineColoringAssetsReady();
        prevOpenColoring();
        setTimeout(function(){
            markInlineColoringAssetsReady();
            try { redrawColoringOutline(); } catch(e) {}
            try { renderColoringTemplates(); } catch(e) {}
            try { updateColoringHint(guideT('Выбери цвет и нажми на область. Картинки загружены внутри файла, поэтому раскраска работает без папки assets ✨', 'Pick a color and tap an area. Images are embedded in this file, so coloring works without the assets folder ✨')); } catch(e) {}
        }, 120);
    };
    var prevSelectColoringTemplate = selectColoringTemplate;
    selectColoringTemplate = function(id){
        markInlineColoringAssetsReady();
        prevSelectColoringTemplate(id);
        setTimeout(function(){
            markInlineColoringAssetsReady();
            try { redrawColoringOutline(); } catch(e) {}
        }, 80);
    };
    window.addEventListener('load', function(){
        markInlineColoringAssetsReady();
    });
})();

// Transparent line-art sanitizer.
(function(){
    const previousSanitize = typeof sanitizeImageToCanvas === "function" ? sanitizeImageToCanvas : null;
    const transparentCache = new WeakMap();

    function sanitizeImageToTransparentLines(img) {
        if (!img) return null;
        if (transparentCache.has(img)) return transparentCache.get(img);
        const w = img.naturalWidth || img.width || 1024;
        const h = img.naturalHeight || img.height || 1024;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        let image;
        try {
            // Same file:// canvas-tainting caveat as makeClosedLineCanvas: if this
            // throws, skip the sanitize pass and let the caller draw the plain image.
            image = ctx.getImageData(0, 0, w, h);
        } catch (e) {
            console.warn('Coloring transparent-line pass skipped (tainted canvas):', e);
            return null;
        }
        const data = image.data;
        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const isBlackLine = alpha > 20 && gray < 238;
            data[i] = isBlackLine ? 0 : 255;
            data[i + 1] = isBlackLine ? 0 : 255;
            data[i + 2] = isBlackLine ? 0 : 255;
            data[i + 3] = isBlackLine ? 255 : 0;
        }
        ctx.putImageData(image, 0, 0);
        transparentCache.set(img, canvas);
        return canvas;
    }

    function drawTransparentLineArt(ctx, img) {
        const clean = sanitizeImageToTransparentLines(img) || img;
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        const imgWidth = clean.width || canvasWidth;
        const imgHeight = clean.height || canvasHeight;
        const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;
        const dx = Math.round((canvasWidth - drawWidth) / 2);
        const dy = Math.round((canvasHeight - drawHeight) / 2);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(clean, dx, dy, drawWidth, drawHeight);
    }

    const prevDraw = drawColoringTemplateById;
    drawColoringTemplateById = function(ctx, templateId) {
        const img = coloringLineArtImages && coloringLineArtImages[templateId];
        if (img && (img.complete || (img.naturalWidth && img.naturalHeight))) {
            drawTransparentLineArt(ctx, img);
            return;
        }
        return prevDraw(ctx, templateId);
    };

    const prevRedraw = redrawColoringOutline;
    redrawColoringOutline = function() {
        prevRedraw();
        try {
            if (coloringOutlineCanvas) {
                const ctx = coloringOutlineCanvas.getContext("2d");
                const img = coloringLineArtImages && coloringLineArtImages[coloringCurrentTemplateId];
                if (ctx && img && (img.complete || img.naturalWidth)) drawTransparentLineArt(ctx, img);
            }
            if (coloringBoundaryCanvas && coloringBoundaryCtx) {
                const img = coloringLineArtImages && coloringLineArtImages[coloringCurrentTemplateId];
                if (img && (img.complete || img.naturalWidth)) drawTransparentLineArt(coloringBoundaryCtx, img);
            }
            coloringOutlineReady = true;
        } catch(e) {}
    };

    const prevRender = renderColoringScreen;
    renderColoringScreen = function() {
        prevRender();
        setTimeout(() => {
            try { redrawColoringOutline(); } catch(e) {}
        }, 120);
    };

    const prevSelect = selectColoringTemplate;
    selectColoringTemplate = function(id) {
        prevSelect(id);
        setTimeout(() => {
            try { redrawColoringOutline(); } catch(e) {}
        }, 120);
    };
})();

// Loupe UX helpers.
(function(){
  const loupeState = {
    active: false,
    pointerId: null,
    downX: 0,
    downY: 0,
    moved: false,
    lastX: 0,
    lastY: 0,
    targetScale: 2.4,
  };

  function getWrap(){ return document.getElementById('coloringCanvasWrap'); }
  function getViewport(){ return document.getElementById('coloringCanvasViewport'); }
  function getButton(){ return document.getElementById('coloringZoomResetBtn'); }

  function ensureLoupe(){
    const wrap = getWrap();
    if (!wrap) return null;
    let el = document.getElementById('coloringLoupeOverlay');
    if (!el){
      el = document.createElement('div');
      el.id = 'coloringLoupeOverlay';
      wrap.appendChild(el);
    }
    return el;
  }

  function updateLoupeButton(){
    const btn = getButton();
    if (!btn) return;
    btn.classList.toggle('loupe-active', !!loupeState.active);
    btn.setAttribute('aria-label', loupeState.active ? 'Лупа активна: выбери область для увеличения' : 'Лупа');
    btn.title = loupeState.active ? 'Лупа активна: нажми на картинку, чтобы приблизить область' : 'Лупа / сброс масштаба';
    btn.textContent = loupeState.active ? '🔎' : '🔍';
  }

  function placeLoupe(clientX, clientY){
    const wrap = getWrap();
    const loupe = ensureLoupe();
    if (!wrap || !loupe) return;
    const rect = wrap.getBoundingClientRect();
    const x = Math.max(18, Math.min(rect.width - 18, clientX - rect.left));
    const y = Math.max(18, Math.min(rect.height - 18, clientY - rect.top));
    loupe.style.display = 'block';
    loupe.style.left = x + 'px';
    loupe.style.top = y + 'px';
    loupeState.lastX = clientX;
    loupeState.lastY = clientY;
  }

  function activateLoupe(){
    loupeState.active = true;
    loupeState.pointerId = null;
    loupeState.moved = false;
    const wrap = getWrap();
    ensureLoupe();
    if (wrap) wrap.classList.add('color-loupe-mode');
    updateLoupeButton();
    if (typeof updateColoringHint === 'function') {
      updateColoringHint(guideT('Лупа включена: проведи по картинке и отпусти палец, чтобы приблизить выбранную область 🔍', 'Loupe is on: move over the picture and release to zoom into the selected area 🔍'));
    }
    if (typeof playSound === 'function') playSound('click');
  }

  function deactivateLoupe(silent){
    loupeState.active = false;
    loupeState.pointerId = null;
    loupeState.moved = false;
    const wrap = getWrap();
    const loupe = ensureLoupe();
    if (wrap) wrap.classList.remove('color-loupe-mode');
    if (loupe) loupe.style.display = 'none';
    updateLoupeButton();
    if (!silent && typeof updateColoringHint === 'function') {
      updateColoringHint(guideT('Лупа выключена. Двумя пальцами всё ещё можно увеличивать картинку ✨', 'Loupe off. You can still use two fingers to zoom ✨'));
    }
  }

  function zoomToClientPoint(clientX, clientY, targetScale){
    const wrap = getWrap();
    if (!wrap || typeof applyColoringZoom !== 'function' || typeof zoomState === 'undefined') return;
    const rect = wrap.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;
    const contentX = (localX - zoomState.tx) / zoomState.scale;
    const contentY = (localY - zoomState.ty) / zoomState.scale;
    zoomState.scale = Math.max(1, Math.min(zoomState.maxScale || 4, targetScale || loupeState.targetScale));
    zoomState.tx = localX - (contentX * zoomState.scale);
    zoomState.ty = localY - (contentY * zoomState.scale);
    applyColoringZoom();
    if (typeof updateColoringHint === 'function') {
      updateColoringHint(guideT('Область увеличена. Двигай картинку пальцем и щипком меняй масштаб 🔍', 'Area zoomed. Drag with one finger and pinch to adjust the zoom 🔍'));
    }
  }

  function installLoupeEvents(){
    const wrap = getWrap();
    if (!wrap || wrap.__loupeInstalled) return;
    wrap.__loupeInstalled = true;

    wrap.addEventListener('pointerdown', function(e){
      if (!loupeState.active) return;
      loupeState.pointerId = e.pointerId;
      loupeState.downX = e.clientX;
      loupeState.downY = e.clientY;
      loupeState.moved = false;
      placeLoupe(e.clientX, e.clientY);
      try { wrap.setPointerCapture && wrap.setPointerCapture(e.pointerId); } catch(err) {}
      e.preventDefault();
      e.stopPropagation();
    }, true);

    wrap.addEventListener('pointermove', function(e){
      if (!loupeState.active || loupeState.pointerId !== e.pointerId) return;
      const dist = Math.hypot(e.clientX - loupeState.downX, e.clientY - loupeState.downY);
      if (dist > 6) loupeState.moved = true;
      placeLoupe(e.clientX, e.clientY);
      e.preventDefault();
      e.stopPropagation();
    }, true);

    function finishLoupe(e){
      if (!loupeState.active || loupeState.pointerId !== e.pointerId) return;
      placeLoupe(e.clientX, e.clientY);
      zoomToClientPoint(e.clientX, e.clientY, loupeState.targetScale);
      loupeState.pointerId = null;
      setTimeout(() => deactivateLoupe(true), 120);
      e.preventDefault();
      e.stopPropagation();
      if (typeof playSound === 'function') playSound('click');
    }

    wrap.addEventListener('pointerup', finishLoupe, true);
    wrap.addEventListener('pointercancel', function(e){
      if (!loupeState.active || loupeState.pointerId !== e.pointerId) return;
      loupeState.pointerId = null;
      deactivateLoupe(true);
      e.preventDefault();
      e.stopPropagation();
    }, true);
  }

  function patchLoupeButton(){
    const btn = getButton();
    if (!btn || btn.__loupePatched) return;
    btn.__loupePatched = true;
    btn.onclick = function(){
      installLoupeEvents();
      if (loupeState.active) {
        deactivateLoupe();
        return;
      }
      if (typeof zoomState !== 'undefined' && zoomState.scale > 1.02) {
        if (typeof resetColoringZoom === 'function') resetColoringZoom(true);
        if (typeof updateColoringHint === 'function') {
          updateColoringHint(guideT('Масштаб сброшен. Нажми на лупу ещё раз, если хочешь выбрать область вручную 🔍', 'Zoom reset. Tap the magnifier again if you want to choose an area manually 🔍'));
        }
        if (typeof playSound === 'function') playSound('click');
        return;
      }
      activateLoupe();
    };
    updateLoupeButton();
  }

  const originalRender = window.renderColoringScreen;
  window.renderColoringScreen = function(){
    originalRender && originalRender();
    ensureLoupe();
    installLoupeEvents();
    patchLoupeButton();
    updateLoupeButton();
  };

  const originalOpen = window.openColoring;
  if (typeof originalOpen === 'function') {
    window.openColoring = function(){
      const res = originalOpen.apply(this, arguments);
      setTimeout(function(){
        ensureLoupe(); installLoupeEvents(); patchLoupeButton(); updateLoupeButton();
      }, 80);
      return res;
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function(){
      ensureLoupe(); installLoupeEvents(); patchLoupeButton(); updateLoupeButton();
    }, 80);
  });
})();

(function(){
  // Stage 6.1.7 RESET Step 2: one closed-line-art pass for all 30 coloring pages.
  // Replaces the old three near-identical CLOSED_BATCH_1/2/3 wrapper blocks.
  const CLOSED_TEMPLATES = new Set([
  "lion_savanna",
  "elephant_jungle",
  "penguin_ice",
  "rabbit_meadow",
  "tiger_tropics",
  "parrot_jungle",
  "bear_forest",
  "camel_desert",
  "crocodile_river",
  "deer_forest",
  "dolphin_sea",
  "fox_forest",
  "frog_pond",
  "giraffe_savanna",
  "hedgehog_garden",
  "hippo_lake",
  "kangaroo_field",
  "koala_tree",
  "monkey_jungle",
  "octopus_sea",
  "owl_branch",
  "panda_bamboo",
  "pony_meadow",
  "rhino_savanna",
  "seal_beach",
  "squirrel_forest",
  "turtle_coast",
  "whale_ocean",
  "wolf_forest",
  "zebra_savanna"
]);
  const closedCanvasCache = new Map();

  function isImageReady(img) {
    return !!(img && (img.complete || (img.naturalWidth && img.naturalHeight)));
  }

  function getImageKey(img, radius) {
    return (img.currentSrc || img.src || String(img)) + '::closed-step2::' + radius;
  }

  function drawImageFit(ctx, imageCanvas) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const imgWidth = imageCanvas.width || canvasWidth;
    const imgHeight = imageCanvas.height || canvasHeight;
    const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const dx = Math.round((canvasWidth - drawWidth) / 2);
    const dy = Math.round((canvasHeight - drawHeight) / 2);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(imageCanvas, dx, dy, drawWidth, drawHeight);
  }

  function makeClosedLineCanvas(img, radius) {
    const key = getImageKey(img, radius);
    if (closedCanvasCache.has(key)) return closedCanvasCache.get(key);

    const w = img.naturalWidth || img.width || 1024;
    const h = img.naturalHeight || img.height || 1024;
    const srcCanvas = document.createElement('canvas');
    srcCanvas.width = w;
    srcCanvas.height = h;
    const srcCtx = srcCanvas.getContext('2d', { willReadFrequently: true });
    srcCtx.clearRect(0, 0, w, h);
    srcCtx.drawImage(img, 0, 0, w, h);

    let source;
    try {
      // Reading pixel data can throw a SecurityError ("tainted canvas") when the
      // page is opened via file:// and the image was loaded from an external
      // asset file: each file:// resource is treated as a separate origin.
      // In that case we skip this cosmetic outline-thickening pass and let the
      // caller fall back to a plain (still correct) draw of the picture.
      source = srcCtx.getImageData(0, 0, w, h);
    } catch (e) {
      console.warn('Coloring closed-line pass skipped (tainted canvas):', e);
      return null;
    }
    const srcData = source.data;
    const black = new Uint8Array(w * h);
    for (let p = 0, i = 0; p < black.length; p++, i += 4) {
      const alpha = srcData[i + 3];
      const brightness = (srcData[i] + srcData[i + 1] + srcData[i + 2]) / 3;
      black[p] = (alpha > 20 && brightness < 240) ? 1 : 0;
    }

    const dilated = new Uint8Array(w * h);
    const r = Math.max(1, radius | 0);
    for (let y = 0; y < h; y++) {
      const row = y * w;
      for (let x = 0; x < w; x++) {
        let found = 0;
        for (let dy = -r; dy <= r && !found; dy++) {
          const yy = y + dy;
          if (yy < 0 || yy >= h) continue;
          const yyRow = yy * w;
          for (let dx = -r; dx <= r; dx++) {
            const xx = x + dx;
            if (xx < 0 || xx >= w) continue;
            if (black[yyRow + xx]) { found = 1; break; }
          }
        }
        dilated[row + x] = found;
      }
    }

    const bridged = new Uint8Array(dilated);
    const gap = 3;
    for (let y = gap; y < h - gap; y++) {
      const row = y * w;
      for (let x = gap; x < w - gap; x++) {
        const p = row + x;
        if (dilated[p]) continue;
        const leftRight = dilated[p - gap] && dilated[p + gap];
        const upDown = dilated[p - gap * w] && dilated[p + gap * w];
        const diag1 = dilated[(y - gap) * w + (x - gap)] && dilated[(y + gap) * w + (x + gap)];
        const diag2 = dilated[(y - gap) * w + (x + gap)] && dilated[(y + gap) * w + (x - gap)];
        if (leftRight || upDown || diag1 || diag2) bridged[p] = 1;
      }
    }

    const outCanvas = document.createElement('canvas');
    outCanvas.width = w;
    outCanvas.height = h;
    const outCtx = outCanvas.getContext('2d');
    const outImage = outCtx.createImageData(w, h);
    const outData = outImage.data;
    for (let p = 0, i = 0; p < bridged.length; p++, i += 4) {
      if (bridged[p]) {
        outData[i] = 0;
        outData[i + 1] = 0;
        outData[i + 2] = 0;
        outData[i + 3] = 255;
      } else {
        outData[i] = 255;
        outData[i + 1] = 255;
        outData[i + 2] = 255;
        outData[i + 3] = 0;
      }
    }
    outCtx.putImageData(outImage, 0, 0);
    closedCanvasCache.set(key, outCanvas);
    return outCanvas;
  }

  function drawClosedTemplate(ctx, templateId, radius) {
    const img = coloringLineArtImages && coloringLineArtImages[templateId];
    if (!CLOSED_TEMPLATES.has(templateId) || !isImageReady(img)) return false;
    const clean = makeClosedLineCanvas(img, radius);
    if (!clean) return false;
    drawImageFit(ctx, clean);
    return true;
  }

  const previousDrawColoringTemplateById = drawColoringTemplateById;
  drawColoringTemplateById = function(ctx, templateId) {
    const boundaryRadius = (ctx === coloringBoundaryCtx || (ctx && ctx.__coloringBoundary)) ? 2 : 1;
    if (drawClosedTemplate(ctx, templateId, boundaryRadius)) return;
    return previousDrawColoringTemplateById(ctx, templateId);
  };

  const previousRedrawColoringOutline = redrawColoringOutline;
  redrawColoringOutline = function() {
    previousRedrawColoringOutline();
    try {
      const templateId = coloringCurrentTemplateId;
      if (!CLOSED_TEMPLATES.has(templateId)) return;
      const outlineCtx = getColoringOutlineCtx && getColoringOutlineCtx();
      if (outlineCtx) drawClosedTemplate(outlineCtx, templateId, 1);
      if (coloringBoundaryCtx) drawClosedTemplate(coloringBoundaryCtx, templateId, 2);
      coloringOutlineReady = true;
    } catch (e) {
      console.warn('Coloring closed-shape redraw fallback step 2', e);
    }
  };

  const previousSelectColoringTemplate = selectColoringTemplate;
  selectColoringTemplate = function(id) {
    previousSelectColoringTemplate(id);
    if (CLOSED_TEMPLATES.has(id)) {
      setTimeout(() => {
        try {
          redrawColoringOutline();
          resetColoringCanvasBase();
          updateColoringHint(guideT('Контуры этой картинки усилены: выбирай цвет и заливай области ✨', 'This page has stronger closed lines: choose a color and fill areas ✨'));
        } catch(e) {}
      }, 90);
    }
  };

  const previousRenderColoringScreen = renderColoringScreen;
  renderColoringScreen = function() {
    previousRenderColoringScreen();
    if (CLOSED_TEMPLATES.has(coloringCurrentTemplateId)) {
      setTimeout(() => {
        try { redrawColoringOutline(); } catch(e) {}
      }, 90);
    }
  };
})();

})();
