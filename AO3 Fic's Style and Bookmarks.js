// ==UserScript==
// @name         AO3: Fic's Style and Bookmarks
// @namespace    https://github.com/Schegge
// @version      2.1
// @description  Change font, size, width, background.. + number of words for every chapter + estimated reading time + full screen mode + bookmarks: save the position you stopped reading a fic
// @author       Schegge
// @include      http://archiveofourown.org/*
// @include      https://archiveofourown.org/*
// @grant        none
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjEyNjY3MDJGMzdDODExRTVBODNDREE0MEFBNDM2OTNGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEyNjY3MDMwMzdDODExRTVBODNDREE0MEFBNDM2OTNGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTI2NjcwMkQzN0M4MTFFNUE4M0NEQTQwQUE0MzY5M0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTI2NjcwMkUzN0M4MTFFNUE4M0NEQTQwQUE0MzY5M0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4OJ/TxAAAGAUlEQVR42tSZeWxUVRTG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
// ==/UserScript==

(function($) {
    function debugging(varName, variable) {
        var message = "{FICSTYLE} [" + varName + "]";
        if (variable !== undefined) {
            message += " (" + typeof variable + ") " + variable;
        }
        console.log(message);
    }

    // to delete old unused storage
    // debugging("ficstyle_version", localStorage.getItem("ficstyle_version"));
    if (!localStorage.getItem("ficstyle_version") || (localStorage.getItem("ficstyle_version") !== "2.1")) {
        localStorage.setItem("ficstyle_version", "2.1");
        // debugging("ficstyle_version", localStorage.getItem("ficstyle_version"));
        localStorage.removeItem("ficstyle_showBackground");
        localStorage.removeItem("ficstyle_chapterWidth");
        localStorage.removeItem("ficstyle_hide");
    }

    // BOOKMARKS
    var Bookmarks = {
        getAll: function() {
            var bookmarks = localStorage.getItem("ficstyle_bookmarks");
            if (!bookmarks) {
                bookmarks = "";
                localStorage.setItem("ficstyle_bookmarks", bookmarks);
            }
            // debugging("getAll", bookmarks);
            return bookmarks;
        },
        getSingles: function() {
            var all = this.getAll();
            return all.split("@");
        },
        getElements: function() { // 0 = url, 1 = title, 2 = scrolltop
            var els = [];
            var singles = this.getSingles();
            for(var i = 1; i < singles.length; i++) { // from 1 because the first element is empty (storage starts with a @)
                els.push( singles[i].split("#") );
            }
            // debugging("getElements", els);
            return els;
        },
        getUrl: window.location.pathname.split("/works/")[1], // work id
        getTitle: function() {
            var title = $("#workskin .preface.group h2.title.heading").text().trim();
            // debugging("getTitle heading", title);
            title = title.substring(0, 28); // to cut long titles
            if (/chapters/.test(window.location.pathname)) { // if chapter by chapter, also storaging the number of the chapter
                var chapter = $("#chapters > .chapter > div.chapter.preface.group > h3 > a").text();
                chapter = chapter.replace("Chapter ", "ch");
                title += " (" + chapter + ")";
                // debugging("getTitle chapter", chapter);
            }
            title = title.replace(/[#@]/g, " "); // just in case
            // debugging("getTitle final", title);
            return title;
        },
        getNewBook : function() {       
            var newbook = $(document).scrollTop(); // current position of the scroll bar
            // debugging("getNewBook px", newbook);
            var chs = $("dl.stats dd.chapters").text(); // # chapters
            // debugging("getNewBook chapters", chs);
            if (/(\d+)\/\1/.test(chs) || /chapters/.test(window.location.pathname)) { // if work completed (if number/number is the same) or chapter by chapter view
                newbook = (newbook / $(document).height()).toFixed(4) + "%"; // calculate in percent
                // debugging("getNewBook %", newbook);
            }
            // debugging("getNewBook final", newbook);
            return newbook;
        },
        checkIfExist: function(a) {
            var url = this.getUrl;
            var els = this.getElements();
            // debugging("getUrl", url);

            for(var i = 0; i < els.length; i++) {
                if (els[i][0] == url) { // if a bookmark already existed for the current fic
                    if (a == "book") { // retrieve the bookmark
                        var book = els[i][2];
                        if (book.indexOf("%") !== -1) {
                            book = book.replace("%", "");
                            book = parseFloat(book);
                            book = book * $(document).height();
                        }
                        book = parseFloat(book);
                        // debugging("checkIfExist('book')", book);
                        return book;
                    } else if (a == "cancel") { // delete the old bookmark
                        // debugging("checkIfExist('cancel')", els[i]);
                        return "@" + els[i][0] + "#" + els[i][1] + "#" + els[i][2];
                    } else {                        
                        // debugging("checkIfExist()", true);
                        return true;
                    }
                }
            }
            // debugging("checkIfExist", false);
        },
        cancel: function() {
            var newBookmarks = this.getAll();
            var cancel = this.checkIfExist("cancel");
            if (cancel) {
                newBookmarks = newBookmarks.replace(cancel, "");
            }
            return newBookmarks;
        },
        getNew: function() {
            var newBookmarks = this.cancel(); // if the the fic was already bookmarked, delete the old bookmark
            newBookmarks += "@" + this.getUrl + "#" + this.getTitle() + "#" + this.getNewBook(); // add new bookmark
            // debugging("getNew", newBookmarks);
            localStorage.setItem("ficstyle_bookmarks", newBookmarks);
        }
    };

    // create bookmarks' menu
    $("#header > ul").append(
        "<li id='menu-bookmarks' class='dropdown' aria-haspopup='true'>" +
        "<a>Bookmarks</a>" +
        "<ul class='menu dropdown-menu' role='menu'></ul></li>"
    );

    var els = Bookmarks.getElements();
    if (els.length) {
        for(var z = 0; z < els.length; z++) {
            $("#menu-bookmarks > ul.menu").append(
                "<li role='menu-item'>" +
                "<a href='http://archiveofourown.org/works/" + els[z][0] + "'>" + els[z][1] + "</a>" +
                "</li>"
            );
        }
    } else {
        $("#menu-bookmarks > ul.menu").append("<li role='menu-item'><a>No bookmarks yet.</a></li>");
    }

    // add estimated reading time
    $words = $("dl.stats dd.words");
    if ($words.length){
        $words.each(function() {
            var numWords = $(this).text();
            numWords = numWords.replace(",", "");
            // debugging("numWorkWords", numWords);
            $(this).after("<dt>Time:</dt><dd>" + countTime(numWords) + "</dd>");
        });
    }
    function countTime(num) {
        var timeReading = parseInt(num) / 200; // 200 words per minute
        if (timeReading < 60) {
            timeReading = Math.round(timeReading) + "min";
        } else {
            timeReading = (timeReading / 60).toFixed(2);
            timeReading = timeReading.toString();
            timeReading = timeReading.split(".");
            var hours = timeReading[0];
            var minutes = Math.round(parseInt(timeReading[1]) / 100 * 60);
            timeReading = hours + "hr & " + minutes.toString() + "min";
        }
        return timeReading;
    }

    /**
     * BELOW ONLY ON THE FIC'S PAGE
    **/

    var windowUrl = window.location.pathname;
    // include: (whatever)/works/(numbers) and (whatever)/works/(numbers)/chapters/(numbers) and exclude: navigate
    if (/.*\/works\/\d+(\/chapters\/\d+)?/.test(windowUrl) && !/navigate/.test(windowUrl)) {

        $workskin = $("#workskin");

        // default values
        var Options = {
            fontName: [
                "inherit", // default (AO3 font)
                "Georgia",
                "Garamond",
                "Book Antiqua",
                "Verdana",
                "Segoe UI"
            ],
            fontSize: 100, //(%)
            padding: 7, //(%) (min = 0; max = 40) to change text's width
            colors: {//background, font color
                light: ["#ffffff", "#000000"], // default
                grey:  ["#eeeeee", "#111111"],
                sepia: ["#fbf0d9", "#54331b"],
                dark:  ["#3c3c3c", "#d2d2d2"]
            }
        };

        // CSS changes
        var addCSS = function(id, css) {
            // debugging("addCSS "+ id + ".length", $("style#" + id).length);
            if (!$("style#" + id).length) {
                $head = $("head");
                $style = $("<style id='" + id + "' type='text/css'>" + css + "</style>");
                $head.append($style);
            } else {
                $("style#" + id).html(css);
            }
            // debugging("addCSS "+ id, css);
        };

        addCSS("ficstyle-general",
           "#workskin { margin: 0; text-align: justify; max-width: none!important; }\n" +
           "#main > div.wrapper, #main > div.work > div.wrapper { margin-bottom: 1em; }\n" +
           ".actions { font-family: 'Lucida Grande', 'Lucida Sans Unicode', 'GNU Unifont', Verdana, Helvetica, sans-serif; font-size: 14px; }\n" +
           ".chapter .preface { margin-bottom: 0; }\n" +
           ".chapter .preface[role='complementary'] { margin-top: 0; padding-top: 0; }\n" +
           "#workskin .notes, #workskin .summary { font-family: inherit; font-size: 15px }\n" +
           "#chapters .userstuff p { font-family: inherit; margin: 0.6em auto; text-align: justify; }\n" +
           "div.afterword { font-size: 14px }\n" +
           "#chapters a, #chapters a:link, #chapters a:visited { color: inherit; }\n" +
           "blockquote { font-family: inherit; }\n" +
           "#chapters .userstuff blockquote { padding-top: 1px; padding-bottom: 1px; margin: 0 .5em; }\n" +
           ".userstuff hr { width: 100%; height: 1px; border: 0; background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, .5), transparent); }\n" +
           ".userstuff img { max-width: 100%; height: auto; }\n" +
           "#options, .ficleft { position: fixed; bottom: 10px; margin: 0; padding: 0; font-family: Consolas, monospace; font-size: 16px; line-height: 18px; color: #000; text-shadow: 0 0 2px rgba(0, 0, 0, .4); z-index: 999; }\n" +
           "#options { right: 10px; }\n" +
           ".ficleft { display: none; left: 10px; }\n" +
           "#options > div { display: none; margin: 5px 0 0 0; padding: 0 5px; cursor: pointer; }\n" +
           "#options > div:last-child { display: block; padding: 2px 5px; color: #fff; background-color: rgba(0, 0, 0, .2); }\n" +
           ".ficleft a, #options a { border: 0; }\n" +
           "div.preface .notes, div.preface .summary, div.preface .series, div.preface .children { min-height: 0; }\n" +
           ".notes-hidden { cursor: pointer; position: fixed; width: 50%; max-height: 50%; left: 50px; bottom: 50px; color: rgb(42, 42, 42); background-color: #fff; padding: 10px; box-shadow: 0 0 2px 1px rgba(0, 0, 0, .4); margin: 0; overflow: auto; z-index: 999; display: none; }\n" +
           ".notes-headings { cursor: pointer; border-bottom-width: 0!important; margin: 0; text-align: center; color: #666; }"
        );

        // CSS changes depending on the user
        var Variables = {
            fontName: function() {
                var fontName = localStorage.getItem("ficstyle_fontName");
                if (!fontName) {
                    fontName = Options.fontName[0];
                    localStorage.setItem("ficstyle_fontName", fontName);
                }
                return fontName;
            },
            fontSize: function() {
                var fontSize = localStorage.getItem("ficstyle_fontSize");
                if (!fontSize) {
                    fontSize = Options.fontSize;
                    localStorage.setItem("ficstyle_fontSize", fontSize);
                }
                return fontSize;
            },
            padding: function() {
                var padding = localStorage.getItem("ficstyle_padding");
                if (!padding) {
                    padding = Options.padding;
                    localStorage.setItem("ficstyle_padding", padding);
                }
                return padding;
            },
            colors: function() {
                var colors = localStorage.getItem("ficstyle_colors");
                if (!colors) {
                    colors = Object.keys(Options.colors)[0];
                    localStorage.setItem("ficstyle_colors", colors);
                }
                return colors;
            },
            colorsDo: function() {
                for(var i in Options.colors) {
                    if (i == this.colors()) {
                        return [Options.colors[i][0], Options.colors[i][1]];
                    }
                }
            },
            changingCSS: function() {
                addCSS("ficstyle-user-changes",
                   "#workskin {\n" +
                   "   padding: 0 " + this.padding() + "%;\n" +
                   "   font-family: " + this.fontName() + ";\n" +
                   "   font-size: " + this.fontSize() + "%;\n" +
                   "   background-color: " + this.colorsDo()[0] + ";\n" +
                   "   color: " + this.colorsDo()[1] + ";\n" +
                   "}"
                );

            }
        };

        Variables.changingCSS(); // saved changes by user

        // remove empty paragraphs
        $("#chapters .userstuff p").each(function() {
            if (!$(this).text().trim().length && !$(this).find("img, embed").length) {
                $(this).remove();
            }
        });
        $("#chapters .userstuff br").after("<p>").remove(); // replace '<br>' with paragraphs     

        // # words and time for every chapter
        numChapters = $("#chapters > .chapter").length; // if the fic has chapters
        // debugging("numChapters", numChapters);
        if (numChapters) {
            var chTexts = $("#chapters > .chapter > div.userstuff.module");
            chTexts.each(function() {
                var text = $(this).text();
                text = text.replace(/\s-\s/g, "");
                text = text.replace(/-/g, "");
                text = text.replace(/[\."“”?!\)\(]/g, " ");
                var words = text.match(/\S+\s/g);
                // debugging("wordsChapter", text);
                // debugging("wordsChapter", words.join(" | "));
                var numWords = words.length;
                numWords = numWords - 2; // because of <h3 class="landmark heading" id="work">Chapter Text</h3>
                $(this).siblings(".chapter.preface.group[role='complementary']").before(
                    "<div style='font-size: .9em; color: inherit; font-family: verdana, sans-serif; font-variant: small-caps; text-align: center; margin: 2em 0 .6em'>" + "this chapter has " + numWords + " words (time: " + countTime(numWords) + ")</div>"
                );
            });
        }

        // the options displayed on the page
        $options = $("<div>", {id: "options"})
            .append( $("<div>", {html: "«", id: "font-name-minus", attr: {"title": "previous font"} }) )
            .append( $("<div>", {html: "»", id: "font-name-plus", attr: {"title": "next font"} }) )
            .append( $("<div>", {html: "-", id: "font-size-minus", attr: {"title": "decrease font size"} }) )
            .append( $("<div>", {html: "+", id: "font-size-plus", attr: {"title": "increase font size"} }) )
            .append( $("<div>", {html: "&#9643;", id: "padding-plus", attr: {"title": "decrease width"} }) )
            .append( $("<div>", {html: "&#9633;", id: "padding-minus", attr: {"title": "increase width"} }) )
            .append( $("<div>", {html: "&#9642;", id: "workskin-colors", attr: {"title": "change background and color"} }) )
            .append( $("<div>", {html: "r", id: "reset-local-storage", attr: {"title": "reset"} }) )
            .append( $("<div>", {html: "&#9776;", id: "show-hide", attr: {"title": "show/hide menu"} }) );
        $("body").append($options);

        $("#show-hide").click(function() {
            $("#options > div:nth-last-child(n+2)").slideToggle("300");
        });

        // to remain more or less in the same position in the text when changes are happening
        var percent,
            checkPosition = function() {
                documentTopB = $(document).scrollTop();
                documentHeightB = $(document).height();
                percent = documentTopB / documentHeightB;
            },
            returnBack = function() {
                documentHeightA = $(document).height();
                var r = percent * documentHeightA;
                $("html, body").scrollTop(r);
            };

        // changes triggered by the user
        $("#reset-local-storage").click(function() {
            checkPosition();
            localStorage.setItem("ficstyle_fontName", Options.fontName[0]);
            localStorage.setItem("ficstyle_fontSize", Options.fontSize);
            localStorage.setItem("ficstyle_padding", Options.padding);
            localStorage.setItem("ficstyle_colors", Object.keys(Options.colors)[0]);
            Variables.changingCSS();
            returnBack();
        });

        var curColors, curColorIncr;
        $("#workskin-colors").click(function() {
            curColors = localStorage.getItem("ficstyle_colors");
            for(var i = 0; i < Object.keys(Options.colors).length; i++) {
                // debugging("Object.keys(Options.colors)[i]", Object.keys(Options.colors)[i]);
                if (curColors === Object.keys(Options.colors)[i]) {
                    // debugging("found", Object.keys(Options.colors)[i]);
                    var j = i + 1;
                    if (j === Object.keys(Options.colors).length) {
                        curColorIncr = Object.keys(Options.colors)[0];
                    } else {
                        curColorIncr = Object.keys(Options.colors)[j];
                    }
                    localStorage.setItem("ficstyle_colors", curColorIncr);
                    Variables.changingCSS();
                }
            }
        });

        var curFont, curFontIncr;
        $("#font-name-minus").click(function() {
            checkPosition();
            curFont = localStorage.getItem("ficstyle_fontName");
            for(var i = 0; i < Options.fontName.length; i++) {
                if (curFont == Options.fontName[i]) {
                    var j = i - 1;
                    if (j === -1) {
                        var u = Options.fontName.length - 1;
                        curFontIncr = Options.fontName[u];
                    } else {
                        curFontIncr = Options.fontName[j];
                    }
                    localStorage.setItem("ficstyle_fontName", curFontIncr);
                    Variables.changingCSS();
                }
            }
            returnBack();
        });
        $("#font-name-plus").click(function() {
            checkPosition();
            curFont = localStorage.getItem("ficstyle_fontName");
            for(var i = 0; i < Options.fontName.length; i++) {
                if (curFont == Options.fontName[i]) {
                    var j = i + 1;
                    if (j === Options.fontName.length) {
                        curFontIncr = Options.fontName[0];
                    } else {
                        curFontIncr = Options.fontName[j];
                    }
                    localStorage.setItem("ficstyle_fontName", curFontIncr);
                    Variables.changingCSS();
                }
            }
            returnBack();
        });

        var curSize;
        $("#font-size-minus").click(function() {
            checkPosition();
            curSize = parseFloat(localStorage.getItem("ficstyle_fontSize")) - 2.5;
            localStorage.setItem("ficstyle_fontSize", curSize);
            Variables.changingCSS();
            returnBack();
        });
        $("#font-size-plus").click(function() {
            checkPosition();
            curSize = parseFloat(localStorage.getItem("ficstyle_fontSize")) + 2.5;
            localStorage.setItem("ficstyle_fontSize", curSize);
            Variables.changingCSS();
            returnBack();
        });

        var curPadding;
        $("#padding-plus").click(function() {
            checkPosition();
            curPadding = parseInt(localStorage.getItem("ficstyle_padding")) + 1;
            if (curPadding > 40) { curPadding = 40; }
            localStorage.setItem("ficstyle_padding", curPadding);
            Variables.changingCSS();
            returnBack();
        });
        $("#padding-minus").click(function() {
            checkPosition();
            curPadding = parseInt(localStorage.getItem("ficstyle_padding")) - 1;
            if (curPadding < 0) { curPadding = 0; }
            localStorage.setItem("ficstyle_padding", curPadding);
            Variables.changingCSS();
            returnBack();
        });

        // full screen mode
        $divbuttonsFS = $("<div class='actions' style='float: right; margin: 1.5em 0;'></div>");
        $fullScreen = $("<div>", {id: "full-screen", html: "<a>Full Screen &#9635;</a>"});
        $gobook = $("<div>", {id: "go-to-book", html: "<a>Go to Bookmark</a>"});
        $divbuttonsFS
            .append($gobook.hide())
            .append($fullScreen);
        $workskin.prepend($divbuttonsFS);

        $scrollT = $("<div class='ficleft'><a id='arrow'>&#8679;</a> <a id='bookmark'>&#9989;</a> </div>");
        $deletebook = $("<a id='delete-book'>&#9003;</a>");
        $scrollT.append( $deletebook.hide() );
        $("body").append( $scrollT.hide() );

        // changes to create full screen mode
        var fullscreen = false,
            fullScreenTrue = function() {
                // debugging("fullScreen");

                $("#outer").children().hide();
                $("body").append($workskin);

                $("#workskin .preface").css({"margin": "0", "padding-bottom": "0"});
                $("#workskin div.afterword").css("margin-bottom", "2.5em");
                $("#workskin .preface .summary .userstuff").addClass("notes-hidden");
                $("#workskin .preface .notes").each(function() {
                    var $notes = $("<div class='notes-hidden'></div>");
                    $(this).children("h3.heading").siblings().appendTo($notes);
                    $(this).append($notes);
                });
                $("#workskin .preface .summary h3, #workskin .preface .notes h3").addClass("notes-headings")
                .each(function() { var text = $(this).text(); text = text.replace(":", ""); $(this).text(text); });

                $divbuttonsFS.css("font-size", "80%");
                $fullScreen.children("a").prepend("Exit from ");
                $scrollT.show();                
                if (Bookmarks.checkIfExist()) {
                    $deletebook.show();
                    $gobook.show();
                }

                $(document).scrollTop(0);

                $workskin.append($("#feedback > ul.actions").css({ "font-size": "80%", "width": "100%", "padding": " 0 0 10px 0" }));
                $("#workskin > ul.actions > li:nth-child(1), #show_comments_link").remove();

                fullscreen = true;
            };

        $("#workskin .preface .module").on('click', function() { // show/hide summary and notes
            $(this).children(".notes-hidden").fadeToggle(300);
        });

        $("#full-screen").on('click', function() { // open/close full screen mode
            if (!fullscreen) fullScreenTrue(); else window.location.reload();
        });

        $("#arrow").on('click', function() { // go to top
            $("html, body").animate({scrollTop:0}, 600);
        });

        $("#bookmark").on('click', function() { // set new bookmark
            // debugging("setBookmark");
            Bookmarks.getNew();
            $gobook.show();
            $deletebook.show();
            $("#bookmark").css("color", "#900");
            setTimeout(function() {
                $("#bookmark").css("color", "inherit");
            }, 1000);
        });

        $("#go-to-book").on('click', function() { // go to the position of the bookmark
            // debugging("goToBook");
            var book = Bookmarks.checkIfExist("book");
            $("html, body").animate({scrollTop:book}, 600);
        });

        $("#delete-book").on('click', function() { // delete bookmark
            // debugging("deleteBookmark");
            var newBookmarks = Bookmarks.cancel();
            localStorage.setItem("ficstyle_bookmarks", newBookmarks);
            $deletebook.hide();
            $gobook.hide();
        });

    } // end of regex

})(jQuery);
