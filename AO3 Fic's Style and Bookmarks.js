// ==UserScript==
// @name         AO3: Fic's Style and Bookmarks
// @namespace    https://github.com/Schegge
// @version      2.3
// @description  Change font, size, width, background.. + number of words for every chapter + estimated reading time + full screen mode + bookmarks: save the position you stopped reading a fic
// @author       Schegge
// @include      http://archiveofourown.org/*
// @include      https://archiveofourown.org/*
// @grant        none
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc0REE4QjE3Qjk1ODExRTY4MEZCQTc3RERGMTNGQ0Y0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc0REE4QjE4Qjk1ODExRTY4MEZCQTc3RERGMTNGQ0Y0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzREQThCMTVCOTU4MTFFNjgwRkJBNzdEREYxM0ZDRjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzREQThCMTZCOTU4MTFFNjgwRkJBNzdEREYxM0ZDRjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz78uZUsAAACeUlEQVR42uxZvW7bMBCWDaFLuih9A3bJrqJLVhVdigwFZGQPIHdpO9aPYC+dGz1CNXXpEiFzFq0NMtjIE0QvYNQ9Bh+BA6Mf0rKkBuABHyxQJPHxdPfdSZ7sdjvvOdrUe6bmiDvijrgj7og/mn/oDX/4T7YMCAkhxLW0nJARNnzip+32v/H4N8KaEIHsipASBMYv2WHG9TizS3haEp1r96S3C8yRT+IdobTZfNLUq1Q89iYLQEJ6Nib8RCi8NjicfBKLsUJFhsUViCwxlrasSdlaMZaqJPi9YCSKljX8fjwG8YQl2Vs2nhusVXPCMYjHB9gjGJq4gNyV3oA2PVCYyFhd1BzK5OAm+dAL8RTarHs9NAiPUYirpFSkM+3+R8Pc2FSs7ZV4BG+XNbp93uD1gOn9fMgYF/BYpukyb5z+oihF2tozwh/CS8KtasBsKnUX4jFI5jXVUO3/G+V/jUPcE37hkCeEL6zqBkMQT2pKuj72gnBMmKEneYXQ+sAOnsLrcd/EY4RKFfFSG1dzC5C80/twliPGHvc7EC8aEm9TMX+F6zcNWp6bEtinrVUvATbW1N5GiG+pLKlpa+t3SMo2CQuZ3An2FsTbYHV/ZePtfT2+RgyvDKrig5a08wY9l8k+I49nfSSnSjSTzfUkTWqSr2ROWPalKklFkTHptZV9RYgENcks+lAVFacLizXqE4Qi9Bma7mmhJmrUqLPHA1S/fYyH1bGm2zxRPRun+AbKECFEBItDVVCKmnZUYG3I3kW5fUfneEM4xfyZTYfYRnxZ0SDxF+Mc30Sqkrgp0Y4I7wnXUJqN7WOcuP+AHHFH3BF3xB1xR9zC/gkwALX7mp/233xAAAAAAElFTkSuQmCC
// ==/UserScript==

