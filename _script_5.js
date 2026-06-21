
(function hardBindGuideFab(){
    'use strict';
    const SAFE_TITLE_RU = 'Подсказка';
    const SAFE_TEXT_RU = 'Я здесь. Нажимай кнопки, листай списки и выбирай элементы на экране. Если рамка не появилась, значит для этого элемента ещё нет точной подсказки.';
    const SAFE_TITLE_EN = 'Help';
    const SAFE_TEXT_EN = 'I am here. Tap buttons, scroll lists, and choose items on the screen. If the frame is not shown, this exact element does not have a guide step yet.';

    function currentLangIsEn(){
        try { return typeof getCurrentLanguage === 'function' && getCurrentLanguage() === 'en'; } catch(e) { return false; }
    }

    function getVisibleScreenSafe(){
        try {
            if (typeof getVisibleScreenId === 'function') return getVisibleScreenId();
            const shown = document.querySelector('.screen.show, section.show, [id$="Screen"].show');
            return shown && shown.id ? shown.id : 'menuScreen';
        } catch(e) { return 'menuScreen'; }
    }

    function ensureManualGuideFallback(){
        const overlay = document.getElementById('guideOverlay');
        const title = document.getElementById('guideBubbleTitle');
        const text = document.getElementById('guideBubbleText');
        const next = document.getElementById('guideNextBtn');
        const highlight = document.getElementById('guideHighlight');
        const arrow = document.getElementById('guideArrow');
        const hand = document.getElementById('guideHand');
        if (!overlay || !title || !text) return false;
        if (highlight) {
            highlight.style.width = '0px';
            highlight.style.height = '0px';
            highlight.style.left = '-9999px';
            highlight.style.top = '-9999px';
        }
        if (arrow) arrow.classList.remove('show');
        if (hand) hand.className = 'guide-hand';
        title.textContent = currentLangIsEn() ? SAFE_TITLE_EN : SAFE_TITLE_RU;
        text.textContent = currentLangIsEn() ? SAFE_TEXT_EN : SAFE_TEXT_RU;
        if (next) next.textContent = currentLangIsEn() ? 'Done' : 'Готово';
        window.activeGuide = window.activeGuide || null;
        overlay.classList.add('show');
        document.body.classList.add('guide-open');
        return true;
    }

    function openGuideFromFab(event){
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
        }
        const overlay = document.getElementById('guideOverlay');
        const wasOpen = !!(overlay && overlay.classList.contains('show'));
        try {
            if (typeof startGuideForCurrentScreen === 'function') {
                startGuideForCurrentScreen();
            } else if (typeof startGuide === 'function') {
                startGuide(getVisibleScreenSafe(), false);
            }
        } catch (e) {
            console.warn('Guide start failed, showing safe fallback', e);
        }
        window.setTimeout(function(){
            const overlayNow = document.getElementById('guideOverlay');
            const opened = !!(overlayNow && overlayNow.classList.contains('show'));
            if (!opened || wasOpen === opened && !document.body.classList.contains('guide-open')) {
                ensureManualGuideFallback();
            } else {
                document.body.classList.add('guide-open');
            }
        }, 30);
        return false;
    }

    function closeGuideBodyState(){
        const overlay = document.getElementById('guideOverlay');
        if (!overlay || !overlay.classList.contains('show')) {
            document.body.classList.remove('guide-open');
        }
    }

    function bind(){
        const fab = document.getElementById('guideFab');
        if (!fab || fab.dataset.assistantStage32Bound === '1') return;
        fab.dataset.assistantStage32Bound = '1';
        fab.setAttribute('type', 'button');
        fab.setAttribute('aria-label', currentLangIsEn() ? 'Show help' : 'Показать подсказки');
        fab.onclick = openGuideFromFab;
        ['click','pointerup','touchend'].forEach(function(type){
            fab.addEventListener(type, openGuideFromFab, { capture: true, passive: false });
        });
    }

    document.addEventListener('click', function(event){
        const fab = event.target && event.target.closest ? event.target.closest('#guideFab') : null;
        if (fab) openGuideFromFab(event);
    }, true);

    document.addEventListener('pointerup', function(event){
        const fab = event.target && event.target.closest ? event.target.closest('#guideFab') : null;
        if (fab) openGuideFromFab(event);
    }, true);

    const oldHide = window.hideGuideOverlay;
    if (typeof oldHide === 'function' && !oldHide.__assistantStage32Wrapped) {
        const wrapped = function(){
            const result = oldHide.apply(this, arguments);
            document.body.classList.remove('guide-open');
            return result;
        };
        wrapped.__assistantStage32Wrapped = true;
        window.hideGuideOverlay = wrapped;
    }

    const oldSkip = window.skipGuide;
    if (typeof oldSkip === 'function' && !oldSkip.__assistantStage32Wrapped) {
        const wrappedSkip = function(){
            const result = oldSkip.apply(this, arguments);
            document.body.classList.remove('guide-open');
            return result;
        };
        wrappedSkip.__assistantStage32Wrapped = true;
        window.skipGuide = wrappedSkip;
    }

    const oldNext = window.nextGuideStep;
    if (typeof oldNext === 'function' && !oldNext.__assistantStage32Wrapped) {
        const wrappedNext = function(){
            const result = oldNext.apply(this, arguments);
            window.setTimeout(closeGuideBodyState, 20);
            return result;
        };
        wrappedNext.__assistantStage32Wrapped = true;
        window.nextGuideStep = wrappedNext;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind, { once: true });
    } else {
        bind();
    }
    window.addEventListener('load', bind, { once: true });
    window.openGuideFromFab = openGuideFromFab;
})();


