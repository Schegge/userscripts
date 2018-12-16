// ==UserScript==
// @name         libri: Download Automatico Senza Attesa
// @description  Scarica i libri senza attese o click
// @version      1.0
// @author       schegge
// @namespace    schegge.github.io
// @include      https://libri.cc/*-epub*
// @include      https://libri.cc/*-pdf*
// @include      https://libri.cc/*-mobi*
// @grant        none
// ==/UserScript==

(function() {

   if (!/\/2(\/)?$/.test(window.location.href)) {
      window.location.href = window.location.href + (!/\/$/.test(window.location.href) ? '/' : '') + '2/';

   } else {
      var download;
      var waiting = window.setInterval(function() {
         download = document.querySelector('article.post .td-post-content > h2 > a');
         if (download) {
            clearInterval(waiting);
            window.location.href = download.href.split('url=')[1];
         }
      }, 1000);
   }

})();
