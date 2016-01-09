// ==UserScript==
// @name         Block Youtube Users
// @author       Schegge
// @namespace    https://github.com/Schegge
// @description  Prevent from seeing videos by certain users (from recommended, search, related channels...) 
// @version      2.1.8
// @match        *://www.youtube.com/*
// @exclude      *://www.youtube.com/embed/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMzRDhDREZEMzVGMDExRTVBOUUzRDg5MDZENTJEMTA2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMzRDhDREZFMzVGMDExRTVBOUUzRDg5MDZENTJEMTA2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzNEOENERkIzNUYwMTFFNUE5RTNEODkwNkQ1MkQxMDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzNEOENERkMzNUYwMTFFNUE5RTNEODkwNkQ1MkQxMDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6dWQTHAAADwklEQVR42tRaTUwTQRR+u10q5WKTclOExASMwXT1aExoQpB4UHswajyVSDx40Caa6AmrJ000URI9EJP2ZOJJiBeh/oD4c6S9iScRDxyoQQ4USuk6s4wy2c7szP6Uti95TCAz3W9nvve996YohmFAM5oKTWpNC1wTTchOTibQ8Bj5Xh+fm0e+gvwH8WniQhsYHJQDjizhM2hsUTL2kfEOGSeQZ5CP+0GV3C4y4CzyV+SZuieqkCMFZbkAwedpT6gqh3qgcqADjd1gtLWJTmQO+RA5AVfAYRv4Mqjz370pAbV+66gO5ZP95svYWJqKgcZQlcBcDvY8eAQtL16KpmYaUg617DsRBTuJQLjjuC13O/YDIM7Sx46phePCShHm7n/+CgG0duvEcd6UpHXnNT9UZePeCP3rAut4tZnZU9qb7BFlaSnE+oyW8dd2wKOug5NnRiRSpfuhoSusZJIyf4Zap6C4PlAV/IUCqD8XTdXhWIwOUs8cN9ojzhYU189zVefbvP+1itHe7lc84piZYUruWrEWwCPQSFYfOVRV5i7Y8LtK3VTJo3ViYVvp7D18ESqVXnZJ0M1btmBVN1/k0KoexfSYTr009i6l8LtV+zh7LpB9f5C1qDzQb1e/pHyXQ5xcgqPPwNg55qhVd7FaKEjqlCI7+IxQCMrx07xHTDDzgl91B8y5q34x6NLtm7zd/sNK946Dk5FsvOUABBpnXZugjPNizBlwnyURUyc4+tTMmAybsWvn6l4dqou/IHj/IQt8HwEe9tRImLa2xvwzbgoMOw1G6zAwXpWId74FlbaWYo0GH7NSRnO6O1Xa29MNpWtXJbuogtk4BBiBjD878OkLq0KMEjlM1o0qOEbwS+ITYh7/1Fve0us4F/guh4wsN85RA4xYR5rdydt1BdGKI41JetdrATyD6vGUbWWbHsOc/cCkE4oFg91Ax2ngMlTR/X4zTqMhsk6aLjLAww4fkPO0Gfb3LV2Og5OTJNxWk3Fu9Whf2rpQFY6Gu6CWbpU2Wlp3r5GofqGwzTGnSEJhXqKW+V2+q8wZEyUlFGz/d0tZXR1mrNFBcOOLC7gtMfBp3+WQSuf7iDuy0nBCNCXfUEWWCfpyQnT5CWC5M9fqCRjX45uXLshQBMDFFVxNAFeO6bAZPyNb4z+B7etm58GJj3Lj1g1mwqC1V3gbZZkvYXnPzbIED6XmOLB/PedKw3VAgiozxishGhX4XaL9OS8JKAc7X+vV0vJEOTIy9Y4M8CQB3yWbTSVtmhpz4PCqT2nWf0L4K8AAGQEtCug+rd8AAAAASUVORK5CYII=
// ==/UserScript==

/****************************************

  →  the program is case-insensitive
  →  split the usernames with a comma
  →  put a * in front of a word for wildcard (only in the blacklist!), it will find the word no matter its position in the username (example: *vevo)
  →  it also hides videos from the playlists/mixes, but it doesn't prevent them from playing if the playlist is in autoplay (download another script that disables autoplay!)
  →  VERSION 2:
      # blacklist editor changed
      # whitelist added
      # no need to refresh the page after changes in the blacklist/whitelist
      # added ☆ button to force a new search (in case of problems?)
      # added button for suspend temporarily the block (to reactivate it just click on the star/save or refresh the page)

  <!> please report any bugs

****************************************/

