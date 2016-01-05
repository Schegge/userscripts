// ==UserScript==
// @name         Skip Ads to Download Page
// @namespace    https://github.com/Schegge
// @version      1.0
// @description  It redirects you to the download page without disabling adblock - for linkdecode and adf.ly
// @author       Schegge
// @match        http://www.linkdecode.com/*
// @match        http://www.fastdecode.com/*
// @match        http://adf.ly/*
// @grant        none
// ==/UserScript==

(function(){
    
    var download;
    switch(window.location.hostname) {
        case "www.linkdecode.com":
        case "www.fastdecode.com":
            var button = String(document.querySelector("#m > button").onclick);
            download = button.match(/\'(http.+)\',/)[1];
            window.location = download;
            break;
            
        case "adf.ly":
            document.body.style.display = "none";
            setInterval(function() {
                if (download) window.location = download;
                else download = document.querySelector("#skip_button").href;
            }, 500);
            break;
    }
    
})();