/* ===== Stage 4.2A: Critical UX polish — language picker, modal close buttons, pet voice, puzzle completion choices ===== */
(function(){
    'use strict';
    const LANG_DATA = {
        ru: { flag: '🇷🇺', label: 'Русский', title: 'Выбери язык', text: 'Язык можно поменять в любой момент.', menu: '🇷🇺 Русская версия', playOther: 'Поиграй в другую игру', voice: '🔊 Голос', close: 'Закрыть' },
        en: { flag: '🇬🇧', label: 'English', title: 'Choose language', text: 'You can change the language anytime.', menu: '🇬🇧 English version', playOther: 'Play another game', voice: '🔊 Voice', close: 'Close' },
        hy: { flag: '🇦🇲', label: 'Հայերեն', title: 'Ընտրիր լեզուն', text: 'Լեզուն կարելի է փոխել ցանկացած պահի։', menu: '🇦🇲 Հայերեն տարբերակ', playOther: 'Խաղա ուրիշ խաղ', voice: '🔊 Ձայն', close: 'Փակել' }
    };
    function currentLang(){
        try { return (typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : localStorage.getItem('zooLanguage')) || 'ru'; } catch(e) { return 'ru'; }
    }
    function dict(){ return LANG_DATA[currentLang()] || LANG_DATA.ru; }
    function closeOverlayElement(overlay){
        if (!overlay) return;
        if (overlay.id === 'dailyGiftOverlay') {
            overlay.style.display = 'none';
        } else if (overlay.id === 'purchaseConfirmOverlay' && typeof window.closePurchaseConfirm === 'function') {
            window.closePurchaseConfirm();
            return;
        } else if (overlay.id === 'blockGameOverOverlay' && typeof window.closeZooBlockGameOverModal === 'function') {
            window.closeZooBlockGameOverModal();
            return;
        } else if (overlay.id === 'guideOverlay') {
            if (typeof window.skipGuide === 'function') window.skipGuide();
            overlay.classList.remove('show');
        } else if (overlay.id === 'overlay' && typeof window.hideOverlay === 'function') {
            window.hideOverlay();
            return;
        } else if (overlay.classList.contains('language-picker-overlay') || overlay.classList.contains('puzzle-choice-modal-overlay')) {
            overlay.classList.remove('show');
            window.setTimeout(() => overlay.remove(), 240);
        } else {
            overlay.classList.remove('show');
        }
        try { document.body.classList.remove('zoo-modal-open'); } catch(e) {}
    }
    function findOverlayForCard(card){
        return card && card.closest && card.closest('.language-picker-overlay, .puzzle-choice-modal-overlay, .purchase-confirm-overlay, .rewarded-ad-overlay, .daily-gift-overlay, .shadow-celebration-overlay, .block-gameover-overlay, .guide-overlay, .overlay');
    }
    function ensureCloseButton(card){
        if (!card || card.dataset.stage42aCloseReady === '1') return;
        card.dataset.stage42aCloseReady = '1';
        if (card.querySelector(':scope > .zoo-modal-close')) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'zoo-modal-close';
        btn.setAttribute('aria-label', dict().close);
        btn.textContent = '×';
        btn.addEventListener('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            const overlay = findOverlayForCard(card);
            closeOverlayElement(overlay || card);
        }, true);
        card.insertBefore(btn, card.firstChild);
    }
    function auditModalCloseButtons(){
        document.querySelectorAll('.language-picker-card, .puzzle-choice-modal-card, .purchase-confirm-card, .rewarded-ad-card, .daily-gift-card, .shadow-celebration-card, .block-gameover-card, .modal, .guide-bubble').forEach(ensureCloseButton);
    }
    function updateLanguageButton(){
        const btn = document.getElementById('languageSwitchButton');
        if (!btn) return;
        const d = dict();
        if (btn.textContent !== d.menu) btn.textContent = d.menu;
        btn.onclick = function(event){
            if (event) { event.preventDefault(); event.stopPropagation(); }
            window.showLanguagePicker();
            return false;
        };
        btn.setAttribute('aria-haspopup', 'dialog');
    }
    window.showLanguagePicker = function showLanguagePicker(){
        const old = document.getElementById('languagePickerOverlay');
        if (old) old.remove();
        const d = dict();
        const lang = currentLang();
        const overlay = document.createElement('div');
        overlay.id = 'languagePickerOverlay';
        overlay.className = 'language-picker-overlay show';
        overlay.dataset.zooModalOverlay = 'true';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.innerHTML = `
            <div class="language-picker-card">
                <div class="language-picker-title">🌐 ${d.title}</div>
                <div class="language-picker-text">${d.text}</div>
                <div class="language-picker-list">
                    ${Object.entries(LANG_DATA).map(([key, info]) => `<button type="button" class="language-picker-option ${key === lang ? 'active' : ''}" data-lang="${key}">${info.flag} ${info.label}</button>`).join('')}
                </div>
            </div>`;
        document.body.appendChild(overlay);
        document.body.classList.add('zoo-modal-open');
        auditModalCloseButtons();
        overlay.addEventListener('click', function(event){
            if (event.target === overlay) closeOverlayElement(overlay);
        });
        overlay.querySelectorAll('[data-lang]').forEach(btn => {
            btn.addEventListener('click', function(){
                const next = btn.dataset.lang || 'ru';
                if (typeof setLanguage === 'function') setLanguage(next);
                else { try { localStorage.setItem('zooLanguage', next); } catch(e) {} location.reload(); }
            });
        });
    };
    window.playPetRoomAnimalVoice = function playPetRoomAnimalVoice(){
        try { initAudio(); } catch(e) {}
        const key = window.selectedMainPetKey || (typeof selectedMainPetKey !== 'undefined' ? selectedMainPetKey : 'lion') || 'lion';
        try { playAnimalSound(key); } catch(e) { try { playSound('click'); } catch(_) {} }
        try {
            const name = typeof getAnimalDisplayName === 'function' ? getAnimalDisplayName(key) : '';
            if (typeof showPetRoomToast === 'function') showPetRoomToast(`${name ? name + ': ' : ''}${dict().voice}`);
            if (typeof playPetRoomSparkEffect === 'function') playPetRoomSparkEffect('🔊');
        } catch(e) {}
    };
    function updatePetRoomVoiceLabel(){
        const btn = document.getElementById('petRoomVoiceBtn');
        if (btn && btn.textContent !== dict().voice) btn.textContent = dict().voice;
        const title = document.querySelector('.pet-room-mini-games .mini-games-title');
        const titleText = '🎮 ' + dict().playOther;
        if (title && title.textContent !== titleText) title.textContent = titleText;
    }
    function miniGameLinksHtml(){
        const d = dict();
        return `<div class="mini-game-cross-links">
            <div class="mini-games-title">🎮 ${d.playOther}</div>
            <button type="button" class="mini-game-cross-card" onclick="setModeAndOpenMap('calm')"><span class="mini-icon">🃏</span>${currentLang()==='en'?'Pairs':currentLang()==='hy'?'Զույգեր':'Найди пары'}</button>
            <button type="button" class="mini-game-cross-card" onclick="openPuzzle()"><span class="mini-icon">🧩</span>${currentLang()==='en'?'Puzzle':currentLang()==='hy'?'Փազլ':'Пазл'}</button>
            <button type="button" class="mini-game-cross-card" onclick="openZooBlock()"><span class="mini-icon">🧱</span>Zoo Block</button>
            <button type="button" class="mini-game-cross-card" onclick="openShadowGame()"><span class="mini-icon">🦁</span>${currentLang()==='en'?'Find animal':currentLang()==='hy'?'Գտիր կենդանուն':'Найди животное'}</button>
        </div>`;
    }
    function getNextUnlockedPuzzleImage(){
        try {
            const unlocked = (Array.isArray(unlockedPuzzleImages) ? unlockedPuzzleImages : []);
            if (!Array.isArray(puzzleImageCatalog)) return null;
            return puzzleImageCatalog.find(item => unlocked.includes(item.key) && puzzleCurrentImage && item.key !== puzzleCurrentImage.id) || null;
        } catch(e) { return null; }
    }
    function getNextLockedPuzzleImage(){
        try {
            const unlocked = (Array.isArray(unlockedPuzzleImages) ? unlockedPuzzleImages : []);
            if (!Array.isArray(puzzleImageCatalog)) return null;
            return puzzleImageCatalog.find(item => !unlocked.includes(item.key)) || null;
        } catch(e) { return null; }
    }
    function getNextPuzzleStageChoice(){
        try {
            const next = puzzleStages.find(item => item.id === puzzleStageId + 1);
            if (!next) return null;
            return next;
        } catch(e) { return null; }
    }
    window.showPuzzleWinPop = function showPuzzleWinPop(reward, unlockedStageText = ''){
        const oldToast = document.querySelector('.puzzle-win-pop');
        if (oldToast) oldToast.remove();
        const old = document.getElementById('puzzleChoiceOverlay');
        if (old) old.remove();
        const lang = currentLang();
        const nextStage = getNextPuzzleStageChoice();
        const otherImage = getNextUnlockedPuzzleImage();
        const lockedImage = getNextLockedPuzzleImage();
        const title = lang === 'en' ? 'Puzzle complete!' : lang === 'hy' ? 'Փազլը հավաքված է!' : 'Пазл собран!';
        const text = lang === 'en'
            ? `Reward: +${reward} coins 🪙${unlockedStageText || ''}`
            : lang === 'hy'
                ? `Պարգև՝ +${reward} մետաղադրամ 🪙${unlockedStageText || ''}`
                : `Награда: +${reward} монет 🪙${unlockedStageText || ''}`;
        const overlay = document.createElement('div');
        overlay.id = 'puzzleChoiceOverlay';
        overlay.className = 'puzzle-choice-modal-overlay show';
        overlay.dataset.zooModalOverlay = 'true';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        const actions = [];
        if (nextStage && typeof isPuzzleStageUnlocked === 'function' && isPuzzleStageUnlocked(nextStage.id)) {
            actions.push(`<button type="button" class="puzzle-choice-action primary" data-action="next-stage">${lang==='en'?'Next mode':lang==='hy'?'Հաջորդ ռեժիմ':'Следующий режим'} ${nextStage.short}</button>`);
        } else if (nextStage) {
            actions.push(`<button type="button" class="puzzle-choice-action orange" data-action="open-stage">${lang==='en'?'Open next level':lang==='hy'?'Բացել հաջորդ փուլը':'Открыть следующий уровень'} ${nextStage.short}</button>`);
        }
        if (otherImage) {
            actions.push(`<button type="button" class="puzzle-choice-action purple" data-action="other-image">${lang==='en'?'Other picture':lang==='hy'?'Ուրիշ նկար':'Другая картинка'}: ${otherImage.label}</button>`);
        } else if (lockedImage) {
            actions.push(`<button type="button" class="puzzle-choice-action orange" data-action="open-image">${lang==='en'?'Open new picture':lang==='hy'?'Բացել նոր նկարը':'Открыть новую картинку'}: ${lockedImage.label}</button>`);
        }
        actions.push(`<button type="button" class="puzzle-choice-action" data-action="again">${lang==='en'?'Play again':lang==='hy'?'Խաղալ նորից':'Сыграть ещё раз'}</button>`);
        overlay.innerHTML = `<div class="puzzle-choice-modal-card">
            <div class="puzzle-choice-title">🎉 ${title}</div>
            <div class="puzzle-choice-text">${text}</div>
            <div class="puzzle-choice-actions">${actions.join('')}</div>
            ${miniGameLinksHtml()}
        </div>`;
        document.body.appendChild(overlay);
        document.body.classList.add('zoo-modal-open');
        auditModalCloseButtons();
        overlay.addEventListener('click', function(event){ if (event.target === overlay) closeOverlayElement(overlay); });
        overlay.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', function(){
                const action = btn.dataset.action;
                closeOverlayElement(overlay);
                if (action === 'next-stage' && nextStage) setPuzzleStage(nextStage.id);
                else if (action === 'open-stage' && nextStage) buyPuzzleStage(nextStage.id);
                else if (action === 'other-image' && otherImage) setPuzzleImage(otherImage.key, otherImage.label, animalImageSrc(otherImage.key));
                else if (action === 'open-image' && lockedImage) buyPuzzleImage(lockedImage.key);
                else { try { buildPuzzlePieces(); shufflePuzzle(false); } catch(e) {} }
            });
        });
        try { playSound('win'); } catch(e) {}
    };
    const oldRenderPetRoom = window.renderPetRoom;
    if (typeof oldRenderPetRoom === 'function' && !oldRenderPetRoom.__stage42aWrapped) {
        const wrapped = function(){
            const result = oldRenderPetRoom.apply(this, arguments);
            updatePetRoomVoiceLabel();
            return result;
        };
        wrapped.__stage42aWrapped = true;
        window.renderPetRoom = wrapped;
    }
    document.addEventListener('click', function(event){
        const langBtn = event.target && event.target.closest ? event.target.closest('#languageSwitchButton') : null;
        if (langBtn) {
            event.preventDefault();
            event.stopPropagation();
            window.showLanguagePicker();
        }
    }, true);
    document.addEventListener('keydown', function(event){
        if (event.key !== 'Escape') return;
        const open = document.querySelector('.language-picker-overlay.show, .puzzle-choice-modal-overlay.show, .purchase-confirm-overlay.show, .rewarded-ad-overlay.show, .daily-gift-overlay[style*="grid"], .shadow-celebration-overlay.show, .block-gameover-overlay.show, .overlay.show, .guide-overlay.show');
        if (open) closeOverlayElement(open);
    }, true);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){ updateLanguageButton(); updatePetRoomVoiceLabel(); auditModalCloseButtons(); }, { once: true });
    } else {
        updateLanguageButton(); updatePetRoomVoiceLabel(); auditModalCloseButtons();
    }
    const observer = new MutationObserver(function(){ auditModalCloseButtons(); updateLanguageButton(); updatePetRoomVoiceLabel(); });
    try { observer.observe(document.body, { childList: true, subtree: true }); } catch(e) {}
    window.addEventListener('load', function(){ updateLanguageButton(); updatePetRoomVoiceLabel(); auditModalCloseButtons(); }, { once: true });
})();



