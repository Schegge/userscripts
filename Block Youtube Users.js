// ==UserScript==
// @name         Block Youtube Users
// @author       Schegge
// @namespace    https://github.com/Schegge
// @description  Prevent from seeing videos by certain users (from recommended, search, related channels...)
// @version      2.1.9
// @match        *://www.youtube.com/*
// @exclude      *://www.youtube.com/embed/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMzRDhDREZEMzVGMDExRTVBOUUzRDg5MDZENTJEMTA2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMzRDhDREZFMzVGMDExRTVBOUUzRDg5MDZENTJEMTA2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzNEOENERkIzNUYwMTFFNUE5RTNEODkwNkQ1MkQxMDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzNEOENERkMzNUYwMTFFNUE5RTNEODkwNkQ1MkQxMDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6dWQTHAAADwklEQVR42tRaTUwTQRR+u10q5WKTclOExASMwXT1aExoQpB4UHswajyVSDx40Caa6AmrJ000URI9EJP2ZOJJiBeh/oD4c6S9iScRDxyoQQ4USuk6s4wy2c7szP6Uti95TCAz3W9nvve996YohmFAM5oKTWpNC1wTTchOTibQ8Bj5Xh+fm0e+gvwH8WniQhsYHJQDjizhM2hsUTL2kfEOGSeQZ5CP+0GV3C4y4CzyV+SZuieqkCMFZbkAwedpT6gqh3qgcqADjd1gtLWJTmQO+RA5AVfAYRv4Mqjz370pAbV+66gO5ZP95svYWJqKgcZQlcBcDvY8eAQtL16KpmYaUg617DsRBTuJQLjjuC13O/YDIM7Sx46phePCShHm7n/+CgG0duvEcd6UpHXnNT9UZePeCP3rAut4tZnZU9qb7BFlaSnE+oyW8dd2wKOug5NnRiRSpfuhoSusZJIyf4Zap6C4PlAV/IUCqD8XTdXhWIwOUs8cN9ojzhYU189zVefbvP+1itHe7lc84piZYUruWrEWwCPQSFYfOVRV5i7Y8LtK3VTJo3ViYVvp7D18ESqVXnZJ0M1btmBVN1/k0KoexfSYTr009i6l8LtV+zh7LpB9f5C1qDzQb1e/pHyXQ5xcgqPPwNg55qhVd7FaKEjqlCI7+IxQCMrx07xHTDDzgl91B8y5q34x6NLtm7zd/sNK946Dk5FsvOUABBpnXZugjPNizBlwnyURUyc4+tTMmAybsWvn6l4dqou/IHj/IQt8HwEe9tRImLa2xvwzbgoMOw1G6zAwXpWId74FlbaWYo0GH7NSRnO6O1Xa29MNpWtXJbuogtk4BBiBjD878OkLq0KMEjlM1o0qOEbwS+ITYh7/1Fve0us4F/guh4wsN85RA4xYR5rdydt1BdGKI41JetdrATyD6vGUbWWbHsOc/cCkE4oFg91Ax2ngMlTR/X4zTqMhsk6aLjLAww4fkPO0Gfb3LV2Og5OTJNxWk3Fu9Whf2rpQFY6Gu6CWbpU2Wlp3r5GofqGwzTGnSEJhXqKW+V2+q8wZEyUlFGz/d0tZXR1mrNFBcOOLC7gtMfBp3+WQSuf7iDuy0nBCNCXfUEWWCfpyQnT5CWC5M9fqCRjX45uXLshQBMDFFVxNAFeO6bAZPyNb4z+B7etm58GJj3Lj1g1mwqC1V3gbZZkvYXnPzbIED6XmOLB/PedKw3VAgiozxishGhX4XaL9OS8JKAc7X+vV0vJEOTIy9Y4M8CQB3yWbTSVtmhpz4PCqT2nWf0L4K8AAGQEtCug+rd8AAAAASUVORK5CYII=
// ==/UserScript==

/*** DESCRIPTION
  →  the program is case-insensitive
  →  you can choose the symbol to split the usernames (default is a comma) ('*' not allowed) (max 1 character)
  →  put a * in front of a word for wildcard (only in the blacklist!), it will find the word no matter its position in the username (example: *vevo)
  →  it also hides videos from the playlists/mixes, but it doesn't prevent them from playing if the playlist is in autoplay (download another script that disables autoplay!)
  →  ☆ force a new search (in case of problems?)
  →  you can suspend temporarily the block (to reactivate it just click on the star/save or refresh the page)

  <!> please report any bugs
***/