(function($) {
    /*function debugging(varName, variable) {
        var message = 'FS\t[' + varName + ']';
        if (variable !== undefined) {
            message += '\t(' + typeof variable + ') ' + variable;
        }
        console.log(message);
    }*/

    // BOOKMARKS
    var Bookmarks = {
        getBooks: function() {
            var bookmarks = localStorage.getItem('ficstyle_bookmarks');
            bookmarks = bookmarks.trim();
            if (!bookmarks) {
                bookmarks = '[]';
                localStorage.setItem('ficstyle_bookmarks', bookmarks);
            } else if (bookmarks.charAt(0) === '@') {
                bookmarks = bookmarks.substring(1);
                bookmarks = bookmarks.replace(/@/g, '"],["');
                bookmarks = bookmarks.replace(/#/g, '","');
                bookmarks = '[["' + bookmarks;
                bookmarks += '"]]';
                //debugging('bookmarks', bookmarks);
                localStorage.setItem('ficstyle_bookmarks', bookmarks);
            }
            //debugging('getBooks', JSON.parse(bookmarks));
            return JSON.parse(bookmarks);
        },
        getUrl: window.location.pathname.split('/works/')[1], // work id
        getTitle: function() {
            var title = $('#workskin .preface.group h2.title.heading').text().trim();
            //debugging('getTitle heading', title);
            title = title.substring(0, 28); // to cut long titles
            if (/chapters/.test(window.location.pathname)) { // if chapter by chapter, also storaging the number of the chapter
                var chapter = $('#chapters > .chapter > div.chapter.preface.group > h3 > a').text();
                chapter = chapter.replace('Chapter ', 'ch');
                title += ' (' + chapter + ')';
                //debugging('getTitle chapter', chapter);
            }
            //debugging('getTitle final', title);
            return title;
        },
        getNewBook: function() {
            var newbook = $(document).scrollTop(); // current position of the scroll bar
            //debugging('getNewBook px', newbook);
            var chs = $('dl.stats dd.chapters').text(); // # chapters
            //debugging('getNewBook chapters', chs);
            if (/(\d+)\/\1/.test(chs) || /chapters/.test(window.location.pathname)) { // if work completed (if number/number is the same) or chapter by chapter view
                newbook = (newbook / $(document).height()).toFixed(4) + '%'; // calculate in percent
                //debugging('getNewBook %', newbook);
            }
            //debugging('getNewBook final', newbook);
            return newbook;
        },
        checkIfExist: function(a) {
            var books = this.getBooks();

            for(var i = 0; i < books.length; i++) {
                // if a bookmark already existed for the current chapter
                if (books[i][0] === this.getUrl) {
                    //debugging('same chapter');
                    if (a === 'book') { // retrieve the bookmark
                        var book = books[i][2];
                        if (book.indexOf('%') !== -1) {
                            book = book.replace('%', '');
                            book = parseFloat(book);
                            book = book * $(document).height();
                        }
                        book = parseFloat(book);
                        //debugging('checkIfExist(book)', book);
                        return book;
                    } else if (a === 'cancel') { // delete the old bookmark
                        //debugging('checkIfExist(cancel)', i);
                        //debugging('checkIfExist(cancel)', books[i]);
                        return i;
                    } else {
                        //debugging('checkIfExist()', true);
                        return true;
                    }
                // if a bookmark already existed for the current fic
                } else if (a === 'cancel' && books[i][0].split('/chapters/')[0] === this.getUrl.split('/chapters/')[0]) { // delete the old bookmark
                    //debugging('same fic');
                    //debugging('checkIfExist(cancel)', i);
                    //debugging('checkIfExist(cancel)', books[i]);
                    return i;
                }
            }

            //debugging('checkIfExist', false);
            return false;
        },
        cancel: function() {
            var newBookmarks = this.getBooks();
            var cancel = this.checkIfExist('cancel');
            //debugging('cancel', cancel);
            if (cancel || cancel === 0) {
                newBookmarks.splice(cancel, 1);
            }
            return newBookmarks;
        },
        getNew: function() {
            var newBookmarks = this.cancel(); // if the the fic was already bookmarked, delete the old bookmark
            newBookmarks.push([this.getUrl, this.getTitle(), this.getNewBook()]); // add new bookmark
            //debugging('getNew', newBookmarks);
            localStorage.setItem('ficstyle_bookmarks', JSON.stringify(newBookmarks));
        }
    };

    // create bookmarks' menu
    $('#header > ul').append('<li id="menu-bookmarks" class="dropdown" aria-haspopup="true"><a>Bookmarks</a><ul class="menu dropdown-menu" role="menu"></ul></li>');

    var books = Bookmarks.getBooks();
    if (books.length) {
        for(var z = 0; z < books.length; z++) {
            $('#menu-bookmarks > ul.menu').append('<li role="menu-item"><a href="http://archiveofourown.org/works/' + books[z][0] + '">' + books[z][1] + '</a></li>');
        }
    } else {
        $('#menu-bookmarks > ul.menu').append('<li role="menu-item"><a>No bookmarks yet.</a></li>');
    }

    // add estimated reading time
    var $words = $('dl.stats dd.words');
    if ($words.length) {
        $words.each(function() {
            var numWords = $(this).text();
            numWords = numWords.replace(/,/g, '');;
            //debugging('numWorkWords', numWords);
            $(this).after('<dt>Time:</dt><dd>' + countTime(numWords) + '</dd>');
            //debugging('countTime(numWords)', countTime(numWords));
        });
    }
    function countTime(num) {
        var timeReading = parseInt(num) / 200; // 200 words per minute
        if (timeReading < 60) {
            timeReading = Math.round(timeReading) + 'min';
        } else {
            timeReading = (timeReading / 60).toFixed(2);
            timeReading = timeReading.toString().split('.');
            var minutes = Math.round(parseInt(timeReading[1]) / 100 * 60);
            timeReading = timeReading[0] + 'hr ' + minutes.toString() + 'min';
        }
        return timeReading;
    }


    // BELOW ONLY ON THE FIC'S PAGE
    var windowUrl = window.location.pathname;
    // include: (whatever)/works/(numbers) and (whatever)/works/(numbers)/chapters/(numbers) and exclude: navigate
    if (!/.*\/works\/\d+(\/chapters\/\d+)?(?!.*navigate)/.test(windowUrl)) return 'stop';

    var $workskin = $('#workskin');

    // default values
    var Options = {
        fontName: [
            'inherit', // default (AO3 font)
            'Georgia',
            'Garamond',
            'Book Antiqua',
            'Verdana',
            'Segoe UI'
        ],
        fontSize: 100, //(%)
        padding: 7, //(%) (min = 0; max = 40) to change text's width
        colors: {//background, font color
            light: ['#ffffff', '#000000'], // default
            grey:  ['#eeeeee', '#111111'],
            sepia: ['#fbf0d9', '#54331b'],
            dark:  ['#3c3c3c', '#d2d2d2']
        }
    };

    // CSS changes
    function addCSS(id, css) {
        //debugging('addCSS '+ id + '.length', $('style#' + id).length);
        if (!$('style#' + id).length) $('head').append('<style id="' + id + '" type="text/css">' + css + '</style>');
        else $('style#' + id).html(css);
        //debugging('addCSS '+ id, css);
    }

    addCSS('ficstyle-general',
       '#workskin { margin: 0; text-align: justify; max-width: none!important; } ' +
       '#main > div.wrapper, #main > div.work > div.wrapper { margin-bottom: 1em; } ' +
       '.actions { font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', \'GNU Unifont\', Verdana, Helvetica, sans-serif; font-size: 14px; } ' +
       '.chapter .preface { margin-bottom: 0; } ' +
       '.chapter .preface[role="complementary"] { margin-top: 0; padding-top: 0; } ' +
       '#workskin .notes, #workskin .summary { font-family: inherit; font-size: 15px } ' +
       '.preface.group { color: inherit; background-color: inherit; } ' +
       'div.afterword { font-size: 14px } ' +
       '#chapters .userstuff p { font-family: inherit; margin: .6em auto; text-align: justify; line-height: 1.5em } ' +
       '#chapters .userstuff { font-family: inherit; text-align: justify; line-height: 1.5em } ' +
       '#chapters .userstuff br { display: block; margin-top: .6em; content: " "; } ' +
       '.userstuff hr { width: 100%; height: 1px; border: 0; background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, .5), transparent); margin: 1.5em 0; } ' +
       '#chapters a, #chapters a:link, #chapters a:visited { color: inherit; } ' +
       'blockquote { font-family: inherit; } ' +
       '#chapters .userstuff blockquote { padding-top: 1px; padding-bottom: 1px; margin: 0 .5em; } ' +
       '.userstuff img { max-width: 100%; height: auto; display: block; margin: auto; } ' +
       '#options, .ficleft { position: fixed; bottom: 10px; margin: 0; padding: 0; font-family: Consolas, monospace; font-size: 16px; line-height: 18px; color: #000; text-shadow: 0 0 2px rgba(0, 0, 0, .4); z-index: 999; } ' +
       '#options { right: 10px; } ' +
       '.ficleft { display: none; left: 10px; } ' +
       '#options > div { display: none; margin: 5px 0 0 0; padding: 0 5px; cursor: pointer; } ' +
       '#options > div:last-child { display: block; padding: 2px 5px; color: #fff; background-color: rgba(0, 0, 0, .2); } ' +
       '.ficleft a, #options a { border: 0; color: #000 } ' +
       'div.preface .notes, div.preface .summary, div.preface .series, div.preface .children { min-height: 0; } ' +
       '.notes-hidden { cursor: pointer; position: fixed; width: 50%; max-height: 50%; left: 50px; bottom: 50px; color: rgb(42, 42, 42); background-color: #fff; padding: 10px; box-shadow: 0 0 2px 1px rgba(0, 0, 0, .4); margin: 0; overflow: auto; z-index: 999; display: none; } ' +
       '.notes-headings { cursor: pointer; border-bottom-width: 0!important; margin: 0; text-align: center; color: #666;  } ' +
       '.chapterWords { font-size: .9em; color: inherit; font-family: verdana, sans-serif; font-variant: small-caps; text-align: center; margin: 2em 0 .6em; }'
    );

    // CSS changes depending on the user
    var Variables = {
        init: function() {
            if (!localStorage.getItem('ficstyle')) {
                var all = {
                    fontName: localStorage.getItem('ficstyle_fontName') ? localStorage.getItem('ficstyle_fontName') : Options.fontName[0],
                    fontSize: localStorage.getItem('ficstyle_fontSize') ? parseFloat(localStorage.getItem('ficstyle_fontSize')) : Options.fontSize,
                    padding: localStorage.getItem('ficstyle_padding') ? parseInt(localStorage.getItem('ficstyle_padding')) : Options.padding,
                    colors: localStorage.getItem('ficstyle_colors') ? localStorage.getItem('ficstyle_colors') : Object.keys(Options.colors)[0]
                };
                localStorage.removeItem('ficstyle_fontName');
                localStorage.removeItem('ficstyle_fontSize');
                localStorage.removeItem('ficstyle_padding');
                localStorage.removeItem('ficstyle_colors');
                localStorage.setItem('ficstyle', JSON.stringify(all));
            }
        },
        get: function() {
            var all = localStorage.getItem('ficstyle');
            all = JSON.parse(all);
            //debugging('get', JSON.stringify(all));
            return all;
        },
        set: function(a, b) {
            var all = this.get();
            if (a && b) {
                switch(a) {
                    case 'fontName': all.fontName = b; break;
                    case 'fontSize': all.fontSize = b; break;
                    case 'padding': all.padding = b; break;
                    case 'colors': all.colors = b; break;
                }
                localStorage.setItem('ficstyle', JSON.stringify(all));
            }
            //debugging('set', JSON.stringify(all));
            addCSS('ficstyle-user-changes',
               '#workskin { padding: 0 ' + all.padding + '%; font-family: ' + all.fontName + '; font-size: ' + all.fontSize + '%; background-color: ' + Options.colors[all.colors][0] + '; color: ' + Options.colors[all.colors][1] + '; }'
            );
        }
    };

    Variables.init();
    Variables.set(false, false); // saved changes by user

    // remove all the non-breaking white spaces
    $('#chapters').html($('#chapters').html().replace(/&nbsp;/g, ' '));

    // # words and time for every chapter
    var numChapters = $('#chapters > .chapter').length; // if the fic has chapters
    //debugging('numChapters', numChapters);
    if (numChapters) {
        var chTexts = $('#chapters > .chapter > div.userstuff.module');
        chTexts.each(function() {
            var text = $(this).text();
            text = text.replace(/(\s-\s)|(-)/g, '');
            text = text.replace(/[\."“”?!\)\(]/g, ' ');
            var words = text.match(/\S+\s/g);
            ////debugging('wordsChapter', text);
            ////debugging('wordsChapter', words.join(' | '));
            var numWords = words.length;
            numWords = numWords - 2; // because of <h3 class="landmark" heading id="work">Chapter Text</h3>
            $(this).siblings('.chapter.preface.group[role=\'complementary\']').before(
                '<div class="chapterWords">this chapter has ' + numWords + ' words (time: ' + countTime(numWords) + ')</div>'
            );
        });
    }

    // the options displayed on the page
    $('body').append('<div id="options">' +
        '<div id="font-name-minus" title="previous font">«</div>' +
        '<div id="font-name-plus" title="next font">»</div>' +
        '<div id="font-size-minus" title="decrease font size">-</div>' +
        '<div id="font-size-plus" title="increase font size">+</div>' +
        '<div id="padding-plus" title="decrease width">&#9643;</div>' +
        '<div id="padding-minus" title="increase width">&#9633;</div>' +
        '<div id="workskin-colors" title="change background and color">&#9642;</div>' +
        '<div id="reset-local-storage" title="reset">r</div>' +
        '<div id="show-hide" title="show/hide menu">&#9776;</div>' +
        '</div>');

    $('#show-hide').on('click', function() {
        $('#options > div:nth-last-child(n+2)').slideToggle('300');
    });

    // to remain more or less in the same position in the text when changes are happening
    var percent = 0;
    function checkPosition() {
        percent = $(document).scrollTop() / $(document).height();
    }
    function returnBack() {
        var r = percent * $(document).height();
        $('html, body').scrollTop(r);
    }

    // changes triggered by the user
    $('#reset-local-storage').on('click', function() {
        checkPosition();
        localStorage.removeItem('ficstyle');
        Variables.init();
        Variables.set(false, false);
        returnBack();
    });

    $('#workskin-colors').on('click', function() {
        var curColors = Variables.get().colors;
        for(var i = 0; i < Object.keys(Options.colors).length; i++) {
            //debugging('Object.keys(Options.colors)[i]', Object.keys(Options.colors)[i]);
            if (curColors === Object.keys(Options.colors)[i]) {
                //debugging('foundOld', Object.keys(Options.colors)[i]);
                var j = i + 1;
                if (j === Object.keys(Options.colors).length) {
                    curColor = Object.keys(Options.colors)[0];
                } else {
                    curColor = Object.keys(Options.colors)[j];
                }
                //debugging('foundNew', curColor);
                Variables.set('colors', curColor);
                break;
            }
        }
    });

    $('#font-name-minus').on('click', function() {
        checkPosition();
        var curFont = Variables.get().fontName;
        for(var i = 0; i < Options.fontName.length; i++) {
            if (curFont === Options.fontName[i]) {
                var j = i - 1;
                if (j === -1) {
                    var u = Options.fontName.length - 1;
                    curFont = Options.fontName[u];
                } else {
                    curFont = Options.fontName[j];
                }
                Variables.set('fontName', curFont);
                break;
            }
        }
        returnBack();
    });
    $('#font-name-plus').on('click', function() {
        checkPosition();
        var curFont = Variables.get().fontName;
        for(var i = 0; i < Options.fontName.length; i++) {
            if (curFont === Options.fontName[i]) {
                var j = i + 1;
                if (j === Options.fontName.length) {
                    curFont = Options.fontName[0];
                } else {
                    curFont = Options.fontName[j];
                }
                Variables.set('fontName', curFont);
                break;
            }
        }
        returnBack();
    });

    $('#font-size-minus').on('click', function() {
        checkPosition();
        Variables.set('fontSize', Variables.get().fontSize - 2.5);
        returnBack();
    });
    $('#font-size-plus').on('click', function() {
        checkPosition();
        Variables.set('fontSize', Variables.get().fontSize + 2.5);
        returnBack();
    });

    $('#padding-plus').on('click', function() {
        checkPosition();
        var curPadding = Variables.get().padding + 1;
        if (curPadding > 40) { curPadding = 40; }
        Variables.set('padding', curPadding);
        returnBack();
    });
    $('#padding-minus').on('click', function() {
        checkPosition();
        var curPadding = Variables.get().padding - 1;
        if (curPadding < 0) { curPadding = 0; }
        Variables.set('padding', curPadding);
        returnBack();
    });

    // FULL SCREEN MODE
    $workskin.prepend('<div class="actions" style="float: right; margin: 1.5em 0; font-size: 80%;">' +
        '<div id="go-to-book" style="display: none;"><a>Go to Bookmark</a></div>' +
        '<div id="full-screen"><a>Full Screen</a></div>'+
        '</div>');

    $('body').append('<div class="ficleft">' +
        '<a id="arrow" title="up">^</a> <a id="bookmark" title="new bookmark">+</a> ' +
        '<a id="delete-book" title="delete bookmark" style="display: none;">x</a>' +
        '</div>');

    // changes to create full screen mode
    var isFullScreen = false;
    function fullScreen() {
        //debugging('fullScreen');
        $('#outer').children().hide();
        $('body').append($workskin);

        $('#workskin .preface').css({'margin': '0', 'padding-bottom': '0'});
        $('#workskin div.afterword').css('margin-bottom', '2.5em');
        $('#workskin .preface .summary .userstuff').addClass('notes-hidden');
        $('#workskin .preface .notes').each(function() {
            var $notes = $('<div class="notes-hidden"></div>');
            $(this).children('h3.heading').siblings().appendTo($notes);
            $(this).append($notes);
        });
        $('#workskin .preface .summary h3, #workskin .preface .notes h3').addClass('notes-headings')
        .each(function() { var text = $(this).text(); text = text.replace(':', ''); $(this).text(text); });

        $('#full-screen a').prepend('Exit from ');
        $('.ficleft').show();
        if (Bookmarks.checkIfExist()) {
            $('#delete-book').show();
            $('#go-to-book').show();
        }

        $(document).scrollTop(0);

        $workskin.append($('#feedback > ul.actions').css({ 'font-size': '80%', 'width': '100%', 'padding': ' 0 0 10px 0' }));
        $('#workskin > ul.actions > li:nth-child(1), #show_comments_link').remove();

        isFullScreen = true;
    }

    $('#workskin .preface .module').on('click', function() { // show/hide summary and notes
        $(this).children('.notes-hidden').fadeToggle(300);
    });

    $('#full-screen').on('click', function() { // open/close full screen mode
        if (!isFullScreen) fullScreen(); else window.location.reload();
    });

    $('#arrow').on('click', function() { // go to top
        $('html, body').animate({scrollTop:0}, 600);
    });

    $('#bookmark').on('click', function() { // set new bookmark
        //debugging('setBookmark');
        Bookmarks.getNew();
        $('#go-to-book').show();
        $('#delete-book').show();
        $('#bookmark').css('color', '#900');
        setTimeout(function() {
            $('#bookmark').css('color', 'inherit');
        }, 1500);
    });

    $('#go-to-book').on('click', function() { // go to the position of the bookmark
        //debugging('goToBook');
        var book = Bookmarks.checkIfExist('book');
        $('html, body').animate({scrollTop:book}, 600);
    });

    $('#delete-book').on('click', function() { // delete bookmark
        //debugging('deleteBookmark');
        var newBookmarks = Bookmarks.cancel();
        localStorage.setItem('ficstyle_bookmarks', JSON.stringify(newBookmarks));
        $('#delete-book').hide();
        $('#go-to-book').hide();
    });

})(jQuery);
