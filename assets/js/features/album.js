/* Stage 4.9H fallback album module + Lion Animal Card entry */
(function(){
  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  window.renderAlbum = function(){
    var grid = document.getElementById("albumGrid");
    if (!grid) return;
    var keys = [];
    try { keys = Object.keys(animalInfo || {}); } catch(e) { keys = ["lion"]; }
    grid.innerHTML = "";
    keys.forEach(function(key){
      var unlocked = Array.isArray(albumUnlocked) ? albumUnlocked.includes(key) : key === "lion";
      var info = (animalInfo && animalInfo[key]) || {name:key, fact:""};
      var card = document.createElement("div");
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.className = "album-card" + (unlocked ? "" : " locked");
      card.innerHTML = '<div class="album-img">' + (unlocked && typeof animalImageSrc === "function" ? '<img src="'+animalImageSrc(key)+'" alt=""/>' : '🔒') + '</div>'
        + '<div class="album-info">'
        + '<div class="album-name">' + (unlocked ? esc(info.name) : "Закрыто") + '</div>'
        + '<div class="album-fact">' + (unlocked ? esc(info.fact || "") : "Открой животное в уровнях") + '</div>'
        + (unlocked && key === "lion" ? '<button type="button" class="animal-card-open-btn" data-animal-card="lion">🦁 Дневник исследователя</button>' : '')
        + '</div>';
      card.onclick = function(){
        if (!unlocked) { try { playSound("wrong"); } catch(e) {} return; }
        if (key === "lion") {
          if (typeof openAnimalCard === "function") {
            openAnimalCard("lion");
          }
          return;
        }
        selectedMainPetKey = key;
        selectedPetKey = key;
        try { openPetRoom(); } catch(e) { showScreen("petRoomScreen"); }
      };
      card.onkeydown = function(event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          card.click();
        }
      };
      var diaryBtn = card.querySelector('[data-animal-card="lion"]');
      if (diaryBtn) {
        diaryBtn.onclick = function(event){
          event.preventDefault();
          event.stopPropagation();
          if (typeof openAnimalCard === "function") openAnimalCard("lion");
        };
      }
      grid.appendChild(card);
    });
  };
  window.openAlbum = function(){
    try { playSound("click"); } catch(e) {}
    showScreen("albumScreen");
  };
})();
