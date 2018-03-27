// ==UserScript==
// @name         Block Youtube Users
// @author       Schegge
// @namespace    http://schegge.github.io/
// @description  Hide videos of blacklisted users/channels (from recommended, search, related channels...)
// @version      2.4
// @match        *://www.youtube.com/*
// @exclude      *://www.youtube.com/embed/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.getValue
// @grant        GM.setValue
// @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMzRDhDREZEMzVGMDExRTVBOUUzRDg5MDZENTJEMTA2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMzRDhDREZFMzVGMDExRTVBOUUzRDg5MDZENTJEMTA2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzNEOENERkIzNUYwMTFFNUE5RTNEODkwNkQ1MkQxMDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzNEOENERkMzNUYwMTFFNUE5RTNEODkwNkQ1MkQxMDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6dWQTHAAADwklEQVR42tRaTUwTQRR+u10q5WKTclOExASMwXT1aExoQpB4UHswajyVSDx40Caa6AmrJ000URI9EJP2ZOJJiBeh/oD4c6S9iScRDxyoQQ4USuk6s4wy2c7szP6Uti95TCAz3W9nvve996YohmFAM5oKTWpNC1wTTchOTibQ8Bj5Xh+fm0e+gvwH8WniQhsYHJQDjizhM2hsUTL2kfEOGSeQZ5CP+0GV3C4y4CzyV+SZuieqkCMFZbkAwedpT6gqh3qgcqADjd1gtLWJTmQO+RA5AVfAYRv4Mqjz370pAbV+66gO5ZP95svYWJqKgcZQlcBcDvY8eAQtL16KpmYaUg617DsRBTuJQLjjuC13O/YDIM7Sx46phePCShHm7n/+CgG0duvEcd6UpHXnNT9UZePeCP3rAut4tZnZU9qb7BFlaSnE+oyW8dd2wKOug5NnRiRSpfuhoSusZJIyf4Zap6C4PlAV/IUCqD8XTdXhWIwOUs8cN9ojzhYU189zVefbvP+1itHe7lc84piZYUruWrEWwCPQSFYfOVRV5i7Y8LtK3VTJo3ViYVvp7D18ESqVXnZJ0M1btmBVN1/k0KoexfSYTr009i6l8LtV+zh7LpB9f5C1qDzQb1e/pHyXQ5xcgqPPwNg55qhVd7FaKEjqlCI7+IxQCMrx07xHTDDzgl91B8y5q34x6NLtm7zd/sNK946Dk5FsvOUABBpnXZugjPNizBlwnyURUyc4+tTMmAybsWvn6l4dqou/IHj/IQt8HwEe9tRImLa2xvwzbgoMOw1G6zAwXpWId74FlbaWYo0GH7NSRnO6O1Xa29MNpWtXJbuogtk4BBiBjD878OkLq0KMEjlM1o0qOEbwS+ITYh7/1Fve0us4F/guh4wsN85RA4xYR5rdydt1BdGKI41JetdrATyD6vGUbWWbHsOc/cCkE4oFg91Ax2ngMlTR/X4zTqMhsk6aLjLAww4fkPO0Gfb3LV2Og5OTJNxWk3Fu9Whf2rpQFY6Gu6CWbpU2Wlp3r5GofqGwzTGnSEJhXqKW+V2+q8wZEyUlFGz/d0tZXR1mrNFBcOOLC7gtMfBp3+WQSuf7iDuy0nBCNCXfUEWWCfpyQnT5CWC5M9fqCRjX45uXLshQBMDFFVxNAFeO6bAZPyNb4z+B7etm58GJj3Lj1g1mwqC1V3gbZZkvYXnPzbIED6XmOLB/PedKw3VAgiozxishGhX4XaL9OS8JKAc7X+vV0vJEOTIy9Y4M8CQB3yWbTSVtmhpz4PCqT2nWf0L4K8AAGQEtCug+rd8AAAAASUVORK5CYII=
// ==/UserScript==

