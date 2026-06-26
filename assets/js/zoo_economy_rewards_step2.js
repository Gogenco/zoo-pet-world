/* Stage 4.9G-3C fallback economy rewards module */
(function(){
  if (typeof window.halfReward !== "function") window.halfReward = function(v){ return Math.max(0, Math.floor(Number(v)||0)); };
})();