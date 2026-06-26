/* Stage 4.9G-3C fallback audio settings module */
(function(){
  window.renderAudioSettings = function(){
    try {
      var track = document.getElementById("musicTrackSelect");
      var mv = document.getElementById("musicVolumeRange");
      var sv = document.getElementById("soundVolumeRange");
      var mt = document.getElementById("musicVolumeText");
      var st = document.getElementById("soundVolumeText");
      if (track && typeof selectedMusicTrack !== "undefined") track.value = selectedMusicTrack;
      if (mv) mv.value = Math.round((musicVolume || 0) * 100);
      if (sv) sv.value = Math.round((soundVolume || 0) * 100);
      if (mt) mt.textContent = Math.round((musicVolume || 0) * 100) + "%";
      if (st) st.textContent = Math.round((soundVolume || 0) * 100) + "%";
    } catch(e) {}
  };
  window.openAudioSettings = function(){ try { playSound("click"); } catch(e){} showScreen("audioScreen"); };
})();