/* ===== Stage 4.2C UX hotfix: coloring dual scroll + pet voice verification ===== */
function getColoringScrollContainer() {
    const screen = document.getElementById('coloringScreen');
    const panel = screen ? screen.querySelector('.card-panel') : null;
    if (panel && panel.scrollHeight > panel.clientHeight + 4) return panel;
    if (screen && screen.scrollHeight > screen.clientHeight + 4) return screen;
    return document.scrollingElement || document.documentElement || document.body;
}

function coloringScrollUpdateBtn() {
    const downBtn = document.getElementById('coloringScrollBtn');
    const upBtn = document.getElementById('coloringScrollUpBtn');
    const screen = document.getElementById('coloringScreen');
    const isVisible = !!(screen && screen.classList.contains('show'));
    if (!downBtn || !upBtn) return;
    downBtn.classList.toggle('visible', isVisible);
    upBtn.classList.toggle('visible', isVisible);
    const scrollEl = getColoringScrollContainer();
    const top = scrollEl === document.body || scrollEl === document.documentElement || scrollEl === document.scrollingElement
        ? (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0)
        : scrollEl.scrollTop;
    const max = scrollEl === document.body || scrollEl === document.documentElement || scrollEl === document.scrollingElement
        ? Math.max(0, (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight)
        : Math.max(0, scrollEl.scrollHeight - scrollEl.clientHeight);
    upBtn.classList.toggle('is-disabled', top <= 12);
    downBtn.classList.toggle('is-disabled', max - top <= 12);
}

function coloringScrollToTop() {
    const scrollEl = getColoringScrollContainer();
    if (scrollEl && typeof scrollEl.scrollTo === 'function') {
        if (scrollEl === document.body || scrollEl === document.documentElement || scrollEl === document.scrollingElement) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    setTimeout(coloringScrollUpdateBtn, 420);
}

function coloringScrollToBottom() {
    const scrollEl = getColoringScrollContainer();
    if (scrollEl && typeof scrollEl.scrollTo === 'function') {
        if (scrollEl === document.body || scrollEl === document.documentElement || scrollEl === document.scrollingElement) {
            const max = Math.max(0, (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight);
            window.scrollTo({ top: max, behavior: 'smooth' });
        } else {
            scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });
        }
    }
    setTimeout(coloringScrollUpdateBtn, 420);
}

function coloringScrollToggle() {
    coloringScrollToBottom();
}

document.addEventListener('scroll', function() {
    const screen = document.getElementById('coloringScreen');
    if (screen && screen.classList.contains('show')) coloringScrollUpdateBtn();
}, { passive: true, capture: true });

window.addEventListener('resize', function(){
    const screen = document.getElementById('coloringScreen');
    if (screen && screen.classList.contains('show')) coloringScrollUpdateBtn();
}, { passive: true });

(function(){
    const originalRenderPetRoom = window.renderPetRoom;
    if (typeof originalRenderPetRoom === 'function') {
        window.renderPetRoom = function() {
            const result = originalRenderPetRoom.apply(this, arguments);
            const btn = document.getElementById('petRoomVoiceBtn');
            if (btn) {
                btn.setAttribute('aria-label', (typeof currentLang === 'function' && currentLang() === 'en') ? 'Play animal voice' : 'Воспроизвести голос животного');
                btn.title = (typeof currentLang === 'function' && currentLang() === 'en') ? 'Play animal voice' : 'Воспроизвести голос животного';
                btn.onclick = function(){
                    if (typeof playPetRoomAnimalVoice === 'function') playPetRoomAnimalVoice();
                };
            }
            return result;
        };
    }
})();