/*** DESCRIPTION
  - the program is case-insensitive
  - put a * in front of a word for wildcard (only in the blacklist!), it will find the word no matter its position in the username (example: *vevo)
  - you can choose the symbol to split the usernames (default is a comma) ('*' not allowed) (max 1 character)
  - you can enable/disable to blacklist channels by clicking/right clicking on '[x]' before the usernames
  - you can suspend temporarily the block (to reactivate it just click on save or refresh the page)
  - it hides videos of blacklisted users/channels from recommended, search, related channels...
  - also from the playlists/mixes, but it doesn't prevent them from playing if the playlist is in autoplay
  - for both the new and the old youtube layout

 <!> please report any bugs
***/

(async function($) {

	// saved data from old localStorage if it exits
	var _sBL, _sWL, _sep, _add;
	if (localStorage.getItem('byuver')) {_sBL = localStorage.getItem('savedblocks');_sWL = localStorage.getItem('savedwhites');_sep = localStorage.getItem('sep');_add = localStorage.getItem('enableadd');localStorage.removeItem('savedblocks');localStorage.removeItem('savedwhites');localStorage.removeItem('sep');localStorage.removeItem('enableadd');localStorage.removeItem('byuver');
	// default values
	} else {
		_sBL = '';
		_sWL = '';
		_sep = ',';
		_add = '';
	}

	// get black/whitelist saved
	var sBL, sWL, sep, add, ytblacklist, ytwhitelist;
	async function getValues() {
		sBL = await GM.getValue('savedblocks', _sBL);
		sWL = await GM.getValue('savedwhites', _sWL);
		sep = await GM.getValue('sep', _sep);
		add = await GM.getValue('enableadd', _add);
		ytblacklist = sBL.split(sep);
		ytwhitelist = sWL.split(sep);
	}
	await getValues();

	// vars
	var suspend = false;
	var uClasses, tClasses, margintop;

	// check what layout
	var ver = $('#upload-btn').length ? 'old' : 'new';

	if (ver === 'new') {
		// where the usernames are
		//          //grid
		uClasses = ['#byline.ytd-grid-video-renderer a',
						//big channel recommend
						'a.ytd-shelf-renderer[href*=user] #title.ytd-shelf-renderer, a.ytd-shelf-renderer[href*=channel] #title.ytd-shelf-renderer, #title-annotation.ytd-shelf-renderer a',
						//search
						'#byline.ytd-video-meta-block',
						//search channels
						'#channel-title.ytd-channel-renderer span.ytd-channel-renderer',
						//related channels
						'.title.ytd-mini-channel-renderer',
						//playlist
						'#byline.ytd-playlist-panel-video-renderer'];
		tClasses = 'ytd-video-renderer, ytd-grid-video-renderer, ytd-shelf-renderer, ytd-channel-renderer, ytd-mini-channel-renderer, ytd-playlist-renderer, ytd-compact-video-renderer, ytd-compact-autoplay-renderer, ytd-playlist-panel-video-renderer';

		// research
		window.addEventListener('yt-action', search, false);
		window.addEventListener('yt-page-data-updated', search, false);
		window.addEventListener('yt-load-next-continuation', search, false);
		window.addEventListener('yt-load-reload-continuation', search, false);
		window.addEventListener('shown-items-changed', search, false);

	} else { // old
		uClasses = ['.yt-lockup-byline > a',
						'.branded-page-module-title-text',
						'span.shelf-annotation.shelf-title-annotation a',
						'span.stat.attribution > span:not(.byu-add)',
						'.branded-page-related-channels-list .yt-uix-tile-link',
						'.video-uploader-byline'];
		tClasses = 'tr, li';

		// research
		var target = document.querySelector('#content');
		var config = { attributes: false, childList: true, characterData: false, subtree: true };
		var observer = new MutationObserver(function(mutations) { search(); });

		try { observer.observe(target, config); } catch (e) {}
	}

	// CSS
	$('head').append('<style> ' +
		'#byu-is-black { display: none!important; } ' +
		'.byu-add { font-size: .8em; margin-right: .5em; cursor: pointer; color: #FF0000; font-family: consolas, monospace; vertical-align: top; }' +

		'#byu-notice { position: fixed; z-index: 999999; width: 35%; min-width: 200px; font-size: 1.2em; padding: 1.5em; bottom: 50px; right: 50px; background: red; color: #fff; border-radius: 2px; }' +
		'#byu-notice span { cursor: pointer; color: red; background: #fff; border-radius: 2px; padding: 0 5px; }' +

		'#byu { color: #A0A0A0; cursor: pointer; font-size: 22px; vertical-align: middle; } ' +
		'#byu-options { width: 500px; display: flex; flex-flow: row wrap; align-items: baseline; position: fixed; right: 70px; padding: 0 20px 15px; background-color: #fff; box-shadow: 0 1px 2px 0 rgba(0,0,0,.1); border: 1px solid #fafafa; border-top: 0; z-index: 9999999999; } ' +
		'#byu-options div { box-sizing: border-box; padding: 5px; font-size: 1em; } ' +
		'#byu-options .textarea div { font-size: 1.2em; width: 100%; text-align: center; font-weight: 500; } ' +
		'#byu-options .textarea textarea { font-size: 1em; resize: vertical; width: 100%; padding: 4px; border: 2px solid rgba(0,0,0,.13); box-sizing: border-box; } ' +
		'#byu-options .textarea.wl { width: 40%; } ' +
		'#byu-options .textarea.bl { width: 60%; } ' +
		'.byu-ver { width: 50%; font-size: .8em; color: rgba(0,0,0,.4); }' +
		'#byu-saveblacklist { font-size: 1.2em; font-weight: bold; cursor: pointer; color: #FF0000; } ' +
		'.byu-sep { width: 33%; font-size: 9px; color: rgba(0,0,0,.5); } ' +
		'#byu-sep-symbol { width: 10px; background: #fff; border: 1px dotted rgba(0,0,0,.13); padding: 0 2px; color: #000; } ' +
		'#byu-enableadd { width: 33%; cursor: pointer; color: rgba(0,0,0,.5); text-align: center; } ' +
		'#byu-suspend { width: 33%; cursor: pointer; color: rgba(0,0,0,.5); text-align: right; } ' +
		'</style>');

	// changes' ver
	var byuver = await GM.getValue('byuver', '1');
	if (byuver !== '2.4') {
		byuver = '2.4';
		GM.setValue('byuver', byuver);
		$('body').append('<div id="byu-notice">BLOCK YOUTUBE USERS<br><br>[2.4] Changed again how to store users\' values.<br><br>[2.3.1] KNOWN BUG (with the new layout): clicking on [x] opens the video, so right-click it instead.<br><br><span>dismiss</span></div>');
		$('#byu-notice span').on('click', function() { $('#byu-notice').remove(); });
	}

	// menu
	$('body').append('<div id="byu-options" style="display: none">' +
		'<div class="byu-ver">v' + byuver + '</div>' +
		'<div style="width: 50%; text-align: right"><span id="byu-saveblacklist">save</span></div>' +
		'<div class="textarea wl"><div>Whitelist</div><textarea rows="4" id="byu-whitelist-words">' + sWL + '</textarea></div>' +
		'<div class="textarea bl"><div>Blacklist</div><textarea rows="4" id="byu-blacklist-words">' + sBL + '</textarea></div>' +
		'<div class="byu-sep">separator: <input id="byu-sep-symbol" type="text" value="' + sep + '" maxlength="1" /></div>' +
		'<div id="byu-enableadd">enable click add</div>' +
		'<div id="byu-suspend">suspend block</div>' +
		'</div>');
	if (add) $('#byu-enableadd').text('disable click add');

	// for the button with the new layout, wait till the masthead is added
	var waiting = setInterval(function() {
		if (ver === 'old' || $('#buttons').length) {
			clearInterval(waiting);
			button();
		}
	}, 1000);

	function button() {
		if (ver === 'new') {
			$('#buttons').before('<div style="display: inline-block; position: relative; height: 28px; width: 30px"><span id="byu">B</span></div>');
			margintop = $('#container.ytd-masthead').height();
		} else {
			$('#upload-btn').before('<div style="display: inline-block; position: relative; height: 28px; width: 30px"><span id="byu">B</span></div>');
			margintop = $('#yt-masthead-container').height() + parseInt($('#yt-masthead-container').css('padding-top')) + parseInt($('#yt-masthead-container').css('padding-bottom'));
		}

		$('head').append('<style>#byu-options {top:' + margintop + 'px; }</style>');
	}

	// check if a username is whitelisted
	function ifWhite(u) {
		var whitelisted = false;
		for(var z = 0; z < ytwhitelist.length; z++) {
			var w = ytwhitelist[z].trim().toLowerCase();
			if (w.length && u == w) {
				whitelisted = true;
			}
		}
		return whitelisted;
	}

	// check if a username is blacklisted
	function ifMatch(u) {
		var match = false;
		if (!ifWhite(u)) { // if the username isn't whitelisted
			for (var j = 0; j < ytblacklist.length; j++) {
				var b = ytblacklist[j].trim().toLowerCase();
					if (b.charAt(0) == '*') { // wildcards
						var part = b.split('*'),
						item = part[1];
						if (item.length && u.indexOf(item) !== -1) {
							match = true;
						}
					} else { // exact match
						if (b.length && u == b) {
							match = true;
						}
					}
				}
			}
			return match;
		}

	// do the thing
	function findMatch(s) {
		$(s).each(function() {
			var username = $(this).text().trim().toLowerCase();
			if (!username) return 'continue';

			// if the username is blacklisted
			if (!suspend && ifMatch(username)) {
				if (!$(this).closest(tClasses).attr('id', 'byu-is-black')) {
					$(this).closest(tClasses).attr('id', 'byu-is-black');
				}

			// add click
			} else if (add) {
				if (!$(this).siblings('.byu-add').length) {
					$('<span class="byu-add" data="' + username + '">[x]</span>').insertBefore($(this));
				} else if ($(this).siblings('.byu-add').attr('data') != username) {
					$(this).siblings('.byu-add').attr('data', username);
				}
			}
		});
	}

	// the final search function
	function search() {
		var url = window.location.href;
		// ! playlist?list=WL = Watch Later | feed/t... = History, Subscriptions
		if (!/.*youtube\.com\/(playlist\?list=WL|feed\/[^t]\w+)/.test(url)) {
			for (var i = 0; i < uClasses.length; i++) {
				findMatch(uClasses[i]);
			}
		}
	}
	search();

	// open and close options
	$('body').on('click', '#byu', function() {
		$('#byu-options').slideToggle();
		$(this).css('font-weight', $(this).css('font-weight') === '700' ? '400' : '700');
	});

	// save blacklist changes and research
	$saved = $('<span style="margin-right: 7px; font-size: 80%">saved</span>');
	$error = $('<span style="margin-right: 7px; font-size: 80%; color: red">ERROR! * NOT ALLOWED AS SEPARATOR</span>');
	$('#byu-saveblacklist').on('click', async function() {
		if ($('#byu-sep-symbol').val() == '*') {
			$(this).before($error);
			setTimeout(function() { $error.remove(); }, 4000);
		} else {
			// save new values
			await GM.setValue('savedblocks', $('#byu-blacklist-words').val());
			await GM.setValue('savedwhites', $('#byu-whitelist-words').val());
			await GM.setValue('sep', $('#byu-sep-symbol').val());
			// add notification
			$(this).before($saved);
			setTimeout(function() { $saved.remove(); }, 2000);
			// clear everything
			$('[id="byu-is-black"]').each(function(){ $(this).attr('id', ''); });
			suspend = false;
			$('#byu-suspend').css('font-weight', '400');
			// research
			await getValues();
			search();
			}
		});

	// enable/disable click add
	$('#byu-enableadd').on('click', async function() {
		if (add) {
			add = '';
			$('.byu-add').remove();
			$(this).text('enable click add');
		} else {
			add = 'yes';
			$(this).text('disable click add');
		}
		await GM.setValue('enableadd', add);
		search();
	});

	// suspend
	$('#byu-suspend').on('click', function() {
		suspend = true;
		$('[id="byu-is-black"]').each(function(){ $(this).attr('id', ''); });
		$(this).css('font-weight', '700');
	});

	// add usernames to blacklist
	$('body').on('click contextmenu', '.byu-add', async function(e) {
		e.preventDefault();
		e.stopPropagation();
		var q = sBL.trim().length ? sep + ' ' : '';
		$('#byu-blacklist-words').val($('#byu-blacklist-words').val() + q + $(this).attr('data'));
		await GM.setValue('savedblocks', $('#byu-blacklist-words').val());
		await getValues();
		search();
	});

})(jQuery);
