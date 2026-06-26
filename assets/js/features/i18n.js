/* Stage 4.9G-3C fallback i18n module */
(function(){
  function format(str, params){
    if (!params) return String(str);
    return String(str).replace(/\{(\w+)\}/g, function(_, k){ return params[k] != null ? params[k] : ""; });
  }
  if (typeof window.getCurrentLanguage !== "function") {
    window.getCurrentLanguage = function(){
      try { return (window.safeStorage && safeStorage.get("zooLanguage", "ru")) || "ru"; } catch(e) { return "ru"; }
    };
  }
  if (typeof window.t !== "function") {
    window.t = function(key, params){
      var lang = "ru";
      try { lang = window.getCurrentLanguage ? window.getCurrentLanguage() : "ru"; } catch(e) {}
      var value = key;
      try {
        if (lang === "en" && typeof i18nMap !== "undefined" && i18nMap && i18nMap[key]) value = i18nMap[key];
      } catch(e) {}
      return format(value, params);
    };
  }
  if (typeof window.applyI18nPlaceholders !== "function") window.applyI18nPlaceholders = function(){};
  if (typeof window.translatePageToEnglish !== "function") window.translatePageToEnglish = function(){};
  if (typeof window.translateParentPageToEnglish !== "function") window.translateParentPageToEnglish = function(){};
})();