(function($) {  

    /*/ DEBUGGING /////////////////////////////////////////////////////////////////////////////
    function debugging(varName, variable, parents) {
        var message = "{BLACKLIST} [" + varName + "]";
        if ( variable !== undefined ) message += " (" + typeof variable + ") " + variable;
        console.log( message );            
        if ( parents !== undefined ) console.log( $(parents).parents() );
    }
    /*/////////////////////////////////////////////////////////////////////////////////////////

    // get black/whitelist saved
    var sBL, sWL, ytblacklist, ytwhitelist;    
    function getValues() {
        sBL = GM_getValue("savedblocks", "the program is case-insensitive, split the usernames with a comma, put a * in front of a word for wildcard, it will find the word no matter its position in the username, example, *vevo, delete all of this");
        // debugging("getValue] [Blacklist", sBL);
        sWL = GM_getValue("savedwhites", "put here whitelisted usernames, if for example you blacklist *vevo, but you want to see IndilaVEVO, write here:, indilavevo, delete all of this");
        // debugging("getValue] [Whitelist", sWL);
        ytblacklist = sBL.split(",");
        ytwhitelist = sWL.split(",");
    }
    getValues();

    // where the usernames are
    var uClasses = [".g-hovercard", ".branded-page-related-channels-list", ".branded-page-module-title-text", ".video-uploader-byline"];

    // add blacklist button to masthead
    $buttonB = $("<span>", {
        id: "yt-blacklist",
        html: "B",
        css: {
            "cursor": "pointer",
            "margin-right": "2px",
            "font-size": "22px",
            "vertical-align": "middle"
        }
    });
    $buttonR = $("<span>", {
        id: "yt-blacklist-research",
        html: "&#9734;",
        css: {
            "cursor": "pointer",
            "font-size": "12px",
            "vertical-align": "top",
            "margin-right": "5px"
        }
    });
    $("<span></span>").insertAfter("#upload-btn")
    .append($buttonB)
    .append($buttonR);

    // elements for user input
    var marginright = ( $(window).width() - $buttonB.offset().left - $buttonB.outerWidth() - $buttonR.outerWidth() - 20 );
    var margintop = $("#yt-masthead-container").height() + parseInt($("#yt-masthead-container").css("padding-top")) + parseInt($("#yt-masthead-container").css("padding-bottom"));

    $divInput = $("<div>", {
        id: "yt-blacklist-options",
        css: {
            "display": "none",
            "position": "fixed", 
            "right": marginright + "px",
            "top": margintop + "px",
            "padding": "0 20px 15px 20px",
            "text-align": "center",
            "background-color": "#fff",
            "box-shadow": "0 1px 1px 0 rgba(0,0,0,.1)",
            "border": "1px solid #e8e8e8",
            "border-top": "0",
            "z-index": "99999999999"
        }
    });
    $textareaBL = $('<div style="display:inline-block; width:350px; vertical-align:top; margin:0 5px; box-sizing:border-box">' +
                    '<div style="text-align:center; font-weight:500; margin-bottom:5px"> Blacklist </div>' +
                    '<textarea id="blacklist-words" style="resize:vertical; width:100%; height:80px; padding:4px; border:2px solid rgba(0,0,0,.13); box-sizing:border-box">' +
                    sBL + '</textarea></div>');
    $textareaWL = $('<div style="display:inline-block; width:250px; vertical-align:top; margin:0 5px; box-sizing:border-box">' +
                    '<div style="text-align:center; font-weight:500; margin-bottom:5px"> Whitelist </div>' +
                    '<textarea id="whitelist-words" style="resize:vertical; width:100%; height:80px; padding:4px; border:2px solid rgba(0,0,0,.13); box-sizing:border-box">' +
                    sWL + '</textarea></div>');
    $saveDiv = $('<div style="clear:both; padding-bottom: 10px; margin-top:1px; text-align:right">' +
                 '<span id="saveblacklist" style="cursor:pointer; color:#cc181e; text-shadow: 1px 1px 1px rgba(0, 0, 0, .25); border-radius:2px">' +
                 ' save </span></div>');    
    $suspend = $("<div id='yt-blacklist-suspend' style='cursor: pointer; font-size: 70%; opacity: .5; text-align: right; padding-top: 5px'> suspend block </div>");
    $saved = $('<span style="margin-right: 7px; font-size: 80%"> saved and searched again </span>');
    $divInput
        .append($saveDiv)
        .append($textareaWL)
        .append($textareaBL)    
        .append($suspend);
    $("body").append($divInput);

    // open and close textareas
    $("#yt-blacklist").click(function() {
        $("#yt-blacklist-options").slideToggle();
    });

    // check if a username is whitelisted
    function ifWhite(u) {
        var whitelisted = false;
        for(var z = 0; z < ytwhitelist.length; z++) {
            var w = ytwhitelist[z].trim().toLowerCase();
            if (w.length && u === w) {
                whitelisted = true;
            }
        }
        // debugging(u + " white?", whitelisted);
        return whitelisted;
    }

    // check if a username is blacklisted
    function ifMatch(u) {
        var match = false;
        if ( !ifWhite(u) ) { // if the username isn't whitelisted
            for (var j = 0; j < ytblacklist.length; j++) {
                var b = ytblacklist[j].trim().toLowerCase();
                if ( b.charAt(0) == "*" ) { // wildcards
                    var part = b.split("*"),
                        item = part[1];
                    if ( item.length && u.indexOf(item) !== -1 ) {
                        match = true;
                    }
                } else { // exact match
                    if ( b.length && u == b ) {
                        match = true;
                    }
                }
            }
        }
        // debugging(u + " black?", match);
        return match;
    }  

    // delete blacklisted
    function suspend(s) {
        $(s).each(function() {
            if ( $(this).siblings(".span-is-black").length ) {
                $(this).siblings(".span-is-black").remove();
            } else if ( $(this).parents(".li-is-black").length ) {
                $(this).parents(".li-is-black").removeClass("li-is-black").show();
            } else if ( $(this).parents(".tr-is-black").length ) {
                $(this).parents(".tr-is-black").removeClass("tr-is-black").show();
            }
        });
    }

    // do the thing
    function findMatch(s) {
        $(s).each(function() {
            var username = $(this).text().trim().toLowerCase();
            //debugging(username + " | parents:", undefined, this);
            if ( !username ) return 'continue';

            if ( ifMatch(username) ) { // if the username is blacklisted
                if ( $(this).parents("#watch-header").length ) { // WATCH VIDEO
                    if ( !$(this).siblings(".span-is-black").length ) { // check if it wasn't already blacklisted
                        $(".yt-user-info").append("<span class=\"span-is-black\" style=\"color:rgb(204, 24, 30);font-weight:500\">BLACKLISTED!</span>");
                    }
                } else if ( $(this).parents("tr.pl-video").length ) { // PLAYLIST (not the 'dark' ones)
                    if ( !$(this).parents(".tr-is-black").length ) {
                        $(this).closest("tr").addClass("tr-is-black").hide();
                    }
                } else { // SEARCH, RECOMMENDED, etc...
                    if ( !$(this).parents(".li-is-black").length ) {
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
        // playlist?list=WL = Watch Later - feed/... = History, Subscriptions
        if ( !/.*youtube\.com\/(playlist\?list=WL|feed\/\w+$)/.test(url) ) {
            for (var i = 0; i < uClasses.length; i++) {
                findMatch(uClasses[i]);
            }
        }
    }

    // save blacklist changes and research
    $("#saveblacklist").click(function() {
        GM_setValue("savedblocks", $('#blacklist-words').val());
        GM_setValue("savedwhites", $('#whitelist-words').val());
        getValues();
        search();
        $(this).before($saved);
        setTimeout(function() {
            $saved.remove();
        }, 2000);
    });  

    // research when $buttonR is clicked
    $("#yt-blacklist-research").click(function() {        
        search();
    });

    // suspend the block when $suspend is clicked
    $("#yt-blacklist-suspend").click(function() {        
        for (var i = 0; i < uClasses.length; i++) {
            suspend(uClasses[i]);
        }
    });


    // search when youtube is first opened
    search();
    
    // research after every change in #content    
    var target = document.querySelector('#content');
    
    var config = { attributes: true, childList: true, characterData: true, subtree: true };    
    var observer = new MutationObserver(function(mutations) {
        //debugging("MUTATIONS! NEW SEARCH");
        search();
    });

    try { observer.observe(target, config); } catch (e) {}
        
})(jQuery);
