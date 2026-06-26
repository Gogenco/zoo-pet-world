/* Stage 4.9G-3C fallback profile/achievements module */
(function(){
  var avatars = window.profileAvatars || ["🦁","🐼","🦊","🐘","🦒","🐵","🐯","🐨","🐰","🐸","🐧","🦉"];

  window.renderProfile = function(){
    try {
      var nameInput = document.getElementById("playerNameInput");
      var avatarPreview = document.getElementById("profileAvatarPreview");
      var favoriteSelect = document.getElementById("favoriteAnimalSelect");
      var avatarGrid = document.getElementById("avatarGrid");
      if (nameInput) nameInput.value = (playerProfile && playerProfile.name) || "";
      if (avatarPreview) avatarPreview.textContent = (playerProfile && playerProfile.avatar) || "🦁";
      if (favoriteSelect) {
        favoriteSelect.innerHTML = "";
        (albumUnlocked || ["lion"]).forEach(function(key){
          var opt = document.createElement("option");
          opt.value = key;
          opt.textContent = ((animalInfo && animalInfo[key] && animalInfo[key].name) || key);
          if (playerProfile && playerProfile.favorite === key) opt.selected = true;
          favoriteSelect.appendChild(opt);
        });
      }
      if (avatarGrid) {
        avatarGrid.innerHTML = "";
        avatars.forEach(function(a){
          var b = document.createElement("button");
          b.type = "button";
          b.className = "avatar-option" + ((playerProfile && playerProfile.avatar === a) ? " active" : "");
          b.textContent = a;
          b.onclick = function(){
            playerProfile.avatar = a;
            renderProfile();
          };
          avatarGrid.appendChild(b);
        });
      }
      var totalStars = 0;
      try { Object.values(levelStars || {}).forEach(function(v){ totalStars += Number(v)||0; }); } catch(e) {}
      var el;
      if (el = document.getElementById("profileStars")) el.textContent = String(totalStars);
      if (el = document.getElementById("profileCoins")) el.textContent = String(coins || 0);
      if (el = document.getElementById("profileLevels")) el.textContent = String((maxUnlockedLevel || 0) + 1);
      if (el = document.getElementById("profileAnimals")) el.textContent = String((albumUnlocked || []).length);
    } catch(e) { console.error("renderProfile fallback failed", e); }
  };

  window.saveProfile = function(){
    try {
      var nameInput = document.getElementById("playerNameInput");
      var favoriteSelect = document.getElementById("favoriteAnimalSelect");
      playerProfile.name = nameInput ? nameInput.value.trim().slice(0,18) : (playerProfile.name || "");
      playerProfile.favorite = favoriteSelect ? favoriteSelect.value : (playerProfile.favorite || "lion");
      saveProgress();
      playSound("coin");
      renderProfile();
    } catch(e) { console.error(e); }
  };

  window.renderAchievements = function(){
    var list = document.getElementById("achievementsList");
    if (!list) return;
    var rows = [
      {icon:"⭐", title:"Звёзды", text:"Собирай 3 звезды на уровнях"},
      {icon:"🐾", title:"Животные", text:"Открыто животных: " + ((albumUnlocked || []).length)},
      {icon:"🪙", title:"Монеты", text:"Монетки: " + (coins || 0)}
    ];
    list.innerHTML = rows.map(function(r){
      return '<div class="achievement-item"><div class="achievement-icon">'+r.icon+'</div><div><b>'+r.title+'</b><p>'+r.text+'</p></div></div>';
    }).join("");
    try { updateCoinsViews(); } catch(e) {}
  };

  window.openProfile = function(){ try { playSound("click"); } catch(e){} showScreen("profileScreen"); };
  window.openAchievements = function(){ try { playSound("click"); } catch(e){} showScreen("achievementsScreen"); };
})();