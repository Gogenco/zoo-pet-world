/* Stage 4.9I — Album Animal Card entry for all animals */
(function(){
  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getKeys(){
    try { return Object.keys(animalInfo || {}); } catch(e) { return ["lion"]; }
  }

  function isUnlocked(key){
    return (typeof zpwQaUnlockAllSections === "function" && zpwQaUnlockAllSections()) || (Array.isArray(albumUnlocked) ? albumUnlocked.includes(key) : key === "lion");
  }

  function openDiaryOrLock(key, unlocked){
    if (unlocked) {
      if (typeof openAnimalCard === "function") openAnimalCard(key);
      return;
    }
    if (typeof openAnimalCardLockedPurchase === "function") {
      openAnimalCardLockedPurchase(key);
      return;
    }
    try { playSound("wrong"); } catch(e) {}
  }

  window.renderAlbum = function(){
    var grid = document.getElementById("albumGrid");
    if (!grid) return;
    var keys = getKeys();
    grid.innerHTML = "";
    keys.forEach(function(key){
      var unlocked = isUnlocked(key);
      var info = (animalInfo && animalInfo[key]) || {name:key, fact:""};
      var imgHtml = unlocked && typeof animalImageSrc === "function"
        ? '<img src="'+animalImageSrc(key)+'" alt=""/>'
        : '🔒';
      var card = document.createElement("div");
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.className = "album-card" + (unlocked ? "" : " locked");
      card.dataset.animalId = key;
      card.innerHTML = '<div class="album-img">' + imgHtml + '</div>'
        + '<div class="album-info">'
        + '<div class="album-name">' + esc(info.name || key) + '</div>'
        + '<div class="album-fact">' + (unlocked ? esc(info.fact || "") : "Дневник закрыт · открой или купи за монеты") + '</div>'
        + '<button type="button" class="animal-card-open-btn" data-animal-card="'+esc(key)+'">'
        + (unlocked ? '📖 Дневник исследователя' : '🔒 Открыть дневник')
        + '</button>'
        + '</div>';

      card.onclick = function(){ openDiaryOrLock(key, unlocked); };
      card.onkeydown = function(event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDiaryOrLock(key, unlocked);
        }
      };
      var diaryBtn = card.querySelector('[data-animal-card]');
      if (diaryBtn) {
        diaryBtn.onclick = function(event){
          event.preventDefault();
          event.stopPropagation();
          openDiaryOrLock(key, unlocked);
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
