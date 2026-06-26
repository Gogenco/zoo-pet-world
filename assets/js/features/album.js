/* Stage 4.9G-3C fallback album module */
(function(){
  window.renderAlbum = function(){
    var grid = document.getElementById("albumGrid");
    if (!grid) return;
    var keys = [];
    try { keys = Object.keys(animalInfo || {}); } catch(e) { keys = ["lion"]; }
    grid.innerHTML = "";
    keys.forEach(function(key){
      var unlocked = Array.isArray(albumUnlocked) ? albumUnlocked.includes(key) : key === "lion";
      var info = (animalInfo && animalInfo[key]) || {name:key, fact:""};
      var card = document.createElement("button");
      card.type = "button";
      card.className = "album-card" + (unlocked ? "" : " locked");
      card.innerHTML = '<div class="album-img">' + (unlocked && typeof animalImageSrc === "function" ? '<img src="'+animalImageSrc(key)+'" alt=""/>' : '🔒') + '</div>'
        + '<div class="album-name">' + (unlocked ? info.name : "Закрыто") + '</div>'
        + '<div class="album-fact">' + (unlocked ? (info.fact || "") : "Открой животное в уровнях") + '</div>';
      card.onclick = function(){
        if (!unlocked) { try { playSound("wrong"); } catch(e) {} return; }
        selectedMainPetKey = key;
        selectedPetKey = key;
        try { openPetRoom(); } catch(e) { showScreen("petRoomScreen"); }
      };
      grid.appendChild(card);
    });
  };
  window.openAlbum = function(){
    try { playSound("click"); } catch(e) {}
    showScreen("albumScreen");
  };
})();