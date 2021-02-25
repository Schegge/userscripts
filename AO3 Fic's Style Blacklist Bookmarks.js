// ==UserScript==
// @name         AO3: Fic's Style, Blacklist, Bookmarks
// @namespace    https://github.com/Schegge
// @version      3.5.2
// @description  Change font, size, width, background... of a work + blacklist: hide works that contain certains tags, have too many fandoms/relations/chapters/words and other options + fullscreen reading mode + bookmarks: save the position you stopped reading a fic + number of words for each chapter and estimated reading time
// @author       Schegge
// @include      http*://archiveofourown.org/*
// @grant        none
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc0REE4QjE3Qjk1ODExRTY4MEZCQTc3RERGMTNGQ0Y0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc0REE4QjE4Qjk1ODExRTY4MEZCQTc3RERGMTNGQ0Y0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzREQThCMTVCOTU4MTFFNjgwRkJBNzdEREYxM0ZDRjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzREQThCMTZCOTU4MTFFNjgwRkJBNzdEREYxM0ZDRjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz78uZUsAAACeUlEQVR42uxZvW7bMBCWDaFLuih9A3bJrqJLVhVdigwFZGQPIHdpO9aPYC+dGz1CNXXpEiFzFq0NMtjIE0QvYNQ9Bh+BA6Mf0rKkBuABHyxQJPHxdPfdSZ7sdjvvOdrUe6bmiDvijrgj7og/mn/oDX/4T7YMCAkhxLW0nJARNnzip+32v/H4N8KaEIHsipASBMYv2WHG9TizS3haEp1r96S3C8yRT+IdobTZfNLUq1Q89iYLQEJ6Nib8RCi8NjicfBKLsUJFhsUViCwxlrasSdlaMZaqJPi9YCSKljX8fjwG8YQl2Vs2nhusVXPCMYjHB9gjGJq4gNyV3oA2PVCYyFhd1BzK5OAm+dAL8RTarHs9NAiPUYirpFSkM+3+R8Pc2FSs7ZV4BG+XNbp93uD1gOn9fMgYF/BYpukyb5z+oihF2tozwh/CS8KtasBsKnUX4jFI5jXVUO3/G+V/jUPcE37hkCeEL6zqBkMQT2pKuj72gnBMmKEneYXQ+sAOnsLrcd/EY4RKFfFSG1dzC5C80/twliPGHvc7EC8aEm9TMX+F6zcNWp6bEtinrVUvATbW1N5GiG+pLKlpa+t3SMo2CQuZ3An2FsTbYHV/ZePtfT2+RgyvDKrig5a08wY9l8k+I49nfSSnSjSTzfUkTWqSr2ROWPalKklFkTHptZV9RYgENcks+lAVFacLizXqE4Qi9Bma7mmhJmrUqLPHA1S/fYyH1bGm2zxRPRun+AbKECFEBItDVVCKmnZUYG3I3kW5fUfneEM4xfyZTYfYRnxZ0SDxF+Mc30Sqkrgp0Y4I7wnXUJqN7WOcuP+AHHFH3BF3xB1xR9zC/gkwALX7mp/233xAAAAAAElFTkSuQmCC
// ==/UserScript==

