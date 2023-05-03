// ==UserScript==
// @name         Block Youtube Users
// @namespace    https://github.com/Schegge
// @description  Hide videos of blacklisted users/channels and comments
// @icon         https://raw.githubusercontent.com/Schegge/Userscripts/master/images/BYUicon.png
// @version      2.5.3.1
// @author       Schegge
// @match        https://www.youtube.com/*
// @exclude      *://*.youtube.com/embed/*
// @exclude      *://*.youtube.com/live_chat*
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.getValue
// @grant        GM.setValue
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

// gm4 polyfill https://github.com/greasemonkey/gm4-polyfill
if (typeof GM == 'undefined') {
   this.GM = {};
   Object.entries({
      'GM_getValue': 'getValue',
      'GM_setValue': 'setValue'
   }).forEach(([oldKey, newKey]) => {
      let old = this[oldKey];
      if (old && (typeof GM[newKey] == 'undefined')) {
         GM[newKey] = function(...args) {
            return new Promise((resolve, reject) => { try { resolve(old.apply(this, args)); } catch (e) { reject(e); } });
         };
      }
   });
}

(async function($) {
   /* VALUES */

   const DEBUGGING = false;

   const Values = {
      storageVer: '1',
      storageSep: ',',
      storageTimer: 1000,
      storageComment: '',
      storageVideo: '',
      storageAdd: '',
      storageBlacklist: [],
      storageWhitelist: [],
      menuOpen: false,
      menuPause: false
   };

   // get saved values
   Values.storageVer = await GM.getValue('byuver', '1');
   Values.storageSep = await GM.getValue('sep', ',');
   Values.storageTimer = await GM.getValue('timer', 1000);
   Values.storageComment = await GM.getValue('hidecomments', '');
   Values.storageVideo = await GM.getValue('enablepause', '');
   Values.storageAdd = await GM.getValue('enableadd', '');
   Values.storageBlacklist = getArray(await GM.getValue('savedblocks', ''));
   Values.storageWhitelist = getArray(await GM.getValue('savedwhites', ''));

   if (DEBUGGING) {
      console.log('BYU- current blacklist:', Values.storageBlacklist);
      console.log('BYU- current whitelist:', Values.storageWhitelist);
   }

   // get array from string
   function getArray(string) {
      if (!string) return [];
      return string.split(Values.storageSep).map(v => v.trim()).filter(v => v.length);
   }

   const Where = {
      // home, related and page playlist: #metadata #text.ytd-channel-name
      // search video: #channel-info #text.ytd-channel-name
      // search channel: #channel-title.ytd-channel-renderer span.ytd-channel-renderer, #info #text.ytd-channel-name, #metadata #subscribers.ytd-channel-renderer
      // video playlist: #byline.ytd-playlist-panel-video-renderer
      // user video: #meta #upload-info #channel-name #text.ytd-channel-name, #owner #upload-info #channel-name #text.ytd-channel-name
      // comment: #author-text span.ytd-comment-renderer, #name #text.ytd-channel-name
      user: `#metadata #text.ytd-channel-name,
            #channel-info #text.ytd-channel-name,
            #channel-title.ytd-channel-renderer span.ytd-channel-renderer,
            #info #text.ytd-channel-name,
            #metadata #subscribers.ytd-channel-renderer,
            #byline.ytd-playlist-panel-video-renderer,
            #meta #upload-info #channel-name #text.ytd-channel-name
            ${Values.storageComment ? ', #author-text span.ytd-comment-renderer, #name #text.ytd-channel-name' : ''}`,

      renderer: `ytd-rich-item-renderer,
            ytd-video-renderer,
            ytd-channel-renderer,
            ytd-playlist-renderer,
            ytd-playlist-video-renderer,
            ytd-playlist-panel-video-renderer,
            ytd-movie-renderer,
            ytd-compact-video-renderer,
            ytd-compact-movie-renderer,
            ytd-compact-radio-renderer,
            ytd-compact-autoplay-renderer,
            ytd-compact-playlist-renderer,
            ytd-grid-video-renderer,
            ytd-grid-playlist-renderer,
            ytd-secondary-search-container-renderer
            ${Values.storageComment ? ', ytd-comment-renderer.ytd-comment-replies-renderer, ytd-comment-thread-renderer' : ''}`,

      userVideo: '#meta #upload-info #channel-name #text.ytd-channel-name'
   };

   /* INTERVAL FOR BLACKLISTING */

   search();
   setInterval(search, Values.storageTimer);

   /* CSS */

   $('head').append(`<style>
      #byu-is-black { display: none!important; }
      .byu-add { font-size: .8em; margin-right: .5em; cursor: pointer; color: var(--yt-brand-youtube-red, red); font-family: consolas, monospace; float: left; }
      #byu-icon { display: inline-block; position: relative; text-align: center; width: 40px; height: 24px; margin: 0 8px; font-weight: 100; }
      #byu-icon span { color: var(--yt-spec-icon-active-other); cursor: pointer; font-size: 20px; vertical-align: middle; }
      #byu-options { width: 30%; max-width: 250px; display: flex; flex-flow: row wrap; align-items: baseline; position: fixed; right: 10px; padding: 15px; text-align: center; color: var(--yt-spec-text-primary); background-color: var(--yt-spec-base-background); border: 1px solid var(--yt-spec-10-percent-layer); z-index: 99999; }
      #byu-options div { width: 50%; flex-grow: 1; box-sizing: border-box; padding: 5px; font-size: .9em; }
      #byu-save { font-size: 1.5em!important; font-weight: bold; cursor: pointer; color: var(--yt-brand-youtube-red, red); }
      #byu-pause { cursor: pointer; }
      #byu-options .byu-textarea { width: 100%; }
      #byu-options .byu-textarea span { font-size: 1.2em; width: 100%; text-align: center; font-weight: bold; }
      #byu-options .byu-textarea textarea { font-size: 1em; line-height: 1em; resize: vertical; width: 100%; padding: 4px; color: var(--yt-spec-text-primary); background-color: var(--yt-spec-badge-chip-background); box-sizing: border-box; border: 0; border-radius: 1em; }
      #byu-options .byu-textarea textarea#byu-blacklist { min-height: 6em; }
      #byu-options .byu-textarea textarea#byu-whiteklist { min-height: 4em; }
      #byu-options .byu-opt { text-align: right; padding-right: 2em; }
      #byu-options .byu-opt input { color: var(--yt-spec-text-primary); background-color: var(--yt-spec-badge-chip-background); border: 0; padding: 0 2px; height: 1.6em; line-height: 1em; vertical-align: middle; box-sizing: border-box;  margin: 0; border-radius: .5em; }
      #byu-sep { width: 1em; }
      #byu-timer { width: 5em; }
      #byu-video-page-black { position: fixed; z-index: 99999; bottom: 2em; left: 2em; width: 20%; min-width: 10em; font-size: 1.5em; padding: 1em; background: var(--yt-brand-youtube-red, red); color: #fff; border-radius: .5em; }
      #byu-notice { position: fixed; z-index: 99999; bottom: 2em; right: 2em; width: 30%; min-width: 10em; font-size: 1.2em; padding: 1.5em; color: var(--yt-brand-youtube-red, red); background: #fff; border-radius: .5em; border: 1px solid var(--yt-brand-youtube-red, red); }
      #byu-notice-close { cursor: pointer; background: var(--yt-brand-youtube-red, red); color: #fff; border-radius: .5em; padding: 0 .5em; }
   </style>`);

   /* VIDEO FIRST PAGE */

   if (Values.storageVideo && /\/watch/.test(window.location.href)) {
      let waitUserVideo = setInterval(() => {
         if ($(Where.userVideo).length) {
            clearInterval(waitUserVideo);

            let username = $(Where.userVideo).text().trim();
            if (ifMatch(username.toLowerCase())) {
               let video = $('#player video.video-stream.html5-main-video');
               video.get(0).pause();
               video.get(0).currentTime = 0;
               let pausing = setInterval(() => {
                  if (!video.get(0).paused) {
                     video.get(0).pause();
                     video.get(0).currentTime = 0;
                  }
               }, 500);
               $('body').append($(`<div id="byu-video-page-black">${username} is blacklisted</div>`));
               $('body').on('click', '.html5-main-video, .html5-video-player, .ytp-play-button, #secondary',
                  () => clearInterval(pausing));
               setTimeout(() => {
                  $('#byu-video-page-black').remove();
                  clearInterval(pausing);
               }, 10000);
            }
         }
      }, 1000);
   }

   /* BLACKLIST MENU */

   $('body').append(`<div id="byu-options" style="display: none;">
      <div><span id="byu-save">save</span></div>
      <div><span id="byu-pause">pause</span></div>
      <div class="byu-textarea"><span>blacklist</span>
         <textarea spellcheck="false" id="byu-blacklist">${
            Values.storageBlacklist.join(`${Values.storageSep} `)
         }</textarea></div>
      <div class="byu-textarea"><span>whitelist</span>
         <textarea spellcheck="false" id="byu-whitelist">${
            Values.storageWhitelist.join(`${Values.storageSep} `)
         }</textarea></div>
      <div class="byu-opt" title="between usernames">separator <input id="byu-sep" type="text" maxlength="1" value="${
         Values.storageSep
      }"></div>
      <div class="byu-opt" title="hide comments">comments
         <input id="byu-hidecomments" type="checkbox" value="comments" ${
         Values.storageComment ? 'checked' : ''
      }></div>
      <div class="byu-opt" title="interval between new checks">timer
         <input id="byu-timer" type="number" min="500" max="5000" step="500" title="in milliseconds" value="${
         Values.storageTimer
      }"></div>
      <div class="byu-opt" title="if user blacklisted">pause video
         <input id="byu-enablepause" type="checkbox" value="pausevideo" ${
         Values.storageVideo ? 'checked' : ''
      }></div>
      <div class="byu-opt" title="always show [x]">right click add
         <input id="byu-enableadd" type="checkbox" value="clickadd" ${
         Values.storageAdd ? 'checked' : ''
      }></div>
   </div>`);

   // for the B wait till the masthead buttons are added
   let buttonB = $('<div id="byu-icon"><span>B</span></div>');

   let waitButton = setInterval(() => {
      if ($('#buttons').length) {
         clearInterval(waitButton);
         $('#buttons').before(buttonB);
         $('head').append(`<style>#byu-options { top:${
            $('#container.ytd-masthead').height()
         }px; }</style>`);
      }
   }, 1000);

   /* NEW VERSION NOTIFICATION */

   if (Values.storageVer !== '2.5.3.1') {
      Values.storageVer = '2.5.3.1';
      GM.setValue('byuver', Values.storageVer);
      /* $('body').append(`<div id="byu-notice">BLOCK YOUTUBE USERS [${Values.storageVer}]<br><br>--
      <br><br><span id="byu-notice-close">close</span></div>`);
      $('#byu-notice-close').on('click', () => $('#byu-notice').remove()); */
   }

   /* BLACKLISTING FUNCTIONS */

   // global search
   function search(newAdd = false) {
      $(Where.user).each(function() {
         findMatch($(this), newAdd);
      });
   }

   // do the thing
   function findMatch(user, newAdd) {
      // retrieve current username
      let username = user.text().trim().toLowerCase();
      if (!username) return;

      // add [x] when menu is open or always add selected
      if ((Values.menuOpen || Values.storageAdd) && !user.siblings('.byu-add').length) {
         $('<div class="byu-add">[x]</div>').insertBefore(user);
      }

      // if blacklist is paused do nothing
      if (Values.menuPause) return;

      // if content or blacklist are changed
      if (user.data('username') !== username || newAdd) {
         user.data('username', username);

         // hide if match
         if (ifMatch(username)) {
            user.closest(Where.renderer).attr('id', 'byu-is-black');

            if (DEBUGGING) {
               console.log('BYU- MATCHED USER', user, user.closest(Where.renderer));
            }

            user.data('black', 'yes');
         // show if it was hidden with another username or deleted username from blacklist
         } else if (user.data('black')) {
            user.closest(Where.renderer).removeAttr('id');
            user.data('black', '');
         }
      }
   }

   // check if it needs to be blacklisted
   function ifMatch(u) {
      return (
         !Values.storageWhitelist.some(w => u === w.toLowerCase()) &&
         Values.storageBlacklist.some(b => {
            b = b.toLowerCase();
            if (b.startsWith('*')) {
               b = b.replace('*', '');
               return b && u.includes(b);
            } else {
               return u === b;
            }
         })
      );
   }

   /* EVENT LISTENERS */

   // open/close options
   $(buttonB).on('click', openMenu);
   $(document).bind('keydown', function(e) {
      if (e.ctrlKey && e.altKey && e.key == 'b') {
         openMenu();
      }
   });

   function openMenu() {
      $('#byu-options').slideToggle();
      $(buttonB).css('font-weight', $(buttonB).css('font-weight') === '500' ? '' : '500');

      Values.menuOpen = !Values.menuOpen;
      if (Values.storageAdd) return;

      if (Values.menuOpen) {
         search();
      } else {
         $('.byu-add').remove();
      }
   }

   // save changes
   $('#byu-save').on('click', function() {
      if (/[*"]|^$/.test($('#byu-sep').val())) {
         $(this).text('ERROR! separator');
      } else {
         Values.storageSep = $('#byu-sep').val();
         Values.storageTimer = Math.max(parseInt($('#byu-timer').val(), 10), 500) || 1000;
         Values.storageComment = $('#byu-hidecomments').is(':checked') ? 'yes' : '';
         Values.storageVideo = $('#byu-enablepause').is(':checked') ? 'yes' : '';
         Values.storageAdd = $('#byu-enableadd').is(':checked') ? 'yes' : '';
         Values.storageBlacklist = getArray($('#byu-blacklist').val().trim());
         Values.storageWhitelist = getArray($('#byu-whitelist').val().trim());
         GM.setValue('sep', Values.storageSep);
         GM.setValue('timer', Values.storageTimer);
         GM.setValue('hidecomments', Values.storageComment);
         GM.setValue('enablepause', Values.storageVideo);
         GM.setValue('enableadd', Values.storageAdd);
         GM.setValue('savedblocks', Values.storageBlacklist.join(`${Values.storageSep} `));
         GM.setValue('savedwhites', Values.storageWhitelist.join(`${Values.storageSep} `));
         $(this).text('saved');
         search(true);
      }
      setTimeout(() => $(this).text('save'), 2000);
   });

   // pause
   $('#byu-pause').on('click', function() {
      Values.menuPause = !Values.menuPause;
      if (Values.menuPause) {
         $('[id="byu-is-black"]').removeAttr('id');
         $(this).text('paused');
      } else {
         search(true);
         $(this).text('pause');
      }
   });

   // add usernames to blacklist
   $(document).on('click contextmenu', '.byu-add', function(e) {
      e.preventDefault();
      e.stopPropagation();

      let username = $(this).next().text().trim().toLowerCase();

      if (DEBUGGING) {
         console.log('BYU- YOU HAVE RIGHT-CLICKED ON [X]');
         console.log('BYU- current # blacklist:', Values.storageBlacklist.length);
         console.log('BYU- element:', $(this));
         console.log('BYU- username:', username);
         console.log('BYU- username already in the blacklist?', Values.storageBlacklist.includes(username));
      }

      if (!Values.storageBlacklist.includes(username)) {
         Values.storageBlacklist.push(username);
         let blacks = Values.storageBlacklist.join(`${Values.storageSep} `);
         $('#byu-blacklist').val(blacks);
         GM.setValue('savedblocks', blacks);
         search(true);
      }
   });

})(jQuery);