(function($) {

    // get black/whitelist saved
    var sBL, sWL, sep, ytblacklist, ytwhitelist;
    function getValues() {
        sBL = GM_getValue('savedblocks', 'it is case-insensitive, split the usernames with a comma (default), put a * in front of a word for wildcard, it will find the word no matter its position in the username');
        sWL = GM_getValue('savedwhites', 'write here whitelisted usernames, if for example you blacklist *vevo, but you want to see IndilaVEVO');
        sep = GM_getValue('sep', ',');
        ytblacklist = sBL.split(sep);
        ytwhitelist = sWL.split(sep);
    }
    getValues();

    // where the usernames are
    var uClasses = ['.g-hovercard', '.branded-page-related-channels-list .yt-uix-tile-link', '.branded-page-module-title-text', '.video-uploader-byline'];

    // elements for user input
    var margintop = $('#yt-masthead-container').height() + parseInt($('#yt-masthead-container').css('padding-top')) + parseInt($('#yt-masthead-container').css('padding-bottom'));

    $('head').append('<style> ' +
                     '#yt-blacklist { cursor: pointer; margin-right: 2px; font-size: 22px; vertical-align: middle; } ' +
                     '#yt-blacklist-research { cursor: pointer; font-size: 12px; vertical-align: top; margin-right: 5px; } ' +
                     '#yt-blacklist-options { width: 500px; display: flex; flex-flow: row wrap; align-items: baseline; position: fixed; right: 70px; top:' + margintop + 'px; padding: 0 20px 15px; background-color: #fff; box-shadow: 0 1px 1px 0 rgba(0,0,0,.1); border: 1px solid #e8e8e8; border-top: 0; z-index: 9999999999; } ' +
                     '#yt-blacklist-options div { box-sizing: border-box; padding: 5px; } ' +
                     '#yt-blacklist-options .textarea div { width: 100%; text-align: center; font-weight: 500; } ' +
                     '#yt-blacklist-options .textarea textarea { resize: vertical; width: 100%; padding: 4px; border: 2px solid rgba(0,0,0,.13); box-sizing: border-box; } ' +
                     '#yt-blacklist-options .textarea.wl { width: 45%; } ' +
                     '#yt-blacklist-options .textarea.bl { width: 55%; } ' +
                     '#saveblacklist { cursor: pointer; color: #cc181e; text-shadow: 1px 1px 1px rgba(0, 0, 0, .25); border-radius: 2px; } ' +
                     '.yt-blacklist-sep { width: 50%; font-size: 9px; color: rgba(0,0,0,.5); } ' +
                     '#sep-symbol { width: 10px; background: #fff; border: 1px dotted rgba(0,0,0,.13); padding: 0 2px; color: #000; } ' +
                     '#yt-blacklist-suspend { width: 50%; cursor: pointer; font-size: 70%; color: rgba(0,0,0,.5); text-align: right; } ' +
                     '</style>');

    $('<div style="display: inline-block; position: relative; height: 28px"><span id="yt-blacklist">B</span><span id="yt-blacklist-research">&#9734;</span></div>').insertAfter('#upload-btn');

    $('body').append('<div id="yt-blacklist-options" style="display: none">' +
                     '<div style="width: 100%; text-align: right"><span id="saveblacklist">save</span></div>' +
                     '<div class="textarea wl"><div>Whitelist</div><textarea rows="4" id="whitelist-words">' + sWL + '</textarea></div>' +
                     '<div class="textarea bl"><div>Blacklist</div><textarea rows="4" id="blacklist-words">' + sBL + '</textarea></div>' +
                     '<div class="yt-blacklist-sep">separator: <input id="sep-symbol" type="text" value="' + sep + '" maxlength="1" /></div>' +
                     '<div id="yt-blacklist-suspend">suspend block</div>' +
                     '</div>');

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

    // delete blacklisted
    function suspend(t) {
        $(t).each(function() {
            if ($(this).parents(".li-is-black").length) {
                $(this).parents(".li-is-black").removeClass("li-is-black").show();
            } else if ($(this).parents(".tr-is-black").length) {
                $(this).parents(".tr-is-black").removeClass("tr-is-black").show();
            }
        });
    }

    // do the thing
    function findMatch(s) {
        $(s).each(function() {
            var username = $(this).text().trim().toLowerCase();
            if (!username) return 'continue';

            if (ifMatch(username)) { // if the username is blacklisted
                if ($(this).parents("tr.pl-video").length) { // PLAYLIST (not the 'dark' ones)
                    if (!$(this).parents(".tr-is-black").length) {
                        $(this).closest("tr").addClass("tr-is-black").hide();
                    }
                } else { // SEARCH, RECOMMENDED, etc...
                    if (!$(this).parents(".li-is-black").length) {
                        $(this).closest("li").addClass("li-is-black").hide();
                    }
                }                
            } else { // if a previous black/whitelist word is deleted/added
                suspend(this);
            }
        });
    }

    // the final search function
    function search() {
        var url = window.location.href;
        // playlist?list=WL = Watch Later | != feed/t... = History, Subscriptions
        if (!/.*youtube\.com\/(playlist\?list=WL|feed\/[^t]\w+)/.test(url)) {
            for (var i = 0; i < uClasses.length; i++) {
                findMatch(uClasses[i]);
            }
        }
    }

    // search when youtube is first opened
    search();

    // open and close options
    $('#yt-blacklist').on('click', function() {
        $('#yt-blacklist-options').slideToggle();
    });

    // save blacklist changes and research
    $saved = $('<span style="margin-right: 7px; font-size: 80%">saved and searched again</span>');
    $error = $('<span style="margin-right: 7px; font-size: 80%; color: red">ERROR! * NOT ALLOWED AS SEPARATOR</span>');
    $('#saveblacklist').on('click', function() {
        if ($('#sep-symbol').val() == '*') {
            $(this).before($error);
            setTimeout(function() { $error.remove(); }, 4000);
        } else {
            GM_setValue('savedblocks', $('#blacklist-words').val());
            GM_setValue('savedwhites', $('#whitelist-words').val());
            GM_setValue('sep', $('#sep-symbol').val());
            getValues();
            search();
            $(this).before($saved);
            setTimeout(function() { $saved.remove(); }, 2000);
        }
    });

    // research and suspend
    $('#yt-blacklist-research').on('click', search);
    $('#yt-blacklist-suspend').on('click', function() {
        for (var i = 0; i < uClasses.length; i++) {
            $(uClasses[i]).each(function() {
                suspend(this);
            });
        }
    });

    // research after every change in #content
    var target = document.querySelector('#content');
    var config = { attributes: false, childList: true, characterData: false, subtree: true };
    var observer = new MutationObserver(function(mutations) { search(); });

    try { observer.observe(target, config); } catch (e) {}

})(jQuery);