(function() {
	const NAMESPACE = 'ficstyle';

	/** FEATURES **/
	const Feature = {
		style: true,
		book: true,
		black: true,
		wpm: 250
	}
	// Object.assign changes only the same keys
	Object.assign(Feature, getStorage(`${NAMESPACE}_feature`, '{}'));


	// check which page
	const Check = {
		// script version
		version: function() {
			if (getStorage(`${NAMESPACE}_version`, '1') !== 352) {
				setStorage(`${NAMESPACE}_version`, 352);
				return true;
			}
			return false;
		},
		// on search pages but not on personal user profile
		black: function() {
			let user = document.querySelector('#greeting .user a[href *= "/users/"]');
			user = user && window.location.pathname.includes(user.href.split('/users/')[1]);
			return document.querySelector('li.blurb.group:not(.collection)') && !user;
		},
		// include /works/(numbers) and /works/(numbers)/chapters/(numbers) and exclude /works/(whatever)navigate
		work: function() {
			return /\/works\/\d+(\/chapters\/\d+)?(?!.*navigate)/.test(window.location.pathname);
		},
		// Full Screen
		fullScreen: false
	};


	// new version notification + cleaning old stuff
	if (Check.version()) {
		localStorage.removeItem(`${NAMESPACE}_blacklist_langs`);
		if (localStorage.getItem(NAMESPACE)) {
			localStorage.setItem(`${NAMESPACE}_styling`, localStorage.getItem(NAMESPACE));
			localStorage.removeItem(NAMESPACE);
		}
		if (localStorage.getItem(`${NAMESPACE}_wpm`)) {
			Feature.wpm = localStorage.getItem(`${NAMESPACE}_wpm`);
			localStorage.removeItem(`${NAMESPACE}_wpm`);
		}
		document.body.insertAdjacentHTML('beforeend', `<div style="position: fixed; bottom: 50px; right: 50px; width: 40%; z-index: 999; font-size: .9em; background: #fff; padding: 1em; border: 1px solid #900;"><b>AO3: Fic's Style, Blacklist, Bookmarks</b> UPDATES (v3.5.2)<br><br>Every feature is now optional, you can disable them in the menu "Features".<br>Disabling them <i>doesn't</i> erase the values saved previously.<br>To disable the estimated reading time set the words per minute to 0.<br><br>I've slightly changed how to save of the preferences, none of them should be lost apart from your preferred languages in the blacklist.<br><br><a target="_blanket" href="https://greasyfork.org/en/scripts/10944-ao3-fic-s-style-blacklist-bookmarks">More info.</a><br><br><span id="${NAMESPACE}-close" style="cursor: pointer; color: #900;">close</span>`);
		document.getElementById(`${NAMESPACE}-close`).addEventListener('click', function() { this.parentElement.style.display = 'none'; });
	}


	// Features' menu
	addCSS(`${NAMESPACE}-menus`,
		`li[id |= "${NAMESPACE}"] > a { cursor: pointer; }
		li[id |= "${NAMESPACE}"] .dropdown-menu li > a { padding-bottom: 0.75em!important; }
		li[id |= "${NAMESPACE}"] .dropdown-menu li > a.${NAMESPACE}-menu-save { color: #900!important; font-weight: bold; text-align: center; }
		li[id |= "${NAMESPACE}"] .dropdown-menu li span { font-size: .85em; }
		li[id |= "${NAMESPACE}"] .dropdown-menu input[type="number"], li[id |= "${NAMESPACE}"] .dropdown-menu input[type="text"] { width: 4em; padding: 0 0 0 .2em; margin: .2em 0; background: #fff; border: 0; box-shadow: 0 0 0 1px #888; border-radius: 0; box-sizing: border-box; }
		li[id |= "${NAMESPACE}"] .dropdown-menu textarea { font-size: .9em; line-height: 1.2em; min-height: 10em; margin: .5em!important; padding: .3em; box-shadow: 0 0 0 1px #888; width: calc(100% - 1em); border: 0; box-sizing: border-box; resize: vertical; }
		li[id |= "${NAMESPACE}"] .opts { font-variant: small-caps; display: flex; flex-wrap: wrap; }
		li[id |= "${NAMESPACE}"] .opts span  { width: 50%; }
		li[id |= "${NAMESPACE}"] .opts span:last-of-type:nth-of-type(odd) { width: 100%; padding-bottom: 1em; }
		li[id |= "${NAMESPACE}"] .info { display: flex; flex-wrap: nowrap; font-size: .8em; }
		li[id |= "${NAMESPACE}"] .opts span, li[id |= "${NAMESPACE}"] .info span { flex: auto; }

		#${NAMESPACE}-book ul li { display: flex!important; justify-content: space-between; }
		#${NAMESPACE}-book ul li a:first-child { flex-grow: 1; font-size: .9em; }

		a.${NAMESPACE}-book-delete { color: #900!important; }
		.${NAMESPACE}-book-left { font-family: Consolas, monospace; left: 0; position: fixed; bottom: .8em; margin: 0; padding: 0 0 0 .5em; color: #000; text-shadow: 0 0 1px rgba(0, 0, 0, .4); border-radius: .3em; z-index: 999; }
		.${NAMESPACE}-book-left button { padding: 0 .2em; margin: 0 .2em 0 0; }
		.${NAMESPACE}-book-top { margin: 1em 0 0; font-size: 80%; text-align: right; padding: 0; }
		.${NAMESPACE}-no-book { display: none; }

		#${NAMESPACE}-black .dropdown-menu > li { text-align: center!important; }
		#${NAMESPACE}-black input[type="text"] { width: auto; }

		#${NAMESPACE}-style { position: fixed; bottom: .8em; margin: 0; padding: 0; color: #000; text-shadow: 0 0 1px rgba(0, 0, 0, .4); border-radius: .3em; z-index: 999; }
		#${NAMESPACE}-style { right: 0; background-color: transparent; text-align: right; margin-right: .5em; }
		#${NAMESPACE}-style:not(.${NAMESPACE}-options-hide) { width: 25em; }
		#${NAMESPACE}-style > button { padding: 0 .3em; }
		#${NAMESPACE}-style.${NAMESPACE}-options-hide > div { display: none; }
		#${NAMESPACE}-style > div { background-color: #ddd;  padding: .5em; box-shadow: 1px 1px 3px -1px #444; margin: 0; border-radius: .2em; }
		#${NAMESPACE}-style label { display: block; border-bottom: 1px solid #888; padding: .2em 0; margin: 0; }
		#${NAMESPACE}-style input, #${NAMESPACE}-style select { width: 50%; padding: 0; margin: 0 0 0 1em; font-size: 1em; }
		#${NAMESPACE}-style button { margin: .3em .2em; }

		.${NAMESPACE}-words { font-size: .7em; color: inherit; font-family: consolas, monospace; text-transform: uppercase; text-align: center; margin: 3em 0 .5em; }`
	);

	let featureMenu = document.createElement('li');
	featureMenu.id = `${NAMESPACE}-feature`;
	featureMenu.className = 'dropdown';
	featureMenu.innerHTML = `<a style="font-weight: bold;">Features</a>
		<ul class="menu dropdown-menu" role="menu">
			<li role="menu-item"><a><input id="${NAMESPACE}-feature-style" type="checkbox" ${Feature.style ? 'checked' : ''}> Styling</a></li>
			<li role="menu-item"><a><input id="${NAMESPACE}-feature-book" type="checkbox" ${Feature.book ? 'checked' : ''}> Bookmarks / Full Screen</a></li>
			<li role="menu-item"><a><input id="${NAMESPACE}-feature-black" type="checkbox" ${Feature.black ? 'checked' : ''}> Blacklist</a></li>
			<li role="menu-item"><a><input id="${NAMESPACE}-feature-wpm" type="number" min="0" max="1000" step="10" value="${Feature.wpm}"> Words per minute</a></li>
			<li role="menu-item"><a class="${NAMESPACE}-menu-save" id="${NAMESPACE}-feature-save">SAVE</a></li>
		</ul>`;
	document.querySelector('#header > ul').appendChild(featureMenu);

	document.getElementById(`${NAMESPACE}-feature-save`).addEventListener('click', function() {
		Feature.style = document.getElementById(`${NAMESPACE}-feature-style`).checked;
		Feature.book = document.getElementById(`${NAMESPACE}-feature-book`).checked;
		Feature.black = document.getElementById(`${NAMESPACE}-feature-black`).checked;
		let wpm = document.getElementById(`${NAMESPACE}-feature-wpm`).value;
		Feature.wpm = wpm ? Math.min(Math.max(parseInt(wpm, 10), 0), 1000) : 0;
		setStorage(`${NAMESPACE}_feature`, Feature);
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
	const Bookmarks = {
		list: [],
		get: function() {
			this.list = getStorage(`${NAMESPACE}_bookmarks`, '[]');
		},
		set: function() {
			setStorage(`${NAMESPACE}_bookmarks`, this.list);
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
			if (window.location.pathname.includes('/chapters/') || /(\d+)\/\1/.test(document.querySelector('dl.stats dd.chapters').textContent)) {
				position = (position / getDocHeight()).toFixed(4) + '%';
			}
			return position;
		},
		checkIfExist: function(what, link) {
			let url = link || this.getUrl;
			for (let i = 0, len = this.list.length; i < len; i++) {
				// check if the same fic already exists
				if (this.list[i][0].split('/chapters/')[0] === url.split('/chapters/')[0]) {
               // i need the index to delete the old bookmark (for change or cancel)
					if (what === 'cancel') {
						return i;
					// check if the same chapter
					} else if (this.list[i][0] === url) {
                  // retrieve the bookmark position
						if (what === 'book') {
							let book = this.list[i][2];
                     // if the bookmark is in %
							if (book.toString().includes('%')) {
								book = parseFloat(book.replace('%', ''));
								book *= getDocHeight();
							}
							return book;
						}
                  // just check if a bookmark exist
						return true;
					}
				}
			}
			return false;
		},
		cancel: function(url) {
			let found = this.checkIfExist('cancel', url);
			if (found !== false) this.list.splice(found, 1);
		},
		getNew: function() {
			this.cancel();
			this.list.push([this.getUrl, this.getTitle(), this.getPosition()]);
			this.set();
		},
		html: function() {
			let bookMenu = document.createElement('li');
			bookMenu.id = `${NAMESPACE}-book`;
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
					self.set();
					this.style.display = 'none';
					this.previousSibling.style.opacity = '.4';
				};

				this.list.forEach(item => {
					let bookMenuLi = document.createElement('li');
					bookMenuLi.innerHTML = `<a href="https://archiveofourown.org/works/${item[0]}?bookmark">${item[1]}</a>`;
					let bookMenuDelete = document.createElement('a');
					bookMenuDelete.className = `${NAMESPACE}-book-delete`;
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

	if (Feature.book) {
		Bookmarks.get();
		Bookmarks.html();
	}


	/** FIC'S STYLE + FULLSCREEN + BOOKMARKING **/
	if (Check.work()) {

		if (Feature.style) {
			addCSS(`${NAMESPACE}-generalstyle`,
				`#main div.wrapper { margin-bottom: 1em; }
				#workskin { margin: 0; text-align: justify; max-width: none!important; }
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
				#workskin #chapters .userstuff p { font-family: inherit; text-align: justify; }
				#workskin #chapters .userstuff { font-family: inherit; text-align: justify; }
				#workskin #chapters .userstuff br { display: block; margin-top: .6em; content: " "; }
				.userstuff hr { width: 100%; height: 2px; border: 0; margin: 1.5em 0; background-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, .2), transparent), linear-gradient(90deg, transparent, rgba(255, 255, 255, .3), transparent); }
				#workskin #chapters .userstuff blockquote { padding-top: 1px; padding-bottom: 1px; margin: 0 .5em; font-size: inherit; }
				.userstuff img { max-width: 100%; height: auto; display: block; margin: auto; }`
			);

			// CSS changes depending on the user
			const Styling = {
				opts: {
					fontName: 'inherit',
					colors: 'light',
					fontSize: '100',
					margins: '7',
					lineSpacing: '5'
				},
				choices: [
					// 0:css/id, 1:name, 2+:options
					['fontName', 'Font', 'inherit', 'Arial Black', 'Consolas', 'Courier', 'Garamond', 'Georgia', 'Helvetica', 'Segoe UI', 'Times New Roman', 'Verdana'],
					['colors', 'Background', 'light', 'grey', 'sepia', 'dark', 'darkblue', 'black'],
					['fontSize', 'Text Size', 100, 50, 300],
					['margins', 'Page Margins', 7, 5, 40],
					['lineSpacing', 'Line Spacing', 5, 3, 10]
				],
				colors: {
					// background, font color
					light: ['#ffffff', '#000000'],
					grey: ['#eeeeee', '#111111'],
					sepia: ['#fbf0d9', '#54331b'],
					dark: ['#333333', '#e1e1e1'],
					darkblue: ['#282a36', '#f8f8e6'],
					black: ['#000000', '#ffffff']
				},
				get: function() {
					Object.assign(this.opts, getStorage(`${NAMESPACE}_styling`, '{}'));
				},
				set: function() {
					setStorage(`${NAMESPACE}_styling`, this.opts);
					addCSS(`${NAMESPACE}-userstyle`,
						`#workskin { font-family: ${this.opts.fontName}; font-size: ${this.opts.fontSize}%; padding: 0 ${this.opts.margins}%; color: ${this.colors[this.opts.colors][1]}; background-color: ${this.colors[this.opts.colors][0]}; }
						#workskin #chapters .userstuff p { line-height: ${this.opts.lineSpacing * 0.3}em; margin: ${this.opts.lineSpacing * 0.5 - 1.4}em auto; } #workskin #chapters .userstuff { line-height: ${this.opts.lineSpacing * 0.3}em; }`
					);
				},
				setDefs: function() {
					this.opts = {
						fontName: this.choices[0][2],
						colors: this.choices[1][2],
						fontSize: this.choices[2][2],
						margins: this.choices[3][2],
						lineSpacing: this.choices[4][2]
					};
					this.set();
				},
				html: function() {
					this.set();

					// the options displayed on the page
					let styleMenu = document.createElement('div');
					styleMenu.id = `${NAMESPACE}-style`;
					styleMenu.className = `${NAMESPACE}-options-hide`;

					let styleMenuEls = document.createElement('div');
					styleMenu.appendChild(styleMenuEls);

					this.choices.forEach(item => {
						let el = document.createElement('label');
						let h = item[1];
						if (typeof item[2] === 'string') {
							h += `<select id="${item[0]}">`;
							for (let i = 2, len = item.length; i < len; i++) {
								h += `<option value="${item[i]}" ${item[i] === this.opts[item[0]] ? 'selected' : ''}>${item[i]}</option>`;
							}
							h += '</select>';
						} else {
							h += `<input type="range" min="${item[3]}" max="${item[4]}" id="${item[0]}" value="${this.opts[item[0]]}">`;
						}
						el.innerHTML = h;
						styleMenuEls.appendChild(el);
					});

					let save = document.createElement('button');
					save.innerHTML = 'save';
					save.addEventListener('click', () => {
						for (let i = 0, len = this.choices.length; i < len; i++) {
							this.opts[this.choices[i][0]] = styleMenuEls.querySelector(`#${this.choices[i][0]}`).value;
						}
						this.set();
					});
					styleMenuEls.appendChild(save);

					let reset = document.createElement('button');
					reset.innerHTML = 'reset';
					reset.addEventListener('click', () => {
						this.setDefs();
						styleMenu.parentElement.removeChild(styleMenu);
						this.html();
					});
					styleMenuEls.appendChild(reset);

					let styleMenuButton = document.createElement('button');
					styleMenuButton.innerHTML = '&#9776;';
					styleMenuButton.addEventListener('click', function() {
						if (this.parentElement.className === `${NAMESPACE}-options-hide`) {
							this.parentElement.className = '';
							this.innerHTML = 'close';
						} else {
							this.parentElement.className = `${NAMESPACE}-options-hide`;
							this.innerHTML = '&#9776;';
						}

					});
					styleMenu.appendChild(styleMenuButton);

					document.body.appendChild(styleMenu);
				}
			};
			Styling.get();
			Styling.html();

		} // END Feature.style

		// remove all the non-breaking white spaces
		document.getElementById('chapters').innerHTML = document.getElementById('chapters').innerHTML.replace(/&nbsp;/g, ' ');

		// # words and time for every chapter, if the fic has chapters
		if (Feature.wpm) {
			document.querySelectorAll('#chapters > .chapter > div.userstuff.module').forEach(el => {
				let numWords = el.textContent.match(/\S+\b/g).length - 2; // -2 because of hidden <h3>Chapter Text</h3>
				el.parentNode.querySelector('.chapter.preface.group[role="complementary"]').insertAdjacentHTML('beforebegin', `<div class="${NAMESPACE}-words">this chapter has ${numWords} words (time: ${countTime(numWords)})</div>`);
			});
		}

		// FULL SCREEN
		if (Feature.book) {
			let workskin = document.getElementById('workskin');

			let ficTop = document.createElement('div');
			ficTop.className = `actions ${NAMESPACE}-book-top`;
			let toFullScreen = document.createElement('div');
			toFullScreen.innerHTML = '<a>Full Screen</a>';
			ficTop.appendChild(toFullScreen);
			workskin.insertAdjacentElement('afterbegin', ficTop);

			// changes to create full screen
			let fullScreen = () => {
				if (Check.fullScreen) {
					window.location.replace(window.location.pathname);
					return;
				}

				setScroll();
				Check.fullScreen = true;

				addCSS(`${NAMESPACE}-fullscreen`,
					`#outer { display: none; }
					#workskin .preface { margin: 0; padding-bottom: 0; }
					div.preface .notes, div.preface .summary, div.preface .series, div.preface .children { min-height: 0; }
					div.preface .module { padding-bottom: 0; text-align: center; }
					.preface .module h3.heading { display: inline; cursor: pointer; text-align: center; opacity: .5; font-style: italic; font-size: 100%; }
					.preface .module > :not(h3) { display: none; }
					.preface h3 + p { border: 3px solid rgba(0, 0, 0, .1); border-left: 0; border-right: 0; padding: .6em; margin: 0; }
					.preface .module > h3:hover ~ .userstuff, .preface .module > .userstuff:hover, .preface .module > h3:hover ~ ul, .preface .module > ul:hover, .preface .module > h3:hover + p, .preface .module > h3 + p:hover { display: block!important; position: absolute; width: 100%; max-height: 6em; font-size: .8em; transform: translateY(-100%); color: rgb(42, 42, 42); background-color: #fff; padding: 10px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .4); margin: 0; overflow: auto; z-index: 999; cursor: pointer; }
					.actions:not(.${NAMESPACE}-book-top) li > a:not([href *= "chapters"]):not([href = "#workskin"]) { display: none; }
					.actions:not(.${NAMESPACE}-book-top) { margin-top: 2em; }`
				);

				document.body.appendChild(workskin);
				toFullScreen.innerHTML = '<a>Exit</a>';

				let goToBook = document.createElement('div');
				goToBook.innerHTML = '<a>Go to Bookmark</a>';
				goToBook.addEventListener('click', () => setScroll(Bookmarks.checkIfExist('book')));

				let ficLeft = document.createElement('div');
				ficLeft.className = `${NAMESPACE}-book-left`;

				let deleteBook = document.createElement('button');
				deleteBook.title = 'delete bookmark';
				deleteBook.textContent = 'x';
				deleteBook.addEventListener('click', () => {
					Bookmarks.cancel();
					Bookmarks.set();
					goToBook.className = `${NAMESPACE}-no-book`;
					deleteBook.className = `${NAMESPACE}-no-book`;
				});

				let newBook = document.createElement('button');
				newBook.title = 'new bookmark';
				newBook.textContent = '+';
				newBook.addEventListener('click', function() {
					Bookmarks.getNew();
					goToBook.className = '';
					deleteBook.className = '';
					this.textContent = 'saved';
					setTimeout(() => this.textContent = '+', 1000);
				});

				if (!Bookmarks.checkIfExist()) {
					goToBook.className = `${NAMESPACE}-no-book`;
					deleteBook.className = `${NAMESPACE}-no-book`;
				}

				ficTop.insertBefore(goToBook, toFullScreen);
				ficLeft.appendChild(newBook);
				ficLeft.appendChild(deleteBook);
				document.body.appendChild(ficLeft);

				(document.querySelector('#feedback .actions a[href="#main"]')).href = '#workskin';
				workskin.appendChild(document.querySelector('#feedback .actions'));
			};
			if (Bookmarks.fromBook) fullScreen();
			toFullScreen.addEventListener('click', fullScreen);

		} // END Feature.book

	} // END Check.work()


	/** BLACKLIST **/
	if (Feature.black && Check.black()) {
		addCSS(`${NAMESPACE}-blacklisting`,
			`[data-visibility="remove"], [data-visibility="hide"] > :not(.header), [data-visibility="hide"] > .header > :not(h4) { display: none!important; }
			[data-visibility="hide"] { opacity: .6; }
			[data-visibility="hide"] > .header, [data-visibility="hide"] > .header > h4 { margin: 0!important; min-height: auto; font-size: .9em; font-style: italic; }
			[data-visibility="hide"]::before { content: "\\2573  " attr(data-reasons); font-size: .8em; }`
		);

		const Blacklist = {
			list: [],
			opts: {
				show: true,
				pause: false,
				maxFandoms: 0,
				maxRelations: 0,
				minIncomplete: 0,
				maxChapters: 0,
				minWords: 0,
				maxWords: 0,
				langs: ''
			},
			where: 'li.blurb.group:not(.collection)',
			what: '.tags .tag, .required-tags span:not(.warnings) span.text, .header .fandoms .tag',
			get: function() {
				this.list = getStorage(`${NAMESPACE}_blacklist`, '[]');
				Object.assign(this.opts, getStorage(`${NAMESPACE}_blacklist_opts`, '{}'));
			},
			set: function(v) {
				this.list = v.list.trim() ? JSON.parse(`["${v.list.trim().replace(/[\\"]/g, '\\$&').replace(/\n/g, '\\n').split(',').join('","')}"]`) : [];
				setStorage(`${NAMESPACE}_blacklist`, this.list);
				this.opts.langs = v.langs.trim().replace(/[\\"]/g, '');
				this.opts.show = v.show;
				this.opts.pause = v.pause;
				this.opts.maxFandoms = v.maxFandoms ? Math.max(parseInt(v.maxFandoms, 10), 0) : 0;
				this.opts.maxRelations = v.maxRelations ? Math.max(parseInt(v.maxRelations, 10), 0) : 0;
				this.opts.minIncomplete = v.minIncomplete ? Math.max(parseInt(v.minIncomplete, 10), 0) : 0;
				this.opts.maxChapters = v.maxChapters ? Math.max(parseInt(v.maxChapters, 10), 0) : 0;
				this.opts.minWords = v.minWords ? Math.max(parseInt(v.minWords, 10), 0) : 0;
				this.opts.maxWords = v.maxWords ? Math.max(parseInt(v.maxWords, 10), 0) : 0;
				if (this.opts.maxWords > 0 && this.opts.minWords >= this.opts.maxWords) this.opts.maxWords = 0;
				setStorage(`${NAMESPACE}_blacklist_opts`, this.opts);
			},
			findFandoms: function(w) {
				return this.opts.maxFandoms && w.querySelectorAll('.header .fandoms .tag').length > this.opts.maxFandoms;
			},
			findRelations: function(w) {
				return this.opts.maxRelations && w.querySelectorAll('.tags .relationships .tag').length > this.opts.maxRelations;
			},
			findIncomplete: function(w) {
				if (!this.opts.minIncomplete || !w.querySelector('dd.chapters') || /(\d+)\/\1/.test(w.querySelector('dd.chapters').textContent)) return false;
				let today = new Date();
				let last = new Date(w.querySelector('.datetime').textContent);
				return Math.abs(last.getTime() - today.getTime()) / (1000 * 3600 * 24 * 30.4) > this.opts.minIncomplete;
			},
			findChapters: function(w) {
				return this.opts.maxChapters && w.querySelector('dd.chapters') && parseInt(w.querySelector('dd.chapters').textContent.split('/')[0], 10) > this.opts.maxChapters;
			},
			findWords: function(w) {
				if ((this.opts.minWords || this.opts.maxWords) && w.querySelector('dd.words')) {
					let numWords = parseInt(w.querySelector('dd.words').textContent.replace(/,/g, ''), 10) / 1000;
					if ((this.opts.minWords && numWords <= this.opts.minWords) || (this.opts.maxWords && numWords >= this.opts.maxWords)) return true;
				}
				return false;
			},
			findLangs: function(w) {
				return this.opts.langs && w.querySelector('dd.language') && !this.opts.langs.toLowerCase().includes(w.querySelector('dd.language').textContent.toLowerCase().trim());
			},
			findTags: function(w) {
				return Array.prototype.map.call(w.querySelectorAll(this.what), t => [t.textContent.trim(), t.parentElement.className]);
			},
			ifMatch: function(t) {
				return this.list.some(b => {
					b = b.trim().replace(/[.+?^${}()|[\]\\]/g, `\$&`);
					b = b.replace(/\*/g, '.*'); // wildcard
					b = b.replace(/(.+)&&(.+)/, '(?=.*$1)(?=.*$2).*'); // match 2 words in any order
					if (t[1] === 'relationships') b = b.replace(/(.+)&!(.+)/, '(?=.*\\/)((?=.*$1)(?!.*$2)|(?=.*$2)(?!.*$1)).*'); // only otp
					let reg = new RegExp('^' + b + '$', 'i');
					return reg.test(t[0]) === true;
				});
			},
			findMatch: function() {
				if (this.opts.pause) return;
				document.querySelectorAll(this.where).forEach(w => {
					if (this.opts.show) {
						let reasons = this.findTags(w).filter(this.ifMatch, this).map(t => t[0]);
						if (this.findRelations(w)) reasons.unshift('[Relationships]');
						if (this.findChapters(w)) reasons.unshift('[Chapters]');
						if (this.findWords(w)) reasons.unshift('[Words]');
						if (this.findFandoms(w)) reasons.unshift('[Fandoms]');
						if (this.findIncomplete(w)) reasons.unshift('[Incomplete]');
						if (this.findLangs(w)) reasons.unshift('[Language]');
						if (!reasons.length) return;
						w.setAttribute('data-visibility', 'hide');
						w.setAttribute('data-reasons', reasons.join(' - '));
					} else {
						if (!this.findLangs(w) && !this.findIncomplete(w) && !this.findFandoms(w) && !this.findChapters(w) && !this.findWords(w) && !this.findRelations(w) && !this.findTags(w).some(this.ifMatch, this)) return;
						w.setAttribute('data-visibility', 'remove');
					}
				});
			},
			clear: function() {
				document.querySelectorAll(this.where + '[data-visibility]').forEach(el => {
					el.removeAttribute('data-visibility');
					el.removeAttribute('data-reasons');
				});
			},
			save: function() {
				this.set({
					list: document.getElementById(`${NAMESPACE}-black-tags`).value,
					langs: document.getElementById(`${NAMESPACE}-black-langs`).value,
					show: document.getElementById(`${NAMESPACE}-black-show`).checked,
					pause: document.getElementById(`${NAMESPACE}-black-pause`).checked,
					maxFandoms: document.getElementById(`${NAMESPACE}-black-maxFandoms`).value,
					maxRelations: document.getElementById(`${NAMESPACE}-black-maxRelations`).value,
					minIncomplete: document.getElementById(`${NAMESPACE}-black-minIncomplete`).value,
					maxChapters: document.getElementById(`${NAMESPACE}-black-maxChapters`).value,
					minWords: document.getElementById(`${NAMESPACE}-black-minWords`).value,
					maxWords: document.getElementById(`${NAMESPACE}-black-maxWords`).value
				});
				this.clear();
				this.findMatch();
			},
			html: function() {
				let blackMenu = document.createElement('li');
				blackMenu.id = `${NAMESPACE}-black`;
				blackMenu.className = 'dropdown';
				blackMenu.innerHTML = `<a>Blacklist</a>
					<ul class="menu dropdown-menu" role="menu">
						<li role="menu-item"><a class="${NAMESPACE}-menu-save" id="${NAMESPACE}-black-save">SAVE</a></li>
						<li role="menu-item" style="padding: .5em 0;"><div class="opts"><span>SHOW REASONS <input id="${NAMESPACE}-black-show" type="checkbox" ${this.opts.show ? 'checked' : ''}></span> <span>PAUSE <input id="${NAMESPACE}-black-pause" type="checkbox" ${this.opts.pause ? 'checked' : ''}></span></div></li>
						<li role="menu-item" style="padding: .5em 0;">
							<div class="info"><span title="(comma)">separator: ,</span><span title="*: match zero or more of any character (letter, white space, symbol...) [it can be used multiple times in the same tag]">wildcard: *</span><span title="&&: match two pair of words in any order [it can be used only once in the same tag]">matched pair: &&</span><span title="&!: hide relationships that include only one person of your favourite ship [it can be used only once in the same tag]">only otp: &!</span></div>
							<textarea id="${NAMESPACE}-black-tags" spellcheck="false">${this.list.join(',')}</textarea>
							<div class="opts"><span>max fandoms <input id="${NAMESPACE}-black-maxFandoms" type="number" min="0" step="1" value="${this.opts.maxFandoms}"></span> <span>max relations <input id="${NAMESPACE}-black-maxRelations" type="number" min="0" step="1" value="${this.opts.maxRelations}"></span> <span>max chapters <input id="${NAMESPACE}-black-maxChapters" type="number" min="0" step="1" value="${this.opts.maxChapters}"></span> <span title="for incompleted works">last updated <input id="${NAMESPACE}-black-minIncomplete" type="number" min="0" step="1" title="in months" value="${this.opts.minIncomplete}"></span> <span>min words <input id="${NAMESPACE}-black-minWords" type="number" min="0" step="1" title="in thousands" value="${this.opts.minWords}"></span> <span>max words <input id="${NAMESPACE}-black-maxWords" type="number" min="0" step="1" title="in thousands" value="${this.opts.maxWords}"></span> <span title="show only specified">languages <input type="text" id="${NAMESPACE}-black-langs" spellcheck="false" placeholder="leave empty for any" title="separate languages by a space" value="${this.opts.langs}"></span></div>
						</li>
					</ul>`;
				document.querySelector('#header > ul').appendChild(blackMenu);

				document.getElementById(`${NAMESPACE}-black-save`).addEventListener('click', function() {
					Blacklist.save();
					this.textContent = 'SAVED';
					setTimeout(() => this.textContent = 'SAVE', 1000);
				});
			}
		};
		Blacklist.get();
		Blacklist.findMatch();
		Blacklist.html();

	} // END Feature.black AND Check.black()


	/** GLOBAL FUNCTIONS **/
	function getStorage(key, def) {
		if (typeof def !== 'string') def = JSON.stringify(def);
		return JSON.parse(localStorage.getItem(key) || def);
	}
	function setStorage(key, value) {
		localStorage.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value);
	}

	function addCSS(id, css) {
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
		let time = (parseInt(num, 10) / Feature.wpm / 60).toFixed(2).toString().split('.');
		return (time[0] !== '0' ? time[0] + 'hr ' : '') + (time[1] !== '00' ? Math.round(parseInt(time[1], 10) / 100 * 60) + 'min' : '') || '<1min';
	}

	function getScroll() {
		return Math.max(document.documentElement.scrollTop, window.scrollY, 0);
	}
	function setScroll(s) {
		window.scroll(0, s ? s : 0);
	}
	function getDocHeight() {
		return Math.max(document.documentElement.scrollHeight, document.documentElement.offsetHeight, document.body.scrollHeight, document.body.offsetHeight);
	}

})();
