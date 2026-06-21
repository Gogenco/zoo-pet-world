// Guarded module: safe against duplicate script injection.
(function(){
  if (window.__ZOO_ECONOMY_REWARDS_STEP2__) return;
  window.__ZOO_ECONOMY_REWARDS_STEP2__ = true;

// Zoo Pet World — Stage 6.1.7 RESET Step 2 rewards/economy/ads module
// Rewards/progress integration QA.
(function(){
    const QUEST_TYPES = new Set(['pairs','levels','threeStars','feed','play','puzzle','block','shadow','coloring']);
    const questClaimLocks = new Set();

    function uniqueArray(value) {
        return Array.from(new Set(Array.isArray(value) ? value.filter(Boolean) : []));
    }

    const previousNormalizeDailyProgress = normalizeDailyProgress;
    normalizeDailyProgress = function() {
        previousNormalizeDailyProgress();
        dailyProgress.claimed = uniqueArray(dailyProgress.claimed);
        dailyProgress.claimedAt = dailyProgress.claimedAt && typeof dailyProgress.claimedAt === 'object' ? dailyProgress.claimedAt : {};
        dailyProgress.rewardLog = Array.isArray(dailyProgress.rewardLog) ? dailyProgress.rewardLog.slice(-30) : [];
        dailyProgress.playEventKeys = uniqueArray(dailyProgress.playEventKeys);
    };

    const previousUpdateTaskProgress = updateTaskProgress;
    updateTaskProgress = function(type, amount = 1) {
        normalizeDailyProgress();
        if (!QUEST_TYPES.has(type)) return;
        const inc = Math.max(0, Math.min(50, Math.floor(Number(amount) || 0)));
        if (!inc) return;
        const before = Math.max(0, Number(dailyProgress[type] || 0));
        dailyProgress[type] = before + inc;
        dailyProgress.lastProgressAt = Date.now();
        dailyProgress.lastProgressType = type;
        saveProgress();
        try {
            if (tasksScreen && tasksScreen.classList.contains('show')) renderTasks();
        } catch (e) {}
    };

    function getQuestStats(tasks) {
        const totalReward = tasks.reduce((sum, task) => sum + Number(task.reward || 0), 0);
        const claimedReward = tasks
            .filter(task => isDailyQuestClaimed(task))
            .reduce((sum, task) => sum + Number(task.reward || 0), 0);
        const claimableReward = tasks
            .filter(task => isDailyQuestDone(task) && !isDailyQuestClaimed(task))
            .reduce((sum, task) => sum + Number(task.reward || 0), 0);
        return { totalReward, claimedReward, claimableReward };
    }

    const previousGetDailyQuestDefinitions = getDailyQuestDefinitions;
    getDailyQuestDefinitions = function() {
        const list = previousGetDailyQuestDefinitions().map(task => ({ ...task }));
        list.forEach(task => {
            task.progress = Math.max(0, Number(task.progress || 0));
            task.target = Math.max(1, Number(task.target || 1));
            task.reward = Math.max(0, Number(task.reward || 0));
            if (task.id === 'pairs') {
                task.title = 'Сыграй в Найди пары';
                task.desc = 'Открой раздел «Найди пары» и найди 5 одинаковых зверят.';
                task.actionText = 'Найди пары';
                task.action = () => openPairsModeScreen();
            }
            if (task.id === 'play') {
                task.desc = 'Засчитываются Memory, Pet Room play, Puzzle, Zoo Block и пройденный Shadow уровень.';
            }
        });
        return list;
    };

    function addRewardLog(task, mode) {
        dailyProgress.rewardLog = Array.isArray(dailyProgress.rewardLog) ? dailyProgress.rewardLog : [];
        dailyProgress.rewardLog.push({
            id: task.id,
            reward: Number(task.reward || 0),
            mode: mode || 'single',
            at: Date.now()
        });
        dailyProgress.rewardLog = dailyProgress.rewardLog.slice(-30);
    }

    claimDailyQuest = function(taskId) {
        normalizeDailyProgress();
        if (questClaimLocks.has(taskId)) return;
        questClaimLocks.add(taskId);
        try {
            const task = getDailyQuestDefinitions().find(item => item.id === taskId);
            if (!task) return;
            dailyProgress.claimed = uniqueArray(dailyProgress.claimed);
            if (!isDailyQuestDone(task)) {
                playSound('wrong');
                showFoodToast('Задание ещё не готово 🙂');
                return;
            }
            if (dailyProgress.claimed.includes(task.id)) {
                showFoodToast('Эта награда уже получена ✅');
                renderTasks();
                return;
            }
            coins += Number(task.reward || 0);
            dailyProgress.claimed.push(task.id);
            dailyProgress.claimed = uniqueArray(dailyProgress.claimed);
            dailyProgress.claimedAt[task.id] = Date.now();
            addRewardLog(task, 'single');
            saveProgress();
            updateCoinsViews();
            playSound('coin');
            showFoodToast(`Задание выполнено: +${task.reward} 🪙`);
            renderTasks();
        } finally {
            questClaimLocks.delete(taskId);
        }
    };

    claimAllDailyQuests = function() {
        normalizeDailyProgress();
        if (questClaimLocks.has('__all__')) return;
        questClaimLocks.add('__all__');
        try {
            dailyProgress.claimed = uniqueArray(dailyProgress.claimed);
            const tasks = getDailyQuestDefinitions();
            const ready = tasks.filter(task => isDailyQuestDone(task) && !dailyProgress.claimed.includes(task.id));
            if (!ready.length) {
                showFoodToast('Пока нет готовых наград 🙂');
                renderTasks();
                return;
            }
            const reward = ready.reduce((sum, task) => sum + Number(task.reward || 0), 0);
            coins += reward;
            ready.forEach(task => {
                dailyProgress.claimed.push(task.id);
                dailyProgress.claimedAt[task.id] = Date.now();
                addRewardLog(task, 'bulk');
            });
            dailyProgress.claimed = uniqueArray(dailyProgress.claimed);
            saveProgress();
            updateCoinsViews();
            playSound('coin');
            showFoodToast(`Все готовые задания: +${reward} 🪙`);
            renderTasks();
        } finally {
            questClaimLocks.delete('__all__');
        }
    };

    function insertRewardQaCard(tasks) {
        if (!tasksList || tasksList.querySelector('.task-qa-card')) return;
        const doneCount = tasks.filter(isDailyQuestDone).length;
        const claimedCount = tasks.filter(isDailyQuestClaimed).length;
        const claimableCount = tasks.filter(task => isDailyQuestDone(task) && !isDailyQuestClaimed(task)).length;
        const stats = getQuestStats(tasks);
        const card = document.createElement('div');
        card.className = 'task-qa-card';
        card.innerHTML = `
            <div class="task-qa-top">
                <div>
                    <div class="task-qa-title">🧪 Проверка наград</div>
                    <div class="task-qa-desc">Прогресс, готовые награды и защита от двойного получения за сегодня.</div>
                </div>
                <div class="task-qa-badge">${claimedCount}/${tasks.length} получено</div>
            </div>
            <div class="task-qa-grid">
                <div class="task-qa-stat">Готово к claim<strong>${claimableCount} заданий</strong></div>
                <div class="task-qa-stat">Можно забрать<strong>+${stats.claimableReward} 🪙</strong></div>
                <div class="task-qa-stat">Уже получено<strong>+${stats.claimedReward}/${stats.totalReward} 🪙</strong></div>
            </div>
        `;
        const first = tasksList.querySelector('.task-summary-card');
        if (first && first.nextSibling) tasksList.insertBefore(card, first.nextSibling);
        else if (first) tasksList.appendChild(card);
        else tasksList.prepend(card);
    }

    function annotateQuestCards(tasks) {
        const cards = [...tasksList.querySelectorAll('.quest-card')];
        cards.forEach((card, index) => {
            const task = tasks[index];
            if (!task) return;
            const reward = card.querySelector('.quest-reward');
            if (!reward || reward.querySelector('.quest-status-mini')) return;
            const done = isDailyQuestDone(task);
            const claimed = isDailyQuestClaimed(task);
            const pill = document.createElement('span');
            pill.className = 'quest-status-mini' + (claimed ? ' done' : done ? ' ready' : '');
            pill.textContent = claimed ? 'получено' : done ? 'готово' : 'в процессе';
            reward.appendChild(pill);
        });
    }

    const previousRenderTasks = renderTasks;
    renderTasks = function() {
        normalizeDailyProgress();
        previousRenderTasks();
        const tasks = getDailyQuestDefinitions();
        insertRewardQaCard(tasks);
        annotateQuestCards(tasks);
    };

    // Count completed Shadow level as one played mini-game only once per day+level.
    if (typeof showShadowCelebration === 'function') {
        const previousShowShadowCelebration = showShadowCelebration;
        showShadowCelebration = function() {
            try {
                normalizeDailyProgress();
                const key = `${getTodayKey()}:shadow:${shadowLevelIndex}`;
                dailyProgress.playEventKeys = uniqueArray(dailyProgress.playEventKeys);
                if (!dailyProgress.playEventKeys.includes(key)) {
                    dailyProgress.playEventKeys.push(key);
                    saveProgress();
                    updateTaskProgress('play', 1);
                }
            } catch (e) {}
            return previousShowShadowCelebration.apply(this, arguments);
        };
    }
})();

// Unlock status polish.
(function(){
  function currentCoins(){ return Number(coins || 0); }
  function clampPercent(value){ return Math.max(0, Math.min(100, Math.round(value))); }
  function shortage(price){ return Math.max(0, Number(price || 0) - currentCoins()); }
  function progressPercent(price){
    const p = Number(price || 0);
    if (p <= 0) return 100;
    return clampPercent((currentCoins() / p) * 100);
  }
  function unlockStatus(price, done){
    if (done) return { cls:'done', title:'✅ Открыто', need:'Готово', hint:'Этот контент уже доступен.' };
    const missing = shortage(price);
    if (missing <= 0) return { cls:'ready', title:'🟢 Можно открыть', need:`${price} 🪙`, hint:'Монет хватает — можно открыть сейчас.' };
    return { cls:'', title:'🔒 Пока закрыто', need:`Не хватает ${missing} 🪙`, hint:`Собери ещё ${missing} монет через задания и мини-игры.` };
  }
  function createUnlockCard(price, done){
    const st = unlockStatus(price, done);
    const card = document.createElement('div');
    card.className = ['unlock-polish-card', st.cls].filter(Boolean).join(' ');
    card.innerHTML = `
      <div class="unlock-polish-row">
        <span class="unlock-polish-title">${st.title}</span>
        <span class="unlock-polish-need">${st.need}</span>
      </div>
      <div class="unlock-polish-bar"><div class="unlock-polish-fill" style="width:${progressPercent(price)}%"></div></div>
      <div class="unlock-polish-hint">${st.hint}</div>
    `;
    return card;
  }
  function removeOldCards(root){
    if (!root) return;
    root.querySelectorAll('.unlock-polish-card').forEach(el => el.remove());
  }
  function getAnimalIndex(key){
    try { return Array.from(new Set(animalKeys.concat(['parrot']))).indexOf(key); } catch(e) { return -1; }
  }
  function enhancePets(){
    if (!petsList || typeof getPetUnlockMeta !== 'function') return;
    Array.from(new Set(animalKeys.concat(['parrot']))).forEach((key) => {
      const card = document.getElementById(`petCard_${key}`);
      if (!card) return;
      removeOldCards(card);
      const info = card.querySelector('.pet-content > div:last-child') || card;
      const idx = getAnimalIndex(key);
      const meta = getPetUnlockMeta(key, idx < 0 ? 0 : idx);
      const isUnlocked = albumUnlocked.includes(key);
      const polish = createUnlockCard(meta.price, isUnlocked);
      if (!isUnlocked) {
        const missing = shortage(meta.price);
        const btn = card.querySelector('.pet-buy-btn');
        if (btn) {
          btn.textContent = missing <= 0 ? `Открыть за ${meta.price} 🪙` : `Не хватает ${missing} 🪙`;
          btn.disabled = false;
        }
      }
      info.appendChild(polish);
    });
  }
  function enhanceFoodRail(container){
    if (!container) return;
    container.querySelectorAll('.food-chip').forEach(chip => {
      if (!chip || chip.classList.contains('unlocked')) return;
      removeOldCards(chip);
      const price = Number(chip.dataset.price || 0);
      const missing = shortage(price);
      const priceEl = chip.querySelector('.food-price');
      if (priceEl) {
        priceEl.textContent = missing <= 0 ? `Открыть за ${price} 🪙` : `Ещё ${missing} 🪙`;
        priceEl.title = missing <= 0 ? `Монет хватает: открой за ${price} 🪙` : `Не хватает ${missing} 🪙`;
      }
      chip.classList.toggle('can-buy-now', missing <= 0);
      chip.classList.toggle('need-more-coins', missing > 0);
    });
  }
  function enhancePuzzleStages(){
    if (!puzzleStageRow) return;
    puzzleStageRow.querySelectorAll('.puzzle-stage-btn.locked').forEach(btn => {
      removeOldCards(btn);
      const text = btn.textContent || '';
      const match = text.match(/(\d+)\s*🪙/);
      const price = match ? Number(match[1]) : 0;
      if (price) btn.appendChild(createUnlockCard(price, false));
    });
  }
  function enhancePuzzleImages(){
    if (!puzzleImageRail) return;
    puzzleImageRail.querySelectorAll('.puzzle-image-choice.locked').forEach(btn => {
      removeOldCards(btn);
      const priceEl = btn.querySelector('.puzzle-choice-price');
      const match = priceEl ? (priceEl.textContent || '').match(/(\d+)/) : null;
      const price = match ? Number(match[1]) : 0;
      if (price && priceEl) {
        const missing = shortage(price);
        priceEl.textContent = missing <= 0 ? `Открыть за ${price} 🪙` : `Ещё ${missing} 🪙`;
        priceEl.title = missing <= 0 ? `Монет хватает: можно открыть пазл` : `Не хватает ${missing} 🪙`;
        btn.classList.toggle('can-buy-now', missing <= 0);
        btn.classList.toggle('need-more-coins', missing > 0);
      }
    });
  }
  function showNeedToast(kind, price){
    const missing = shortage(price);
    const text = missing > 0 ? `Не хватает ${missing} 🪙. Выполни задания или сыграй мини-игру.` : `Монет хватает: можно открыть за ${price} 🪙`;
    if (kind === 'food' && typeof showFoodToast === 'function') showFoodToast(text);
    else if (kind === 'pet' && typeof showPetRoomToast === 'function') showPetRoomToast(text);
    else if (kind === 'puzzle' && typeof showPuzzleMessage === 'function') showPuzzleMessage(text);
    else if (typeof showRewardToast === 'function') showRewardToast(text);
  }
  const originalRenderPets = renderPets;
  renderPets = function(){
    originalRenderPets();
    enhancePets();
  };
  const originalRenderFoodRailInto = renderFoodRailInto;
  renderFoodRailInto = function(container, source){
    originalRenderFoodRailInto(container, source);
    enhanceFoodRail(container);
  };
  const originalRenderPuzzleStages = renderPuzzleStages;
  renderPuzzleStages = function(){
    originalRenderPuzzleStages();
    enhancePuzzleStages();
  };
  const originalRenderPuzzleImageRail = renderPuzzleImageRail;
  renderPuzzleImageRail = function(){
    originalRenderPuzzleImageRail();
    enhancePuzzleImages();
  };
  const originalBuyPet = buyPet;
  buyPet = function(key, price){
    if (!albumUnlocked.includes(key) && shortage(price) > 0) {
      playSound('wrong');
      showNeedToast('pet', price);
      enhancePets();
      return;
    }
    originalBuyPet(key, price);
    enhancePets();
  };
  const originalBuyFood = buyFood;
  buyFood = function(foodId){
    const food = foodCatalog.find(item => item.id === foodId);
    if (food && !unlockedFoods.includes(food.id) && shortage(food.price) > 0) {
      playSound('wrong');
      showNeedToast('food', food.price);
      enhanceFoodRail(foodRail);
      enhanceFoodRail(petRoomFoodRail);
      return;
    }
    originalBuyFood(foodId);
    enhanceFoodRail(foodRail);
    enhanceFoodRail(petRoomFoodRail);
  };
  const originalBuyPuzzleStage = buyPuzzleStage;
  buyPuzzleStage = function(stageId){
    const stage = getPuzzleStageById(stageId);
    if (stage && !isPuzzleStageUnlocked(stage.id) && shortage(stage.unlockPrice) > 0) {
      playSound('wrong');
      showNeedToast('puzzle', stage.unlockPrice);
      enhancePuzzleStages();
      return;
    }
    originalBuyPuzzleStage(stageId);
    enhancePuzzleStages();
  };
  const originalBuyPuzzleImage = buyPuzzleImage;
  buyPuzzleImage = function(id){
    const item = puzzleImageCatalog.find(entry => entry.key === id);
    if (item && !unlockedPuzzleImages.includes(id) && shortage(item.price) > 0) {
      playSound('wrong');
      showNeedToast('puzzle', item.price);
      enhancePuzzleImages();
      return;
    }
    originalBuyPuzzleImage(id);
    enhancePuzzleImages();
  };
  const originalUpdateCoinsViews = updateCoinsViews;
  updateCoinsViews = function(){
    originalUpdateCoinsViews();
    try { enhancePets(); } catch(e) {}
    try { enhanceFoodRail(foodRail); enhanceFoodRail(petRoomFoodRail); } catch(e) {}
    try { enhancePuzzleStages(); enhancePuzzleImages(); } catch(e) {}
  };
  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function(){
      try { enhancePets(); } catch(e) {}
      try { enhanceFoodRail(foodRail); enhanceFoodRail(petRoomFoodRail); } catch(e) {}
      try { enhancePuzzleStages(); enhancePuzzleImages(); } catch(e) {}
    }, 600);
  });
})();

