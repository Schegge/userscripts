// ==UserScript==
// @name         AO3: Fic's Style, Blacklist, Bookmarks
// @namespace    https://github.com/Schegge
// @description  Change font, size, width and background of a work + blacklist: hide works that contain certains tags or text, have too many tags/fandoms/relations/chapters/words and other options + fullscreen reading mode + bookmarks: save the position you stopped reading a fic + number of words for each chapter and estimated reading time
// @icon         https://raw.githubusercontent.com/Schegge/Userscripts/master/images/ao3icon.png
// @version      3.6.1.1
// @author       Schegge
// @match        *://archiveofourown.org/*
// @match        *://www.archiveofourown.org/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.getValue
// @grant        GM.setValue
// ==/UserScript==

// gm4 polyfill https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
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

(async function() {
   const SN = 'stblbm';

   // check which page
   const Check = {
      // script version
      version: async function() {
         if (await getStorage('version', '1') !== 3611) {
            setStorage('version', 3611);
            return true;
         }
         return false;
      },
      // on search pages but not on personal user profile
      black: function() {
         let user = document.querySelector('#greeting .user a[href*="/users/"]') || false;
         user = user && window.location.pathname.includes(user.href.split('/users/')[1]);
         return document.querySelector('li.blurb.group:not(.collection):not(.tagset)') && !user;
      },
      // include /works/(numbers) and /works/(numbers)/chapters/(numbers) and exclude /works/(whatever)navigate
      work: function() {
         return /\/works\/\d+(\/chapters\/\d+)?(?!.*navigate)/.test(window.location.pathname);
      },
      // Full Screen
      fullScreen: false
   };

   // new version check
   if (await Check.version()) {
      /*
         document.body.insertAdjacentHTML('beforeend', `<div style="position: fixed; bottom: 3em; right: 3em; width: 35%; z-index: 999; font-size: .9em; background: #fff; padding: 1em; border: 1px solid #900;"><b>AO3: Fic's Style, Blacklist, Bookmarks</b> UPDATES (v3.6.1.1)<br><br> <br><br><span id="${SN}-close" style="cursor: pointer; color: #900;">close</span>`);
         document.getElementById(`${SN}-close`).addEventListener('click', function() { this.parentElement.style.display = 'none'; });
      */
   }


   /** FEATURES **/
   const Feature = {
      style: true,
      book: true,
      black: true,
      wpm: 250
   }
   // Object.assign() changes only the same keys
   Object.assign(Feature, await getStorage('feature', '{}'));


   // Features' menu
   addCSS(`${SN}-menus`,
      `li[id|="${SN}"] a { cursor: pointer; }
      li[id|="${SN}"] .dropdown-menu li a.${SN}-save { color: #900!important; font-weight: bold; text-align: center; padding-bottom: 0.75em!important; }
      li[id|="${SN}"] .dropdown-menu input[type="number"], li[id |= "${SN}"] .dropdown-menu input[type="text"] { width: 3em; padding: 0 0 0 .2em; margin: 0; background: #fff; }
      li[id|="${SN}"] .dropdown-menu input[type="checkbox"] { margin: 0; }
      li[id|="${SN}"] .dropdown-menu textarea { font-size: .9em; line-height: 1.2em; min-height: 4em; padding: .3em; margin: .1em .5em; width: calc(100% - 1em); box-sizing: border-box; resize: vertical; }
      li[id|="${SN}"] .${SN}-opts { display: flex!important; flex-wrap: nowrap; align-items: center; }
      li[id|="${SN}"] .${SN}-opts span { width: 25%; flex: auto; font-size: .75em; text-transform: uppercase; padding: .3em 0; }

      #${SN}-black .dropdown-menu { width: 28em; }
      #${SN}-black .dropdown-menu .${SN}-opts { text-align: center!important; }
      #${SN}-black .dropdown-menu input[type="text"] { width: 8em; }

      #${SN}-book .${SN}-opts a:first-child { flex-grow: 1; font-size: .9em; }
      a.${SN}-book-delete { color: #900!important; }
      div[class*="${SN}-book"] a { margin: 1em .2em 0 0; font-size: .8em; cursor: pointer; }
      .${SN}-book-left { position: fixed; left: 0; bottom: 0; margin: 0 0 .8em .5em; z-index: 999; }
      .${SN}-book-top { text-align: right;}
      .${SN}-no-book { display: none!important; }

      #${SN}-style { position: fixed; bottom: 0; right: 0; margin: 0 .5em .8em 0; padding: 0; border-radius: .3em; background-color: transparent; text-align: right; font-size: .9em; z-index: 999; }
      #${SN}-style:not(.${SN}-style-hide) { width: 25em; }
      #${SN}-style.${SN}-style-hide > div { display: none; }
      #${SN}-style > div { color: #000; background-color: #ddd;  padding: 0 .5em; box-shadow: 1px 1px 3px -1px #444; margin: 0; border-radius: .2em; }
      #${SN}-style label { display: block; border-bottom: 1px solid #888; padding: .2em 0; margin: 0; }
      #${SN}-style input, #${SN}-style select { width: 50%; padding: 0; margin: 0 0 0 1em; vertical-align: middle; }
      #${SN}-style button { margin: .3em .2em; }
      #${SN}-style-button { padding: 0 .3em; }

      .${SN}-words { font-size: .7em; color: inherit; font-family: consolas, monospace; text-transform: uppercase; text-align: center; margin: 3em 0 .5em; }`
   );

   let featureMenu = document.createElement('li');
   featureMenu.id = `${SN}-feature`;
   featureMenu.className = 'dropdown';
   featureMenu.innerHTML = `<a style="font-weight: bold;">Features</a>
      <ul class="menu dropdown-menu">
         <li><a><input id="${SN}-feature-style" type="checkbox" ${Feature.style ? 'checked' : ''}> Styling</a></li>
         <li><a><input id="${SN}-feature-book" type="checkbox" ${Feature.book ? 'checked' : ''}> Bookmarks / Full Screen</a></li>
         <li><a><input id="${SN}-feature-black" type="checkbox" ${Feature.black ? 'checked' : ''}> Blacklist</a></li>
         <li><a><input id="${SN}-feature-wpm" type="number" min="0" max="1000" step="10" value="${Feature.wpm}"> Words per minute</a></li>
         <li><a class="${SN}-save" id="${SN}-feature-save">SAVE</a></li>
      </ul>`;
   document.querySelector('#header > ul').appendChild(featureMenu);

   document.getElementById(`${SN}-feature-save`).addEventListener('click', function() {
      Feature.style = document.getElementById(`${SN}-feature-style`).checked;
      Feature.book = document.getElementById(`${SN}-feature-book`).checked;
      Feature.black = document.getElementById(`${SN}-feature-black`).checked;
      let wpm = document.getElementById(`${SN}-feature-wpm`).value.trim();
      Feature.wpm = wpm ? Math.min(Math.max(parseInt(wpm, 10), 0), 1000) : 0;
      setStorage('feature', Feature);
      this.textContent = 'SAVING...';
      window.location.replace(window.location.href);
   });


   // add estimated reading time for every fic found
   if (Feature.wpm) {
      document.querySelectorAll('dl.stats dd.words').forEach(w => {
         let numWords = w.textContent.replace(/,/g, '');
         w.insertAdjacentHTML('afterend', `<dt>Time:</dt><dd>${countTime(numWords)}</dd>`);
      });
   }


   /** BOOKMARKS **/
   let Bookmarks = {};

   if (Feature.book) {
      Bookmarks = {
         list: [],
         getValues: async function() {
            this.list = await getStorage('bookmarks', '[]');
         },
         setValues: function() {
            setStorage('bookmarks', this.list);
         },
         fromBook: window.location.search === '?bookmark',
         getUrl: window.location.pathname.split('/works/')[1],
         getTitle: function() {
            let title = document.querySelector('#workskin .preface.group h2.title.heading').textContent.trim().substring(0, 28);
            // get the number of the chapter if chapter by chapter
            if (this.getUrl.includes('/chapters/')) title += ` (${document.querySelector('#chapters > .chapter > .chapter.preface.group > h3 > a').textContent.replace('Chapter ', 'ch')})`;
            return title;
         },
         getPosition: function() {
            let position = getScroll();
            // calculate % if chapter by chapter view or work completed (number/number is the same)
            if (window.location.pathname.includes('/chapters/') || /(\d+)\/\1/.test(document.querySelector('dl.stats dd.chapters').textContent)) position = (position / getDocHeight()).toFixed(4) + '%';
            return position;
         },
         checkIfExist: function(what, link) {
            let url = link || this.getUrl;
            let book = false;
            this.list.some((bm, i) => {
               // check if the same fic already exists
               if (bm[0].split('/chapters/')[0] === url.split('/chapters/')[0]) {
                  // i need the index to delete the old bookmark (for change or delete)
                  if (what === 'cancel') {
                     book = i;
                     return true;
                  // check if the same chapter
                  } else if (bm[0] === url) {
                     // retrieve the bookmark position
                     if (what === 'book') {
                        book = bm[2];
                        // if the bookmark is in %
                        if (book.toString().includes('%')) book = parseFloat(book.replace('%', '')) * getDocHeight();
                     // just check if a bookmark exist
                     } else {
                        book = true;
                     }
                     return true;
                  }
               }
               return false;
            });
            return book;
         },
         cancel: function(url) {
            let found = this.checkIfExist('cancel', url);
            // !== false because it can return 0 for the index
            if (found !== false) this.list.splice(found, 1);
         },
         getNew: function() {
            this.cancel();
            this.list.push([this.getUrl, this.getTitle(), this.getPosition()]);
            this.setValues();
         },
         html: function() {
            let bookMenu = document.createElement('li');
            bookMenu.id = `${SN}-book`;
            bookMenu.className = 'dropdown';
            bookMenu.innerHTML = '<a>Bookmarks</a>';
            let bookMenuDrop = document.createElement('ul');
            bookMenuDrop.className = 'menu dropdown-menu';
            bookMenu.appendChild(bookMenuDrop);
            document.querySelector('#header > ul').appendChild(bookMenu);

            if (this.list.length) {
               let self = this;
               let clickDelete = function() {
                  self.cancel(this.getAttribute('data-url'));
                  self.setValues();
                  this.style.display = 'none';
                  this.previousSibling.style.opacity = '.4';
               };

               this.list.forEach(item => {
                  let bookMenuLi = document.createElement('li');
                  bookMenuLi.className = `${SN}-opts`;
                  bookMenuLi.innerHTML = `<a href="https://archiveofourown.org/works/${item[0]}?bookmark">${item[1]}</a>`;
                  let bookMenuDelete = document.createElement('a');
                  bookMenuDelete.className = `${SN}-book-delete`;
                  bookMenuDelete.title = 'delete bookmark';
                  bookMenuDelete.setAttribute('data-url', item[0]);
                  bookMenuDelete.textContent = 'x';
                  bookMenuDelete.addEventListener('click', clickDelete);
                  bookMenuLi.appendChild(bookMenuDelete);
                  bookMenuDrop.appendChild(bookMenuLi);
               });
            } else {
               bookMenuDrop.innerHTML = '<li><a>No bookmark yet.</a></li>';
            }
         }
      };
      await Bookmarks.getValues();
      Bookmarks.html();
   }


   /** FIC'S STYLE + FULLSCREEN + BOOKMARKING **/
   if (Check.work()) {

      if (Feature.style) {
         addCSS(`${SN}-generalstyle`,
            `#main div.wrapper { margin-bottom: 1em; }
            #workskin { margin: 0; max-width: none!important; }
            #workskin .notes, #workskin .summary, blockquote { font-size: inherit; font-family: inherit; }
            .preface a, #chapters a, .preface a:link, #chapters a:link, .preface a:visited, #chapters a:visited, .preface a:visited:hover, #chapters a:visited:hover { color: inherit !important; }
            .actions { font-family: 'Lucida Grande', 'Lucida Sans Unicode', 'GNU Unifont', Verdana, Helvetica, sans-serif; font-size: 14px; }
            .chapter .preface { border-top: 0; margin-bottom: 0; padding: 0 2em; }
            .chapter .preface[role="complementary"] { border-width: 0; margin: 0; }
            .preface.group, div.preface { color: inherit; background-color: inherit; margin-left: 0; margin-right: 0; padding: 0 2em; }
            #workskin #chapters .preface .userstuff p, #workskin .preface .userstuff p  { margin: .1em auto; line-height: 1.1em; }
            div.preface .byline a, #workskin #chapters a, #chapters a:link, #chapters a:visited { color: inherit; }
            div.preface .notes, div.preface .summary, div.preface .series, div.preface .children { min-height: 0; }
            div.preface .jump { margin-top: 1em; font-size: .9em; }
            .preface blockquote { box-shadow: 0 0 0 2px rgba(0, 0, 0, .1), 0 0 0 2px rgba(255, 255, 255, .2); padding: .6em; margin: 0; }
            .preface h3.title { background: repeating-linear-gradient(45deg, rgba(0, 0, 0, .05), rgba(0, 0, 0, .1) 2px, rgba(255, 255, 255, .2) 2px, rgba(255, 255, 255, .2) 4px); padding: .6em; margin: 0; }
            .preface h3.heading { font-size: inherit; border-width: 0; }
            h3.title a { border: 0; font-style: italic; }
            div.preface .associations, .preface .notes h3+p { margin-bottom: 0; font-style: italic; font-size: .8em; }
            #workskin #chapters, #workskin #chapters .userstuff { width: 100%!important; box-sizing: border-box; }
            #workskin #chapters .userstuff, #workskin #chapters .userstuff p { font-family: inherit; }
            #workskin #chapters .userstuff br { display: block; margin-top: .6em; content: " "; }
            .userstuff hr { width: 100%; height: 2px; border: 0; margin: 1.5em 0; background-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, .2), transparent), linear-gradient(90deg, transparent, rgba(255, 255, 255, .3), transparent); }
            #workskin #chapters .userstuff blockquote { padding-top: 1px; padding-bottom: 1px; margin: 0 .5em; font-size: inherit; }
            .userstuff img { max-width: 100%; height: auto; display: block; margin: auto; }`
         );

         // CSS changes depending on the user
         const Styling = {
            opts: {
               fontName: 'Default',
               colors: 'light',
               textAlign: 'justify',
               fontSize: '100',
               margins: '7',
               lineSpacing: '5'
            },
            inputs: [
               // 0:id, 1:name, 2+:options
               ['fontName', 'Font', 'Default', 'Arial Black', 'Helvetica', 'Verdana', 'Segoe UI', 'Garamond', 'Georgia', 'Times New Roman', 'Consolas', 'Courier'],
               ['colors', 'Background', 'light', 'grey', 'sepia', 'dark', 'darkblue', 'black'],
               ['textAlign', 'Alignment', 'justify', 'left', 'center', 'right'],
               ['fontSize', 'Text Size', 100, 50, 300],
               ['margins', 'Page Margins', 7, 5, 40],
               ['lineSpacing', 'Line Spacing', 5, 3, 10]
            ],
            fonts: {
               'inherit': 'inherit', // old default
               'Default': 'inherit',
               'Arial Black': 'Arial Black, Arial Bold, Gadget, sans-serif',
               'Helvetica': 'Helvetica, Helvetica Neue, sans-serif',
               'Verdana': 'Verdana, Tahoma, sans-serif',
               'Segoe UI': 'Segoe UI, Trebuchet MS, sans-serif',
               'Garamond': 'Garamond, Book Antiqua, Palatino, Baskerville, serif',
               'Georgia': 'Georgia, serif',
               'Times New Roman': 'Times New Roman, Times, serif',
               'Consolas': 'Consolas, Lucida Console, monospace',
               'Courier': 'Courier, Courier New, monospace'
            },
            colors: {
               // background, font color
               light: ['#ffffff', '#000000'],
               grey: ['#e6e6e6', '#111111'],
               sepia: ['#fbf0d9', '#54331b'],
               dark: ['#333333', '#e1e1e1'],
               darkblue: ['#282a36', '#f8f8e6'],
               black: ['#000000', '#ffffff']
            },
            getValues: async function() {
               Object.assign(this.opts, await getStorage('styling', '{}'));
            },
            setValues: function() {
               setStorage('styling', this.opts);
               addCSS(`${SN}-userstyle`,
                  `#workskin { font-family: ${this.fonts[this.opts.fontName]}; font-size: ${this.opts.fontSize}%; padding: 0 ${this.opts.margins}%; color: ${this.colors[this.opts.colors][1]}; background-color: ${this.colors[this.opts.colors][0]}; text-align: ${this.opts.textAlign}; }
                  #workskin #chapters .userstuff { line-height: ${this.opts.lineSpacing * 0.3}em; text-align: ${this.opts.textAlign}; }
                  #workskin #chapters .userstuff p { line-height: ${this.opts.lineSpacing * 0.3}em; margin: ${this.opts.lineSpacing * 0.5 - 1.4}em auto; text-align: ${this.opts.textAlign}; }`
               );
            },
            html: function() {
               this.setValues();

               // the options displayed on the page
               let styleMenu = document.createElement('div');
               styleMenu.id = `${SN}-style`;
               styleMenu.className = `${SN}-style-hide`;

               let h = '';
               this.inputs.forEach(item => {
                  h += `<label>${item[1]}`;
                  if (typeof item[2] === 'string') {
                     h += `<select id="${item[0]}">`;
                     for (let i = 2; i < item.length; i++) {
                        h += `<option value="${item[i]}" ${item[i] === this.opts[item[0]] ? 'selected' : ''}>${item[i]}</option>`;
                     }
                     h += '</select>';
                  } else {
                     h += `<input type="range" min="${item[3]}" max="${item[4]}" id="${item[0]}" value="${this.opts[item[0]]}">`;
                  }
                  h += '</label>';
               });
               styleMenu.innerHTML = `<div>${h}<button id="${SN}-style-save">save</button><button id="${SN}-style-reset">reset</button></div><button id="${SN}-style-button">&#9776;</button>`;

               document.body.appendChild(styleMenu);

               document.getElementById(`${SN}-style-save`).addEventListener('click', () => {
                  let pos = getScroll() / getDocHeight();
                  this.inputs.forEach(item => { this.opts[item[0]] = styleMenu.querySelector(`#${item[0]}`).value; });
                  this.setValues();
                  setScroll(pos * getDocHeight());
               });

               document.getElementById(`${SN}-style-reset`).addEventListener('click', () => {
                  let pos = getScroll() / getDocHeight();
                  styleMenu.parentElement.removeChild(styleMenu);
                  this.inputs.forEach(item => { this.opts[item[0]] = item[2]; });
                  this.html();
                  setScroll(pos * getDocHeight());
               });

               document.getElementById(`${SN}-style-button`).addEventListener('click', function() {
                  this.parentElement.className = this.parentElement.className ? '' : `${SN}-style-hide`;
               });
            }
         };
         await Styling.getValues();
         Styling.html();

      } // END Feature.style


      // # words and time for every chapter, if the fic has chapters
      if (Feature.wpm) {
         document.querySelectorAll('#chapters > .chapter > div.userstuff.module').forEach(el => {
            let numWords = el.textContent.replace(/['’‘-]/g, '').match(/\w+/g).length - 2; // -2 because of hidden <h3>Chapter Text</h3>
            el.parentElement.insertAdjacentHTML('afterbegin', `<div class="${SN}-words">this chapter has ${numWords} words (time: ${countTime(numWords)})</div>`);
         });
      }


      // FULL SCREEN
      if (Feature.book) {
         let workskin = document.getElementById('workskin');

         let ficTop = document.createElement('div');
         ficTop.className = `actions ${SN}-book-top`;
         let toFullScreen = document.createElement('a');
         toFullScreen.textContent = 'Full Screen';
         ficTop.appendChild(toFullScreen);
         workskin.insertAdjacentElement('afterbegin', ficTop);

         // changes to create full screen
         let fullScreen = () => {
            if (Check.fullScreen) {
               window.location.replace(window.location.pathname);
               return;
            }

            setScroll(0);
            Check.fullScreen = true;

            addCSS(`${SN}-fullscreen`,
               `#outer { display: none; }
               #workskin .preface { margin: 0; padding-bottom: 0; }
               div.preface .notes, div.preface .summary, div.preface .series, div.preface .children { min-height: 0; }
               div.preface .module { padding-bottom: 0; text-align: center; }
               .preface .module h3.heading { display: inline; cursor: pointer; text-align: center; opacity: .5; font-style: italic; font-size: 100%; }
               .preface .module > :not(h3) { display: none; }
               .preface h3 + p { border: 3px solid rgba(0, 0, 0, .1); border-left: 0; border-right: 0; padding: .6em; margin: 0; }
               .preface .module > h3:hover ~ .userstuff, .preface .module > .userstuff:hover, .preface .module > h3:hover ~ ul, .preface .module > ul:hover, .preface .module > h3:hover + p, .preface .module > h3 + p:hover { display: block!important; position: absolute; width: 100%; max-height: 6em; font-size: .8em; transform: translateY(-100%); color: rgb(42, 42, 42); background-color: #fff; padding: 10px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .4); margin: 0; overflow: auto; z-index: 999; cursor: pointer; }
               .actions:not(div[class*="${SN}-book"]) li > a:not([href*="chapters"]):not([href="#workskin"]) { display: none; }
               .actions:not(div[class*="${SN}-book"]) { margin-top: 2em; }`
            );

            document.body.appendChild(workskin);
            toFullScreen.textContent = 'Exit';

            let goToBook = document.createElement('a');
            goToBook.textContent = 'Go to Bookmark';
            goToBook.addEventListener('click', () => { setScroll(Bookmarks.checkIfExist('book')); });

            let ficLeft = document.createElement('div');
            ficLeft.className = `actions ${SN}-book-left`;

            let deleteBook = document.createElement('a');
            deleteBook.title = 'delete bookmark';
            deleteBook.textContent = 'x';
            deleteBook.addEventListener('click', () => {
               Bookmarks.cancel();
               Bookmarks.setValues();
               goToBook.className = `${SN}-no-book`;
               deleteBook.className = `${SN}-no-book`;
            });

            let newBook = document.createElement('a');
            newBook.title = 'new bookmark';
            newBook.textContent = '+';
            newBook.addEventListener('click', function() {
               Bookmarks.getNew();
               goToBook.className = '';
               deleteBook.className = '';
               this.textContent = 'saved';
               setTimeout(() => { this.textContent = '+'; }, 1000);
            });

            if (!Bookmarks.checkIfExist()) {
               goToBook.className = `${SN}-no-book`;
               deleteBook.className = `${SN}-no-book`;
            }

            ficTop.insertAdjacentElement('afterbegin', goToBook);
            ficLeft.appendChild(newBook);
            ficLeft.appendChild(deleteBook);
            document.body.appendChild(ficLeft);

            document.querySelector('#feedback .actions a[href="#main"]').href = '#workskin';
            workskin.appendChild(document.querySelector('#feedback .actions'));
         };
         if (Bookmarks.fromBook) fullScreen();
         toFullScreen.addEventListener('click', fullScreen);

      } // END Feature.book


      // remove all the non-breaking white spaces
      document.getElementById('chapters').innerHTML = document.getElementById('chapters').innerHTML.replace(/&nbsp;/g, ' ');

   } // END Check.work()


   /** BLACKLIST **/
   if (Feature.black && Check.black()) {
      addCSS(`${SN}-blacklisting`,
         `[data-${SN}-visibility="remove"], [data-${SN}-visibility="hide"] > :not(.header), [data-${SN}-visibility="hide"] > .header > :not(h4) { display: none!important; }
         [data-${SN}-visibility="hide"] > .header, [data-${SN}-visibility="hide"] > .header > h4 { margin: 0!important; min-height: auto; font-size: .9em; font-style: italic; }
         [data-${SN}-visibility="hide"] { opacity: .6; }
         [data-${SN}-visibility="hide"]::before { content: "\\2573  " attr(data-${SN}-reasons); font-size: .8em; }`
      );

      const Blacklist = {
         lists : {
            Tag: [],
            Text: [],
            Author: []
         },
         opts: {
            show: true,
            pause: false,
            maxTags: 0,
            maxFandoms: 0,
            maxRelations: 0,
            minIncomplete: 0,
            minChapters: 0,
            maxChapters: 0,
            minWords: 0,
            maxWords: 0,
            langs: ''
         },
         blurb: 'li.blurb.group',
         getValues: async function() {
            this.lists.Tag = await getStorage('blacklistTags', '[]');
            this.lists.Text = await getStorage('blacklistText', '[]');
            this.lists.Author = await getStorage('blacklistAuthors', '[]');
            Object.assign(this.opts, await getStorage('blacklistOpts', '{}'));
         },
         findTags: function(w) {
            return this.opts.maxTags && w.querySelectorAll('.tag').length > this.opts.maxTags;
         },
         findFandoms: function(w) {
            return this.opts.maxFandoms && w.querySelectorAll('.header .fandoms .tag').length > this.opts.maxFandoms;
         },
         findRelations: function(w) {
            return this.opts.maxRelations && w.querySelectorAll('.tags .relationships .tag').length > this.opts.maxRelations;
         },
         findLangs: function(w) {
            return this.opts.langs && w.querySelector('dd.language') && !this.opts.langs.toLowerCase().includes(w.querySelector('dd.language').textContent.toLowerCase().trim());
         },
         getChapters: function(w) {
            if ((this.opts.minChapters || this.opts.maxChapters) && w.querySelector('dd.chapters')) {
               let numCh = parseInt(w.querySelector('dd.chapters').textContent.split('/')[0], 10);
               if (this.opts.minChapters && numCh < this.opts.minChapters || this.opts.maxChapters && numCh > this.opts.maxChapters) {
                  return `Chapters: ${numCh}`;
               }
            }
            return [];
         },
         getWords: function(w) {
            if ((this.opts.minWords || this.opts.maxWords) && w.querySelector('dd.words')) {
               let numWords = parseInt(w.querySelector('dd.words').textContent.replace(/,/g, ''), 10) / 1000;
               if (this.opts.minWords && numWords < this.opts.minWords || this.opts.maxWords && numWords > this.opts.maxWords) {
                  return `Words: ${Math.round(numWords*1000)}`;
               }
            }
            return [];
         },
         getIncomplete: function(w) {
            if (this.opts.minIncomplete && w.querySelector('.required-tags .complete-no')) {
               // millisecs in an average month = 30.4days*24hrs*60mins*60secs*1000
               let updated = (Date.now() - new Date(w.querySelector('.datetime').textContent).getTime()) / (30.4*24*60*60*1000);
               if (updated > this.opts.minIncomplete) return `Updated: ${Math.floor(updated)}mnth ago`;
            }
            return [];
         },
         ifMatch: function(t, list, m) {
            let found = false;
            this.lists[list].some(v => {
               let b = v.trim().replace(/[.+?^${}()|[\]\\]/g, '\\$&');
               if (!b) return false;

               // wildcard
               b = b.replace(/\*/g, '.*');
               // match 2 words in any order
               b = b.replace(/(.+)&&(.+)/, '(?=.*$1)(?=.*$2).*');
               // only otp
               if (t.parent === 'relationships') b = b.replace(/(.+)&!(.+)/, '(?=.*\\/)((?=.*$1)(?!.*$2)|(?=.*$2)(?!.*$1)).*');

               let regex;
               if (m === 'free') regex = new RegExp(b, 'i'); // for text
               else regex = new RegExp(`^${b}$`, 'i');

               if (regex.test(t.text)) {
                  if (m === 'free') found = `${list}: ${v}`; // show the rule that matched (for text)
                  else if (t.parent === 'heading') found = list; // show only list name (for author)
                  else found = `${list}: ${t.text}`; // show the entire matched tag
                  return true;
               }
               return false;
            });
            return found;
         },
         getReasons: function(w, list, where, m) {
            if (!this.lists[list].length) return [];
            return Array.prototype.reduce.call(w.querySelectorAll(where), (filtered, t) => {
               let found = this.ifMatch({ text: t.textContent.trim(), parent: t.parentElement.className }, list, m);
               if (found) filtered.push(found);
               return filtered;
            }, []);
         },
         setVisibility: function() {
            if (this.opts.pause) return;
            document.querySelectorAll(this.blurb).forEach(w => {
               let reasons = []
                  .concat(this.getReasons(w, 'Author', 'h4.heading a[rel="author"]', ''))
                  .concat(this.getIncomplete(w))
                  .concat(this.getWords(w))
                  .concat(this.getChapters(w))
                  .concat(this.getReasons(w, 'Text', 'h4.heading a:first-child, .summary', 'free'))
                  .concat(this.getReasons(w, 'Tag', '.tags .tag, .required-tags span:not(.warnings) span.text, .header .fandoms .tag', ''));
               if (this.findRelations(w)) reasons.unshift('Relations');
               if (this.findFandoms(w)) reasons.unshift('Fandoms');
               if (this.findTags(w)) reasons.unshift('Tags');
               if (this.findLangs(w)) reasons.unshift('Language');
               if (!reasons.length) return;

               if (this.opts.show) {
                  w.setAttribute(`data-${SN}-visibility`, 'hide');
                  w.setAttribute(`data-${SN}-reasons`, reasons.join(' - '));
               } else {
                  w.setAttribute(`data-${SN}-visibility`, 'remove');
               }
            });
         },
         getArray: function(string) {
            return string.trim() ? string.split(',').filter(s => s.trim().length) : [];
         },
         getInt: function(string, min = 0) {
            let number = string.trim() ? Math.max(parseInt(string, 10), 0) : 0;
            if (number < min) number = 0;
            return number;
         },
         setValues: function() {
            this.lists.Tag = this.getArray(document.getElementById(`${SN}-black-tags`).value);
            this.lists.Text = this.getArray(document.getElementById(`${SN}-black-text`).value);
            this.lists.Author = this.getArray(document.getElementById(`${SN}-black-authors`).value);
            this.opts.maxTags = this.getInt(document.getElementById(`${SN}-black-maxTags`).value);
            this.opts.maxFandoms = this.getInt(document.getElementById(`${SN}-black-maxFandoms`).value);
            this.opts.maxRelations = this.getInt(document.getElementById(`${SN}-black-maxRelations`).value);
            this.opts.minIncomplete = this.getInt(document.getElementById(`${SN}-black-minIncomplete`).value);
            this.opts.minChapters = this.getInt(document.getElementById(`${SN}-black-minChapters`).value);
            this.opts.maxChapters = this.getInt(document.getElementById(`${SN}-black-maxChapters`).value, this.opts.minChapters);
            this.opts.minWords = this.getInt(document.getElementById(`${SN}-black-minWords`).value);
            this.opts.maxWords = this.getInt(document.getElementById(`${SN}-black-maxWords`).value, this.opts.minWords);
            this.opts.langs = document.getElementById(`${SN}-black-langs`).value;
            this.opts.show = document.getElementById(`${SN}-black-show`).checked;
            this.opts.pause = document.getElementById(`${SN}-black-pause`).checked;
            setStorage('blacklistTags', this.lists.Tag);
            setStorage('blacklistText', this.lists.Text);
            setStorage('blacklistAuthors', this.lists.Author);
            setStorage('blacklistOpts', this.opts);
            
            document.querySelectorAll(`${this.blurb}[data-${SN}-visibility]`).forEach(el => {
               el.removeAttribute(`data-${SN}-visibility`);
               el.removeAttribute(`data-${SN}-reasons`);
            });

            this.setVisibility();
         },
         html: function() {
            let blackMenu = document.createElement('li');
            blackMenu.id = `${SN}-black`;
            blackMenu.className = 'dropdown';
            blackMenu.innerHTML = `<a>Blacklist</a>
               <ul class="menu dropdown-menu">
                  <li>
                     <a class="${SN}-save" id="${SN}-black-save">SAVE</a>
                  </li><li class="${SN}-opts">
                     <span>SHOW REASONS <input id="${SN}-black-show" type="checkbox" ${this.opts.show ? 'checked' : ''}></span>
                     <span>PAUSE <input id="${SN}-black-pause" type="checkbox" ${this.opts.pause ? 'checked' : ''}></span>
                     <span title="show only specified">languages<br><input type="text" id="${SN}-black-langs" spellcheck="false" title="separate languages by a space" value="${this.opts.langs}"></span>
                  </li><li class="${SN}-opts">
                     <span title="for works in progress only">updated<br>max <input id="${SN}-black-minIncomplete" type="number" min="0" step="1" title="in months" value="${this.opts.minIncomplete}"></span>
                     <span>tags<br>max <input id="${SN}-black-maxTags" type="number" min="0" step="1" value="${this.opts.maxTags}"></span>
                     <span>fandoms<br>max <input id="${SN}-black-maxFandoms" type="number" min="0" step="1" value="${this.opts.maxFandoms}"></span>
                     <span>relations<br>max <input id="${SN}-black-maxRelations" type="number" min="0" step="1" value="${this.opts.maxRelations}"></span>
                  </li><li class="${SN}-opts">
                     <span>chapters<br>min <input id="${SN}-black-minChapters" type="number" min="0" step="1" value="${this.opts.minChapters}"> max <input id="${SN}-black-maxChapters" type="number" min="0" step="1" value="${this.opts.maxChapters}"></span>
                     <span>words<br>min <input id="${SN}-black-minWords" type="number" min="0" step="1" title="in thousands" value="${this.opts.minWords}"> max <input id="${SN}-black-maxWords" type="number" min="0" step="1" title="in thousands" value="${this.opts.maxWords}"></span>
                  </li><li>
                     <span title="tags, fandoms, relations, characters, ratings, warnings, categories, status">tags</span>
                     <textarea id="${SN}-black-tags" spellcheck="false">${this.lists.Tag.join(',')}</textarea>
                     <span>titles, summaries</span>
                     <textarea id="${SN}-black-text" spellcheck="false">${this.lists.Text.join(',')}</textarea>
                     <span>authors</span>
                     <textarea id="${SN}-black-authors" spellcheck="false">${this.lists.Author.join(',')}</textarea>
                  </li><li class="${SN}-opts">
                     <span title="comma">separator: ,</span><span title="match zero or more of any character (letter, white space, symbol...)">wildcard: *</span><span title="match two pair of words in any order">pair: &&</span><span title="hide relationships that include only one person of your favourite ship (only for tags)">only otp: &!</span></div>
                  </li>
               </ul>`;
            document.querySelector('#header > ul').appendChild(blackMenu);

            document.getElementById(`${SN}-black-save`).addEventListener('click', function() {
               Blacklist.setValues();
               this.textContent = 'SAVED';
               setTimeout(() => { this.textContent = 'SAVE'; }, 1000);
            });
         }
      };
      await Blacklist.getValues();
      Blacklist.setVisibility();
      Blacklist.html();

   } // END Feature.black AND Check.black()


   /** GLOBAL FUNCTIONS **/

   async function getStorage(key, def) {
      // def must be a string
      return JSON.parse(await GM.getValue(key, def));
   }
   function setStorage(key, value) {
      // value can be any type
      GM.setValue(key, value !== 'string' ? JSON.stringify(value) : value);
   }

   function addCSS(id, css) {
      // unique id because of styling user changes
      if (!document.querySelector(`style#${id}`)) {
         let style = document.createElement('style');
         style.id = id;
         style.textContent = css;
         document.getElementsByTagName('head')[0].appendChild(style);
      } else {
         document.querySelector(`style#${id}`).textContent = css;
      }
   }

   function countTime(num) {
      // estimate reading time
      if (!num) return '?';
      num = Math.round(parseInt(num, 10) / Feature.wpm);
      let h = Math.floor(num / 60);
      let m = num % 60;
      return `${h > 0 ? `${h}hr ` : ''}${m > 0 ? `${m}min` : ''}` || '<1min';
   }

   function getScroll() {
      return Math.max(document.documentElement.scrollTop, window.scrollY, 0);
   }
   function setScroll(s) {
      window.scroll(0, s);
   }
   function getDocHeight() {
      return Math.max(document.documentElement.scrollHeight, document.documentElement.offsetHeight, document.body.scrollHeight, document.body.offsetHeight);
   }

})();
