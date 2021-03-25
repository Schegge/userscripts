// ==UserScript==
// @name         Block Youtube Users
// @namespace    https://github.com/Schegge
// @description  Hide videos of blacklisted users/channels and comments
// @icon         https://raw.githubusercontent.com/Schegge/Userscripts/master/images/BYUicon.png
// @version      2.4.7
// @author       Schegge
// @match        *://*.youtube.com/*
// @exclude      *://*.youtube.com/embed/*
// @exclude      *://*.youtube.com/live_chat?*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.getValue
// @grant        GM.setValue
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==

/** DESCRIPTION
- it is not case-sensitive
- it hides videos of blacklisted users/channels from home, search, related, and comments
 - also from the playlists, but it doesn't prevent them from playing if the playlist is in autoplay
- put a * in front of a word for wildcard (only in the blacklist), it will find the word no matter its position in the username (example: *news)
 - when you use it, but you want a channel that has that word in the name, you can put it in the whitelist (example -> blacklist: *news; whitelist: euronews (in english))
- you can choose the symbol to split the usernames (default is a comma, * and " aren't allowed, min-max 1 character)
- you can choose the duration of the time interval in which the script checks for new elements on the page (default is 1000 milliseconds, min 500)
 - reload the page after saving to set the new interval
- you can enable/disable hiding comments (after saving you have to reload the page)
- you can blacklist channels by right clicking on '[x]' before the usernames (you can enable/disable it)
 - in any case, the [x] buttons are automatically shown when the "B" menu is open
- from a direct link to youtube, it pauses the video if it's blacklisted (you can enable/disable it)
- you can temporarily pause the blacklist (to reactivate it, just re-click on it or reload the page)
- remember to save after any changes in the menu
**/

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

   // get array from string
   function getArray(string) {
      if (!string) return [];
      return string.split(Values.storageSep).map(v => v.trim()).filter(v => v.length);
   }

   const Where = {
      // home, related and page playlist: #metadata #text.ytd-channel-name
      // search video: #channel-info #text.ytd-channel-name
      // search channel: #channel-title.ytd-channel-renderer span.ytd-channel-renderer, #info #text.ytd-channel-name
      // video playlist: #byline.ytd-playlist-panel-video-renderer
      // comment: #author-text span.ytd-comment-renderer, #name #text.ytd-channel-name
      user: `#metadata #text.ytd-channel-name, #channel-info #text.ytd-channel-name, #channel-title.ytd-channel-renderer span.ytd-channel-renderer, #info #text.ytd-channel-name, #byline.ytd-playlist-panel-video-renderer${Values.storageComment ? ', #author-text span.ytd-comment-renderer, #name #text.ytd-channel-name' : ''}`,
      renderer: `ytd-rich-item-renderer, ytd-video-renderer, ytd-channel-renderer, ytd-playlist-renderer, ytd-movie-renderer, ytd-compact-video-renderer, ytd-compact-radio-renderer, ytd-compact-autoplay-renderer, ytd-compact-playlist-renderer, ytd-playlist-video-renderer, ytd-grid-video-renderer, ytd-grid-playlist-renderer, ytd-playlist-panel-video-renderer, ytd-secondary-search-container-renderer${Values.storageComment ? ', ytd-comment-thread-renderer' : ''}`,
      userVideo: '#upload-info #channel-name #text.ytd-channel-name'
   };

   /* INTERVAL FOR BLACKLISTING */

   search();
   setInterval(search, Values.storageTimer);

   /* CSS */

   $('head').append(`<style>
      #byu-is-black { display: none!important; }
      .byu-add { font-size: .8em; margin-right: .5em; cursor: pointer; color: var(--yt-red); font-family: consolas, monospace; float: left; }
      #byu-icon { display: inline-block; position: relative; text-align: center; width: 40px; height: 24px; margin: 0 8px; font-weight: 500; }
      #byu-icon span { color: var(--yt-spec-icon-active-other); cursor: pointer; font-size: 20px; vertical-align: middle; }
      #byu-options { width: 30%; max-width: 250px; display: flex; flex-flow: row wrap; align-items: baseline; position: fixed; right: 10px; padding: 0 15px 15px; text-align: center; color: var(--yt-spec-text-primary); background-color: var(--yt-spec-brand-background-primary); border: 1px solid var(--yt-spec-10-percent-layer); border-top: 0; z-index: 99999; }
      #byu-options div { width: 50%; flex-grow: 1; box-sizing: border-box; padding: 5px; font-size: 1em; }
      #byu-save { font-size: 1.5em!important; font-weight: bold; cursor: pointer; color: var(--yt-red); }
      #byu-pause { cursor: pointer; }
      #byu-options .byu-textarea { width: 100%; }
      #byu-options .byu-textarea span { font-size: 1.2em; width: 100%; text-align: center; font-weight: bold; }
      #byu-options .byu-textarea textarea { font-size: 1em; line-height: 1em; resize: vertical; width: 100%; padding: 4px; color: var(--yt-spec-text-primary); background-color: var(--yt-spec-brand-background-primary); box-sizing: border-box; border: 3px solid var(--ytd-searchbox-legacy-border-color); }
      #byu-options .byu-textarea textarea#byu-blacklist { min-height: 6em; }
      #byu-options .byu-textarea textarea#byu-whiteklist { min-height: 4em; }
      #byu-options .byu-opt { text-align: right; padding-right: 2em; }
      #byu-options .byu-opt input { color: var(--yt-spec-text-primary); background-color: var(--yt-spec-brand-background-primary); border: 3px solid var(--ytd-searchbox-legacy-border-color); padding: 0 2px; height: 1.4em; line-height: 1em; vertical-align: middle; box-sizing: border-box;  margin: 0; }
      #byu-sep { width: 1em; }
      #byu-timer { width: 4.2em; }
      #byu-video-page-black { position: fixed; z-index: 99999; bottom: 2em; left: 2em; width: 20%; min-width: 10em; font-size: 1.5em; padding: 1em; background: var(--yt-red); color: #fff; border-radius: .5em; }
      #byu-notice { position: fixed; z-index: 99999; bottom: 2em; right: 2em; width: 30%; min-width: 10em; font-size: 1.2em; padding: 1.5em; color: var(--yt-red); background: #fff; border-radius: .5em; border: 1px solid var(--yt-red); }
      #byu-notice-close { cursor: pointer; background: var(--yt-red); color: #fff; border-radius: .5em; padding: 0 .5em; }
   </style>`);

   /* FIRST PAGE VIDEO */

   if (Values.storageVideo && /\/watch/.test(window.location.href)) {
      let waitUserVideo = setInterval(() => {
         if ($(Where.userVideo).length) {
            clearInterval(waitUserVideo);

            let video = $('#player video.video-stream.html5-main-video');
            let username = $(Where.userVideo).text().trim();
            if (ifMatch(username.toLowerCase())) {
               video.get(0).pause();
               video.get(0).currentTime = 0;
               let pausing = setInterval(() => {
                  if (!video.get(0).paused) {
                     video.get(0).pause();
                     video.get(0).currentTime = 0;
                  }
               }, 500);
               $('body').append($(`<div id="byu-video-page-black">${username} is blacklisted</div>`));
               $('body').on('click', '.html5-main-video, .html5-video-player, .ytp-play-button, #secondary', () => clearInterval(pausing));
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
      <div class="byu-textarea"><span>blacklist</span><textarea spellcheck="false" id="byu-blacklist">${Values.storageBlacklist.join(`${Values.storageSep} `)}</textarea></div>
      <div class="byu-textarea"><span>whitelist</span><textarea spellcheck="false" id="byu-whitelist">${Values.storageWhitelist.join(`${Values.storageSep} `)}</textarea></div>
      <div class="byu-opt" title="between usernames">separator <input id="byu-sep" type="text" maxlength="1" value="${Values.storageSep}"></div>
      <div class="byu-opt" title="hide comments">comments <input id="byu-hidecomments" type="checkbox" value="comments" ${Values.storageComment ? 'checked' : ''}></div>
      <div class="byu-opt" title="interval between new checks">timer <input id="byu-timer" type="number" min="500" max="5000" step="500" title="in milliseconds" value="${Values.storageTimer}"></div>
      <div class="byu-opt" title="if user blacklisted">pause video <input id="byu-enablepause" type="checkbox" value="pausevideo" ${Values.storageVideo ? 'checked' : ''}></div>
      <div class="byu-opt" title="always show [x]">right click add <input id="byu-enableadd" type="checkbox" value="clickadd" ${Values.storageAdd ? 'checked' : ''}></div>
   </div>`);

   // for the B wait till the masthead buttons are added
   let waitButton = setInterval(() => {
      if ($('#buttons').length) {
         clearInterval(waitButton);
         $('#buttons').before('<div id="byu-icon"><span>B</span></div>');
         $('head').append(`<style>#byu-options { top:${$('#container.ytd-masthead').height()}px; }</style>`);
      }
   }, 1000);

   /* NEW VERSION NOTIFICATION */

   if (Values.storageVer !== '2.4.7') {
      Values.storageVer = '2.4.7';
      GM.setValue('byuver', Values.storageVer);
      $('body').append(`<div id="byu-notice">BLOCK YOUTUBE USERS [${Values.storageVer}]<br><br>- You can now choose the duration of the time interval in which the script checks for new videos on the page (default is 1000 milliseconds, min 500).<br>- You can now enable/disable hiding comments of blacklisted users (default is false).<br><br><span id="byu-notice-close">close</span></div>`);
      $('#byu-notice-close').on('click', () => $('#byu-notice').remove());
   }

   /* BLACKLISTING FUNCTIONS */

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

   // do the thing
   function findMatch(user, newAdd) {
      // add [x] when menu is open or always add selected
      if ((Values.menuOpen || Values.storageAdd) && !user.siblings('.byu-add').length) {
         $('<span class="byu-add">[x]</span>').insertBefore(user);
      }
      // if blacklist is paused do nothing
      if (Values.menuPause) return;
      // retrieve current username
      let username = user.text().trim().toLowerCase();
      if (!username) return;
      // if content or blacklist are changed
      if (user.data('username') !== username || newAdd) {
         user.data('username', username);
         // hide if match
         if (ifMatch(username)) {
            user.closest(Where.renderer).attr('id', 'byu-is-black');
            user.data('black', 'yes');
         // show if it was hidden with another username or deleted username from blacklist
         } else if (user.data('black')) {
            user.closest(Where.renderer).removeAttr('id');
            user.data('black', '');
         }
      }
   }

   // global search
   function search(newAdd = false) {
      $(Where.user).each(function() { findMatch($(this), newAdd); });
   }

   /* EVENT LISTENERS */

   // open/close options
   $('body').on('click', '#byu-icon', function() {
      $('#byu-options').slideToggle();
      $(this).css('font-weight', $(this).css('font-weight') === '700' ? '' : '700');
      Values.menuOpen = !Values.menuOpen;
      if (!Values.storageAdd) {
         if (Values.menuOpen) search();
         else $('.byu-add').remove();
      }
   });

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
      setTimeout(() => $(this).text('save'), 1000);
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
   $('body').on('click contextmenu', '.byu-add', function(e) {
      e.preventDefault();
      e.stopPropagation();
      Values.storageBlacklist.push($(this).next().data('username'));
      let blacks = Values.storageBlacklist.join(`${Values.storageSep} `);
      $('#byu-blacklist').val(blacks);
      GM.setValue('savedblocks', blacks);
      search(true);
   });

})(jQuery);