// Economy balance, purchase confirmation, rewarded ads mock.
(function(){
  const PRICE_MULTIPLIER = 3;  // Stage 4.1: was 5 — pets feel achievable faster
  const AD_SECONDS = 30;
  const AD_VIEWS_REQUIRED = 2;
  const AD_COIN_REWARD = 120;
  const AD_HINT_REWARD = 2;
  const AD_DAILY_LIMITS = { coins: 3, hints: 2 };
  const AD_STATE_KEY = 'zooRewardedAdStateV1';
  const HINT_KEY = 'zooHintTickets';

  window.halfReward = function halfReward(value) {
    // Kept only for legacy call sites. Stage 4.1 no longer applies it to daily tasks, achievements, daily gift, Zoo Block, or Shadow.
    return Math.max(1, Math.ceil((Number(value) || 0) / 2));
  };

  function todayKeySafe(){ try { return getTodayKey(); } catch(e) { return new Date().toISOString().slice(0,10); } }
  function num(v){ return Number(v || 0) || 0; }
  function priceMissing(price){ return Math.max(0, Number(price || 0) - Number(coins || 0)); }
  function formatCoins(v){ return `${Number(v || 0)} 🪙`; }
  function playClick(){ try { playSound('click'); } catch(e) {} }
  function playWrong(){ try { playSound('wrong'); } catch(e) {} }
  function playCoin(){ try { playSound('coin'); } catch(e) {} }

  function scalePriceObject(item, field){
    if (!item || item.__stage616Scaled || !(Number(item[field]) > 0)) return;
    item.__stage616OriginalPrice = Number(item[field]);
    item[field] = Math.ceil(Number(item[field]) * PRICE_MULTIPLIER);
  }

  function scaleStaticEconomy(){
    try { skins.forEach(item => scalePriceObject(item, 'price')); } catch(e) {}
    try { foodCatalog.forEach(item => scalePriceObject(item, 'price')); } catch(e) {}
    try { puzzleStages.forEach(item => scalePriceObject(item, 'unlockPrice')); } catch(e) {}
    try { puzzleImageCatalog.forEach(item => scalePriceObject(item, 'price')); } catch(e) {}
    try { coloringTemplatesCatalog.forEach(item => scalePriceObject(item, 'price')); } catch(e) {}
    try { achievementCatalog.forEach(item => { if (!item.__stage616RewardScaled) { item.__stage616OriginalReward = Number(item.reward || 0); /* Stage 4.1: achievements now keep full reward. */ item.__stage616RewardScaled = true; } }); } catch(e) {}
  }

  scaleStaticEconomy();

  const previousGetPetUnlockMeta616 = typeof getPetUnlockMeta === 'function' ? getPetUnlockMeta : null;
  if (previousGetPetUnlockMeta616) {
    window.getPetUnlockMeta = getPetUnlockMeta = function(key, index){
      const meta = previousGetPetUnlockMeta616(key, index);
      if (meta && !meta.__stage616Scaled) {
        meta.__stage616OriginalPrice = Number(meta.price || 0);
        meta.price = meta.price > 0 ? Math.ceil(meta.price * PRICE_MULTIPLIER) : meta.price;
        meta.__stage616Scaled = true;
      }
      return meta;
    };
  }

  const previousGetDailyQuestDefinitions616 = typeof getDailyQuestDefinitions === 'function' ? getDailyQuestDefinitions : null;
  if (previousGetDailyQuestDefinitions616) {
    window.getDailyQuestDefinitions = getDailyQuestDefinitions = function(){
      const list = previousGetDailyQuestDefinitions616().map(task => ({ ...task }));
      list.forEach(task => {
        if (!task.__stage616RewardScaled) {
          task.__stage616OriginalReward = Number(task.reward || 0);
          // Stage 4.1: daily tasks now pay full reward. Do not halfReward here.
          task.__stage616RewardScaled = true;
        }
      });
      return list;
    };
  }

  function ensurePurchaseConfirmStyles(){
    if (document.getElementById('purchaseConfirmModalStyles')) return;
    const style = document.createElement('style');
    style.id = 'purchaseConfirmModalStyles';
    style.textContent = `
      .purchase-confirm-overlay {
        position: fixed;
        inset: 0;
        z-index: 2650;
        display: none;
        align-items: center;
        justify-content: center;
        padding: max(16px, env(safe-area-inset-top)) 16px max(16px, env(safe-area-inset-bottom));
        background: rgba(15, 23, 42, .44);
        pointer-events: none;
      }
      .purchase-confirm-overlay.show {
        display: flex !important;
        pointer-events: auto !important;
      }
      .purchase-confirm-card {
        width: min(92vw, 410px);
        max-height: calc(100vh - 36px);
        overflow: auto;
        border-radius: 32px;
        padding: 22px 20px 18px;
        text-align: center;
        background: linear-gradient(180deg, #ffffff, #fff7ed 58%, #ecfdf5);
        color: #1f2937;
        border: 4px solid rgba(255, 255, 255, .92);
        box-shadow: 0 24px 70px rgba(15, 23, 42, .30);
        transform: translateZ(0);
        animation: purchaseConfirmPop .22s ease-out;
      }
      .purchase-confirm-icon {
        width: 68px;
        height: 68px;
        margin: 0 auto 10px;
        display: grid;
        place-items: center;
        border-radius: 24px;
        background: linear-gradient(135deg, #fef3c7, #bbf7d0, #bfdbfe);
        font-size: 36px;
        box-shadow: 0 7px 0 rgba(124, 58, 237, .14);
      }
      .purchase-confirm-title {
        margin: 2px 0 8px;
        color: #4c1d95;
        font-size: 24px;
        line-height: 1.12;
        font-weight: 1000;
      }
      .purchase-confirm-text {
        margin: 0 auto 10px;
        color: #334155;
        font-size: 16px;
        line-height: 1.35;
        font-weight: 800;
      }
      .purchase-confirm-price {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 34px;
        margin: 0 auto 14px;
        padding: 7px 13px;
        border-radius: 999px;
        color: #166534;
        background: linear-gradient(180deg, #dcfce7, #bbf7d0);
        font-weight: 1000;
        box-shadow: inset 0 0 0 2px rgba(255,255,255,.66);
      }
      .purchase-confirm-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        align-items: stretch;
      }
      .purchase-confirm-actions .btn {
        width: 100%;
        touch-action: manipulation;
        min-height: 50px;
        margin: 0;
        white-space: normal;
        line-height: 1.15;
      }
      @keyframes purchaseConfirmPop {
        from { opacity: 0; transform: scale(.92) translateY(8px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      @media (max-width: 520px) {
        .purchase-confirm-card { width: min(94vw, 360px); padding: 18px 16px 16px; border-radius: 28px; }
        .purchase-confirm-title { font-size: 21px; }
        .purchase-confirm-text { font-size: 14px; }
        .purchase-confirm-actions { grid-template-columns: 1fr; }
      }
      body.low-performance .purchase-confirm-overlay {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background: rgba(15, 23, 42, .38);
      }
      body.low-performance .purchase-confirm-card {
        box-shadow: 0 14px 36px rgba(15, 23, 42, .22);
        animation: none;
      }
      body.zoo-modal-open #guideFab {
        pointer-events: none !important;
        opacity: .42;
      }
    `;
    document.head.appendChild(style);
  }

  function applyOverlayFailsafe(overlay, isOpen){
    if (!overlay) return;
    overlay.dataset.zooModalOverlay = 'true';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '2147482600';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.padding = 'max(16px, env(safe-area-inset-top)) 16px max(16px, env(safe-area-inset-bottom))';
    overlay.style.background = 'rgba(15, 23, 42, .44)';
    overlay.style.overscrollBehavior = 'contain';
    overlay.style.touchAction = 'manipulation';
    overlay.style.display = isOpen ? 'flex' : 'none';
    overlay.style.pointerEvents = isOpen ? 'auto' : 'none';
    if (document && document.body) document.body.classList.toggle('zoo-modal-open', !!isOpen);
  }

  function applyPurchaseCardFailsafe(card){
    if (!card) return;
    card.style.maxWidth = '410px';
    card.style.width = 'min(92vw, 410px)';
    card.style.maxHeight = 'calc(100vh - 36px)';
    card.style.overflow = 'auto';
    card.style.boxSizing = 'border-box';
  }

  function ensurePurchaseConfirmOverlay(){
    ensurePurchaseConfirmStyles();
    let overlay = document.getElementById('purchaseConfirmOverlay');
    if (overlay) {
      overlay.classList.add('purchase-confirm-overlay');
      applyOverlayFailsafe(overlay, overlay.classList.contains('show'));
      applyPurchaseCardFailsafe(overlay.querySelector('.purchase-confirm-card'));
      return overlay;
    }
    overlay = document.createElement('div');
    overlay.id = 'purchaseConfirmOverlay';
    overlay.className = 'purchase-confirm-overlay';
    overlay.dataset.zooModalOverlay = 'true';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="purchase-confirm-card">
        <div class="purchase-confirm-icon" id="purchaseConfirmIcon">🛒</div>
        <div class="purchase-confirm-title" id="purchaseConfirmTitle">Купить?</div>
        <div class="purchase-confirm-text" id="purchaseConfirmText">Списать монеты и открыть предмет?</div>
        <div class="purchase-confirm-price" id="purchaseConfirmPrice">0 🪙</div>
        <div class="purchase-confirm-actions">
          <button id="purchaseConfirmNo" type="button" class="btn btn-light">Не купить</button>
          <button id="purchaseConfirmYes" type="button" class="btn btn-green">Купить</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    applyOverlayFailsafe(overlay, false);
    applyPurchaseCardFailsafe(overlay.querySelector('.purchase-confirm-card'));
    return overlay;
  }

  function showPurchaseConfirm(options){
    options = options || {};
    const price = Number(options.price || 0);
    if (price <= 0 && options.forceDialog !== true) { options.onConfirm && options.onConfirm(); return; }
    const overlay = ensurePurchaseConfirmOverlay();
    const icon = document.getElementById('purchaseConfirmIcon');
    const title = document.getElementById('purchaseConfirmTitle');
    const text = document.getElementById('purchaseConfirmText');
    const priceBox = document.getElementById('purchaseConfirmPrice');
    const yes = document.getElementById('purchaseConfirmYes');
    const no = document.getElementById('purchaseConfirmNo');
    const card = overlay ? overlay.querySelector('.purchase-confirm-card') : null;
    applyPurchaseCardFailsafe(card);
    if (icon) icon.textContent = options.icon || '🛒';
    if (title) title.textContent = options.title || 'Купить?';
    if (text) text.textContent = options.text || `Списать ${price} монет и открыть предмет?`;
    if (priceBox) priceBox.textContent = price > 0 ? `Списать ${formatCoins(price)}` : 'Бесплатно';
    if (yes) yes.textContent = price > 0 ? `Купить за ${price} 🪙` : 'Продолжить';
    if (no) no.textContent = 'Не купить';

    let closed = false;
    function cleanupHandlers(){
      document.removeEventListener('keydown', onKeyDown, true);
    }
    function closePurchaseConfirm(){
      closed = true;
      if (overlay) {
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
        applyOverlayFailsafe(overlay, false);
      }
      cleanupHandlers();
    }
    function confirmPurchase(event){
      if (event) { event.preventDefault(); event.stopPropagation(); }
      if (closed) return;
      const missing = priceMissing(price);
      if (missing > 0) {
        closePurchaseConfirm();
        playWrong();
        showFoodToast(`Не хватает ${missing} 🪙`);
        return;
      }
      closePurchaseConfirm();
      options.onConfirm && options.onConfirm();
    }
    function cancelPurchase(event){
      if (event) { event.preventDefault(); event.stopPropagation(); }
      if (closed) return;
      closePurchaseConfirm();
      playClick();
    }
    function onKeyDown(event){
      if (event.key === 'Escape' && overlay && overlay.classList.contains('show')) cancelPurchase(event);
    }

    if (yes) {
      yes.onclick = confirmPurchase;
      yes.onpointerup = null;
      yes.ontouchend = null;
    }
    if (no) {
      no.onclick = cancelPurchase;
      no.onpointerup = null;
      no.ontouchend = null;
    }
    if (overlay) {
      overlay.onclick = (e) => { if (e.target === overlay) cancelPurchase(e); };
      overlay.setAttribute('aria-hidden', 'false');
      applyOverlayFailsafe(overlay, true);
      overlay.classList.add('show');
      document.addEventListener('keydown', onKeyDown, true);
    }
    playClick();
    setTimeout(() => { try { no && no.focus(); } catch(e) {} }, 20);
  }
  window.showPurchaseConfirm = showPurchaseConfirm;
  window.closePurchaseConfirm = function(){
    const overlay = document.getElementById('purchaseConfirmOverlay');
    if (overlay) {
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden', 'true');
      applyOverlayFailsafe(overlay, false);
    }
  };

  window.buyFood = buyFood = function(foodId){
    const food = foodCatalog.find(item => item.id === foodId);
    if (!food) return;
    if (unlockedFoods.includes(food.id)) { showFoodToast(`${food.label} уже открыта ✅`); return; }
    const missing = priceMissing(food.price);
    if (missing > 0) { playWrong(); showFoodToast(`Не хватает ${missing} 🪙`); return; }
    showPurchaseConfirm({
      icon: food.emoji || '🍎',
      title: `Купить ${food.label}?`,
      text: `Списать ${food.price} монет и открыть ${food.label.toLowerCase()}?`,
      price: food.price,
      onConfirm: () => {
        if (priceMissing(food.price) > 0 || unlockedFoods.includes(food.id)) return;
        coins -= food.price;
        unlockedFoods.push(food.id);
        unlockedFoods = Array.from(new Set(unlockedFoods));
        saveProgress(); updateCoinsViews(); renderFoodRail(); renderPetRoomFoodRail(); playCoin();
        showFoodToast(`${food.label} открыта! ${food.emoji}`);
      }
    });
  };

  window.buyPet = buyPet = function(key, price){
    const actualPrice = Number(price || (getPetUnlockMeta ? getPetUnlockMeta(key, 0).price : 0));
    if (albumUnlocked.includes(key)) { showPetRoomToast('Этот питомец уже открыт ✅'); return; }
    const missing = priceMissing(actualPrice);
    if (missing > 0) { playWrong(); showPetRoomToast(`Не хватает ${missing} 🪙`); return; }
    const name = animalInfo[key]?.name || key;
    showPurchaseConfirm({
      icon: '🐾', title: `Купить питомца?`,
      text: `Списать ${actualPrice} монет и открыть питомца «${name}»?`,
      price: actualPrice,
      onConfirm: () => {
        if (priceMissing(actualPrice) > 0 || albumUnlocked.includes(key)) return;
        coins -= actualPrice;
        albumUnlocked.push(key);
        albumUnlocked = Array.from(new Set(albumUnlocked));
        selectedMainPetKey = key; selectedPetKey = key; playerProfile.favorite = key;
        saveProgress(); updateCoinsViews(); renderPets(); playCoin();
        showPetRoomToast(`${name} теперь твой питомец! 🐾`);
      }
    });
  };

  window.buyPuzzleStage = buyPuzzleStage = function(stageId){
    const stage = getPuzzleStageById(stageId);
    const previous = puzzleStages[puzzleStages.findIndex(item => item.id === stage.id) - 1];
    if (previous && !isPuzzleStageUnlocked(previous.id)) { showPuzzleMessage(`Сначала открой предыдущий этап ${previous.short} 🔒`); playWrong(); return; }
    if (isPuzzleStageUnlocked(stage.id)) { setPuzzleStage(stage.id); return; }
    const missing = priceMissing(stage.unlockPrice);
    if (missing > 0) { showPuzzleMessage(`Не хватает ${missing} 🪙`); playWrong(); return; }
    showPurchaseConfirm({
      icon:'🧩', title:`Открыть ${stage.label}?`,
      text:`Списать ${stage.unlockPrice} монет и открыть этап ${stage.short}?`,
      price:stage.unlockPrice,
      onConfirm:()=>{
        if (priceMissing(stage.unlockPrice) > 0 || isPuzzleStageUnlocked(stage.id)) return;
        coins -= stage.unlockPrice;
        maxUnlockedPuzzleStage = Math.max(maxUnlockedPuzzleStage, stage.id);
        applyPuzzleStage(stage, true);
        saveProgress(); updateCoinsViews(); renderPuzzleStages(); playCoin();
        showPuzzleMessage(`${stage.label} открыт! Теперь доступен пазл ${stage.short} 🧩`);
      }
    });
  };

  window.buyPuzzleImage = buyPuzzleImage = function(id){
    const item = puzzleImageCatalog.find(entry => entry.key === id);
    if (!item) return;
    if (unlockedPuzzleImages.includes(id)) { setPuzzleImage(item.key, item.label, animalImageSrc(item.key)); return; }
    const missing = priceMissing(item.price);
    if (missing > 0) { showPuzzleMessage(`Не хватает ${missing} 🪙`); playWrong(); return; }
    showPurchaseConfirm({
      icon:'🖼️', title:`Купить картинку?`,
      text:`Списать ${item.price} монет и открыть пазл «${item.label}»?`,
      price:item.price,
      onConfirm:()=>{
        if (priceMissing(item.price) > 0 || unlockedPuzzleImages.includes(id)) return;
        coins -= item.price;
        unlockedPuzzleImages.push(id);
        unlockedPuzzleImages = Array.from(new Set(unlockedPuzzleImages));
        puzzleCurrentImage = { id: item.key, label: item.label, src: animalImageSrc(item.key) };
        buildPuzzlePieces(); shufflePuzzle(false); saveProgress(); updateCoinsViews(); renderPuzzleImageRail(); playCoin();
        showPuzzleMessage(`Пазл «${item.label}» открыт! ${item.price}🪙 списано`);
      }
    });
  };

  window.purchaseColoringTemplate = purchaseColoringTemplate = function(id){
    const item = coloringTemplatesCatalog.find(template => template.id === id);
    if (!item) return;
    if (isColoringTemplateUnlocked(id)) { selectColoringTemplate(id); return; }
    const missing = priceMissing(item.price);
    if (missing > 0) { playWrong(); updateColoringHint(guideT(`Не хватает ${missing} монет для открытия этой раскраски 😿`, `Need ${missing} more coins to unlock this coloring page 😿`)); return; }
    showPurchaseConfirm({
      icon:item.emoji || '🎨', title:'Купить раскраску?',
      text:`Списать ${item.price} монет и открыть «${item.title}»?`,
      price:item.price,
      onConfirm:()=>{
        if (priceMissing(item.price) > 0 || isColoringTemplateUnlocked(id)) return;
        coins -= item.price;
        coloringUnlockedTemplates.push(id);
        coloringUnlockedTemplates = Array.from(new Set(coloringUnlockedTemplates));
        coloringCurrentTemplateId = id;
        saveProgress(); updateCoinsViews(); renderColoringTemplates(); resetColoringCanvasBase(); redrawColoringOutline(); updateColoringBadge(); playCoin();
        updateColoringHint(guideT('Новая раскраска куплена! Выбери цвет и нажми на область 🌈', 'New coloring page unlocked! Pick a color and tap an area 🌈'));
      }
    });
  };

  window.renderShop = renderShop = function(){
    updateCoinsViews();
    shopGrid.innerHTML = '';
    skins.forEach(skin => {
      const isUnlocked = unlockedSkins.includes(skin.id);
      const isSelected = selectedSkin === skin.id;
      const item = document.createElement('div');
      item.className = 'skin-item';
      const preview = document.createElement('div');
      preview.className = `skin-preview skin-preview--${skin.id}`;
      preview.textContent = '★';
      const info = document.createElement('div');
      const title = document.createElement('div');
      title.className = 'skin-title';
      title.textContent = skin.title;
      const price = document.createElement('div');
      price.className = 'skin-price';
      price.textContent = skin.price === 0 ? 'Бесплатно' : `${skin.price} монет`;
      const button = document.createElement('button');
      button.className = isSelected ? 'btn btn-green' : 'btn btn-blue';
      if (isSelected) {
        button.textContent = 'Выбран';
      } else if (isUnlocked) {
        button.textContent = 'Выбрать';
        button.onclick = () => { selectedSkin = skin.id; applySkin(); saveProgress(); playClick(); renderShop(); };
      } else {
        const missing = priceMissing(skin.price);
        button.textContent = missing <= 0 ? `Купить за ${skin.price} 🪙` : `Не хватает ${missing} 🪙`;
        button.onclick = () => {
          if (priceMissing(skin.price) > 0) { playWrong(); showFoodToast(`Не хватает ${priceMissing(skin.price)} 🪙`); return; }
          showPurchaseConfirm({
            icon:'🎨', title:'Купить скин?',
            text:`Списать ${skin.price} монет и купить скин «${skin.title}»?`,
            price:skin.price,
            onConfirm:()=>{
              if (priceMissing(skin.price) > 0 || unlockedSkins.includes(skin.id)) return;
              coins -= skin.price;
              unlockedSkins.push(skin.id);
              unlockedSkins = Array.from(new Set(unlockedSkins));
              selectedSkin = skin.id;
              applySkin(); saveProgress(); updateCoinsViews(); playCoin(); renderShop();
            }
          });
        };
      }
      info.appendChild(title); info.appendChild(price); info.appendChild(button);
      item.appendChild(preview); item.appendChild(info); shopGrid.appendChild(item);
    });
  };

  function getAdState(){
    let state = {};
    try { state = JSON.parse(safeStorage.get(AD_STATE_KEY, '{}') || '{}'); } catch(e) { state = {}; }
    const today = todayKeySafe();
    if (state.date !== today) state = { date: today, coins: 0, hints: 0 };
    state.coins = Number(state.coins || 0);
    state.hints = Number(state.hints || 0);
    return state;
  }
  function saveAdState(state){ safeStorage.set(AD_STATE_KEY, JSON.stringify(state)); }
  function getHintTickets(){ return Number(safeStorage.get(HINT_KEY, '0') || '0'); }
  function setHintTickets(value){ safeStorage.set(HINT_KEY, String(Math.max(0, Number(value || 0)))); }
  window.getHintTickets = getHintTickets;

  function applyRewardedAdFailsafe(overlay, isOpen){
    if (!overlay) return;
    overlay.dataset.zooModalOverlay = 'true';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '2147482550';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.padding = 'max(16px, env(safe-area-inset-top)) 16px max(16px, env(safe-area-inset-bottom))';
    overlay.style.display = isOpen ? 'flex' : 'none';
    overlay.style.pointerEvents = isOpen ? 'auto' : 'none';
    if (document && document.body) document.body.classList.toggle('zoo-modal-open', !!isOpen);
  }

  function ensureRewardedAdOverlay(){
    let overlay = document.getElementById('rewardedAdOverlay');
    if (overlay) {
      overlay.classList.add('rewarded-ad-overlay');
      applyRewardedAdFailsafe(overlay, overlay.classList.contains('show'));
      return overlay;
    }
    overlay = document.createElement('div');
    overlay.id = 'rewardedAdOverlay';
    overlay.className = 'rewarded-ad-overlay';
    overlay.dataset.zooModalOverlay = 'true';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <div class="rewarded-ad-card">
        <div class="rewarded-ad-icon" id="rewardedAdIcon">🎬</div>
        <div class="rewarded-ad-title" id="rewardedAdTitle">Реклама с наградой</div>
        <div class="rewarded-ad-text" id="rewardedAdText">Посмотри 2 рекламы по 30 секунд, чтобы получить бонус.</div>
        <div class="rewarded-ad-progress"><div id="rewardedAdFill" class="rewarded-ad-fill"></div></div>
        <div class="rewarded-ad-actions single" id="rewardedAdActions">
          <button id="rewardedAdActionBtn" type="button" class="btn btn-green">Начать</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    applyRewardedAdFailsafe(overlay, false);
    return overlay;
  }

  function startRewardedAdPack(type){
    const state = getAdState();
    const limit = AD_DAILY_LIMITS[type] || 1;
    if (state[type] >= limit) { showFoodToast('Лимит рекламы на сегодня закончился 🙂'); playWrong(); return; }
    const overlay = ensureRewardedAdOverlay();
    const icon = document.getElementById('rewardedAdIcon');
    const title = document.getElementById('rewardedAdTitle');
    const text = document.getElementById('rewardedAdText');
    const fill = document.getElementById('rewardedAdFill');
    const btn = document.getElementById('rewardedAdActionBtn');
    let adIndex = 1;
    let secondsLeft = AD_SECONDS;
    let timer = null;
    const rewardText = type === 'coins' ? `+${AD_COIN_REWARD} монет` : `+${AD_HINT_REWARD} подсказки`;
    icon.textContent = type === 'coins' ? '🪙' : '💡';
    title.textContent = type === 'coins' ? 'Бонус монет' : 'Бонус подсказок';
    applyRewardedAdFailsafe(overlay, true);
    overlay.classList.add('show');
    function render(){
      text.textContent = `Реклама ${adIndex}/${AD_VIEWS_REQUIRED}: осталось ${secondsLeft} сек. Награда после двух роликов: ${rewardText}.`;
      const doneSeconds = ((adIndex - 1) * AD_SECONDS) + (AD_SECONDS - secondsLeft);
      const total = AD_SECONDS * AD_VIEWS_REQUIRED;
      fill.style.width = `${Math.max(0, Math.min(100, Math.round((doneSeconds / total) * 100)))}%`;
      btn.disabled = true;
      btn.textContent = `Смотреть... ${secondsLeft}`;
    }
    function finishOne(){
      clearInterval(timer);
      if (adIndex < AD_VIEWS_REQUIRED) {
        btn.disabled = false;
        btn.textContent = 'Смотреть вторую рекламу';
        text.textContent = `Первая реклама готова ✅ Осталась ещё одна по ${AD_SECONDS} сек.`;
        btn.onclick = () => { adIndex += 1; secondsLeft = AD_SECONDS; runTimer(); };
      } else {
        state[type] += 1;
        saveAdState(state);
        if (type === 'coins') {
          coins += AD_COIN_REWARD;
          saveProgress(); updateCoinsViews(); playCoin();
          showFoodToast(`Бонус рекламы: +${AD_COIN_REWARD} 🪙`);
        } else {
          setHintTickets(getHintTickets() + AD_HINT_REWARD);
          saveProgress(); playCoin();
          showFoodToast(`Бонус рекламы: +${AD_HINT_REWARD} подсказки 💡`);
        }
        fill.style.width = '100%';
        btn.disabled = false;
        btn.textContent = 'Забрать';
        text.textContent = `Готово! Награда: ${rewardText}.`;
        btn.onclick = () => { overlay.classList.remove('show'); applyRewardedAdFailsafe(overlay, false); renderAdBonusCard(); try { renderTasks(); } catch(e) {} };
      }
    }
    function runTimer(){
      playClick();
      btn.onclick = null;
      render();
      timer = setInterval(() => {
        secondsLeft -= 1;
        render();
        if (secondsLeft <= 0) finishOne();
      }, 1000);
    }
    btn.onclick = runTimer;
    btn.disabled = false;
    btn.textContent = 'Начать первую рекламу';
    text.textContent = `Нужно посмотреть 2 рекламы по ${AD_SECONDS} сек. Формат для Android: Rewarded Ad.`;
    fill.style.width = '0%';
    overlay.onclick = (e) => {
      if (e.target === overlay && !timer) { overlay.classList.remove('show'); applyRewardedAdFailsafe(overlay, false); }
    };
  }
  window.startRewardedAdPack = startRewardedAdPack;

  function renderAdBonusCard(){
    if (!tasksList) return;
    let old = document.getElementById('adBonusCard');
    if (old) old.remove();
    const state = getAdState();
    const hints = getHintTickets();
    const card = document.createElement('div');
    card.id = 'adBonusCard';
    card.className = 'ad-bonus-card';
    card.innerHTML = `
      <div class="ad-bonus-title">🎬 Бонус за рекламу</div>
      <div class="ad-bonus-text">Опционально: 2 рекламы по ${AD_SECONDS} сек. дают монеты или подсказки. В Android это будет Rewarded Ad через AdMob.</div>
      <div class="ad-bonus-actions">
        <button type="button" class="btn btn-green" ${state.coins >= AD_DAILY_LIMITS.coins ? 'disabled' : ''} onclick="startRewardedAdPack('coins')">🪙 +${AD_COIN_REWARD}</button>
        <button type="button" class="btn btn-purple" ${state.hints >= AD_DAILY_LIMITS.hints ? 'disabled' : ''} onclick="startRewardedAdPack('hints')">💡 +${AD_HINT_REWARD}</button>
      </div>
      <div class="ad-bonus-meta">Сегодня: монеты ${state.coins}/${AD_DAILY_LIMITS.coins}, подсказки ${state.hints}/${AD_DAILY_LIMITS.hints} · <span class="hint-ticket-chip">💡 ${hints} подсказок</span></div>
    `;
    const summary = tasksList.querySelector('.task-summary-card');
    if (summary && summary.nextSibling) tasksList.insertBefore(card, summary.nextSibling); else tasksList.prepend(card);
  }

  const previousRenderTasks616 = renderTasks;
  window.renderTasks = renderTasks = function(){
    previousRenderTasks616();
    renderAdBonusCard();
  };

  function requireHintTicket(onUse){
    const available = getHintTickets();
    if (available > 0) {
      setHintTickets(available - 1);
      onUse && onUse();
      try { renderTasks(); } catch(e) {}
      return true;
    }
    showPurchaseConfirm({
      icon:'💡', title:'Нужна подсказка?',
      text:`Подсказок нет. Можно получить ${AD_HINT_REWARD} подсказки за 2 рекламы по ${AD_SECONDS} сек.`,
      price:0,
      onConfirm:()=>startRewardedAdPack('hints')
    });
    return false;
  }

  const prevUseShadowHint616 = typeof useShadowHint === 'function' ? useShadowHint : null;
  if (prevUseShadowHint616) {
    window.useShadowHint = useShadowHint = function(){
      return requireHintTicket(() => prevUseShadowHint616());
    };
  }
  const prevShowPuzzleHint616 = typeof showPuzzleHint === 'function' ? showPuzzleHint : null;
  if (prevShowPuzzleHint616) {
    window.showPuzzleHint = showPuzzleHint = function(){
      return requireHintTicket(() => prevShowPuzzleHint616());
    };
  }
  const prevShowZooBlockHint616 = typeof showZooBlockHint === 'function' ? showZooBlockHint : null;
  if (prevShowZooBlockHint616) {
    window.showZooBlockHint = showZooBlockHint = function(){
      return requireHintTicket(() => prevShowZooBlockHint616());
    };
  }

  try { updateCoinsViews(); } catch(e) {}
})();

})();
