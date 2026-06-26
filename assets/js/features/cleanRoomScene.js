/* Stage 4.9G-3C fallback clean room module */
(function(){
  if (typeof window.applyCleanRoomBackground !== "function") {
    window.applyCleanRoomBackground = function(element, key){
      if (!element) return;
      try {
        if (typeof animalImageSrc === "function") element.style.backgroundImage = "";
      } catch(e) {}
    };
  }
})();