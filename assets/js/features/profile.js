// Feature module: Профиль игрока + Достижения.
// Extracted verbatim during the Stage 6.1.7 RESET architecture work — logic
// unchanged, only the location moved. Loaded on demand via loadScriptOnce.
//
// Note found during extraction: openAchievements()/achievementsScreen have
// no onclick or other call site anywhere in the app — this sub-feature
// appears to be orphaned (built, never wired into navigation, or the link
// was removed in an earlier patch). Left as-is, not deleted: removing a
// feature is a product decision, not an architecture one. Bundled here
// because it's textually/thematically adjacent to Profile and depends on
// nothing that isn't already shared.
//
// Depends on shared globals defined in index.html: playSound, showScreen,
// saveProgress, showFoodToast, updateCoinsViews, playerNameInput,
// profileAvatarPreview, avatarGrid, profileAvatars, playerProfile,
// favoriteAnimalSelect, albumUnlocked, animalInfo, profileStars, profileCoins,
// profileLevels, profileAnimals, levelStars, coins, maxUnlockedLevel,
// achievementsList, achievementCoins, achievementClaims, dailyProgress,
// animalFeedCount, rareUnlocked, petMoodMap.

const achievementCatalog = [
    { id: "pairs50", icon: "🧠", title: "Найди 50 пар", desc: "Тренируй память на разных уровнях.", target: 50, reward: 25, get: () => dailyProgress.pairs || 0 },
    { id: "levels10", icon: "🗺️", title: "Пройди 10 уровней", desc: "Открой первую большую часть зоопарка.", target: 10, reward: 40, get: () => maxUnlockedLevel },
    { id: "animals20", icon: "🐾", title: "Открой 20 животных", desc: "Собери большой альбом зверят.", target: 20, reward: 55, get: () => albumUnlocked.length },
    { id: "feed10", icon: "🥕", title: "Покорми 10 раз", desc: "Позаботься о своих питомцах.", target: 10, reward: 35, get: () => Object.values(animalFeedCount).reduce((a,b) => a + Number(b || 0), 0) },
    { id: "stars60", icon: "⭐", title: "Собери 60 звёзд", desc: "Проходи уровни аккуратно.", target: 60, reward: 70, get: () => Object.values(levelStars).reduce((a,b) => a + Number(b || 0), 0) },
    { id: "rare3", icon: "✨", title: "Открой 3 редких зверя", desc: "Редкие звери открываются на каждом 10 уровне.", target: 3, reward: 80, get: () => rareUnlocked.length },
    { id: "care5", icon: "🥰", title: "Погладь питомца 5 раз", desc: "Покажи зверятам заботу.", target: 5, reward: 30, get: () => Object.values(petMoodMap).reduce((a,p) => a + Number((p && p.care) || 0), 0) },
    { id: "play5", icon: "🎈", title: "Поиграй 5 раз", desc: "Мини-игры делают питомцев счастливее.", target: 5, reward: 30, get: () => Object.values(petMoodMap).reduce((a,p) => a + Number((p && p.played) || 0), 0) }
];

function openProfile() {
    playSound("click");
    renderProfile();
    showScreen("profileScreen");
}

function renderProfile() {
    playerNameInput.value = playerProfile.name || "";
    profileAvatarPreview.textContent = playerProfile.avatar || "🦁";

    avatarGrid.innerHTML = "";
    profileAvatars.forEach(avatar => {
        const btn = document.createElement("button");
        btn.className = avatar === playerProfile.avatar ? "avatar-option selected" : "avatar-option";
        btn.textContent = avatar;
        btn.onclick = () => {
            playerProfile.avatar = avatar;
            profileAvatarPreview.textContent = avatar;
            renderProfile();
        };
        avatarGrid.appendChild(btn);
    });

    favoriteAnimalSelect.innerHTML = "";
    albumUnlocked.forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = animalInfo[key]?.name || key;
        if (key === playerProfile.favorite) option.selected = true;
        favoriteAnimalSelect.appendChild(option);
    });

    profileStars.textContent = String(Object.values(levelStars).reduce((a,b) => a + Number(b || 0), 0));
    profileCoins.textContent = String(coins);
    profileLevels.textContent = String(maxUnlockedLevel);
    profileAnimals.textContent = String(albumUnlocked.length);
}

function saveProfile() {
    playerProfile.name = playerNameInput.value.trim().slice(0, 18);
    playerProfile.favorite = favoriteAnimalSelect.value || "lion";
    saveProgress();
    playSound("coin");
    showFoodToast("Профиль сохранён ✅");
    renderProfile();
}

function openAchievements() {
    playSound("click");
    renderAchievements();
    showScreen("achievementsScreen");
}

function renderAchievements() {
    achievementsList.innerHTML = "";
    achievementCoins.textContent = String(coins);

    achievementCatalog.forEach(item => {
        const value = Math.min(item.get(), item.target);
        const percent = Math.floor((value / item.target) * 100);
        const claimed = achievementClaims[item.id] === true;
        const ready = value >= item.target && !claimed;

        const card = document.createElement("div");
        card.className = "achievement-card";
        card.innerHTML = `
            <div class="achievement-icon">${item.icon}</div>
            <div>
                <div class="achievement-title">${item.title}</div>
                <div class="achievement-desc">${item.desc}</div>
                <div class="achievement-progress"><span style="width:${percent}%"></span></div>
                <div class="achievement-desc">${value}/${item.target} • +${item.reward} 🪙</div>
            </div>
        `;

        const btn = document.createElement("button");
        btn.className = claimed ? "achievement-claim done" : "achievement-claim";
        btn.textContent = claimed ? "Получено" : ready ? "Забрать" : "В процессе";
        btn.disabled = claimed || !ready;
        btn.onclick = () => claimAchievement(item.id);

        card.appendChild(btn);
        achievementsList.appendChild(card);
    });
}

function claimAchievement(id) {
    const item = achievementCatalog.find(a => a.id === id);
    if (!item || achievementClaims[id]) return;

    if (item.get() < item.target) {
        playSound("wrong");
        return;
    }

    achievementClaims[id] = true;
    coins += item.reward;
    saveProgress();
    updateCoinsViews();
    playSound("coin");
    showFoodToast(`Награда получена: +${item.reward} 🪙`);
    renderAchievements();
}
