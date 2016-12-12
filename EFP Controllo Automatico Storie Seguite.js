// ==UserScript==
// @name         EFP: Controllo Automatico Storie Seguite
// @namespace    https://github.com/Schegge
// @version      1.1
// @description  Controllo automatico e segnalazione di nuovi capitoli aggiunti alle storie seguite
// @author       Schegge
// @match        http://www.efpfanfic.net/
// @match        http://www.efpfanfic.net/followed.php
// @grant        none
// ==/UserScript==


(function($) {
    function debugging(msg, variable) {
        var messaggio = 'CSS:\t' + msg;
        if (variable !== undefined) {
            messaggio += ' (' + typeof variable + ') ';
            console.log(messaggio, variable);
            return;
        }
        console.log(messaggio);
    }
    debugging('inizio');

    // controllare se siamo sulla pagina delle storie seguite (followed) oppure no
    var followPage = window.location.pathname === '/followed.php' ? true : false;
    debugging('followPage', followPage);

    // se non siamo in followed recuperare le informazioni tramite load(), altrimenti non ce n'è bisogno
    if (!followPage) {
        $('body').append('<div id="data-followed" style="display: none"></div>'); // dove i dati verranno salvati
        $('#data-followed').load('/followed.php #corpo', function() {
            debugging('load /followed.php');
            checkNewChapters('#data-followed');
        });
    } else {
        checkNewChapters('#wrap');
    }

    function checkNewChapters(element) {
        var save = {}; // nuovo controllo
        // l'elenco delle storie seguite
        $(element + ' #corpo > div:nth-child(1) > div:nth-child(3) > div')
            .each(function() {
                // titolo e capitolo si trovano in un <div> che non ha id
                if ($(this).attr('id') === undefined) {
                    // il titolo si trova nell'unico <strong> presente
                    var title = $(this).children('strong').text().trim();
                    // il capitolo in un <a>
                    var chapter = $(this).children('a').text();
                    // che combacia con (numeri).(spazio)(lettere)
                    var found = chapter.match(/(\d+)\.\s\w+/);
                    // found[1] combacia con il raggruppamento (\d+) ossia il numero del capitolo
                    save[title] = parseInt(found[1]);
                }
            });
        debugging('save', save);

        var alert = ''; // servirà per indicare a quali storie sono stati aggiunti capitoli
        // recuperare l'ultimo salvataggio
        var past = JSON.parse(localStorage.getItem('followed'));
        debugging('past', past);

        // se esiste controllare se ci sono modifiche, altrimenti fare il primo salvataggio
        if (past) {
            // per ogni elemento appena recuperato controllare con i dati salvati se ci sono state modifiche
            for(var key in save) {
                if (!save.hasOwnProperty(key) || !past.hasOwnProperty(key)) continue;
                if (save[key] === past[key]) {
                    debugging(key + ' non ha nuovi capitoli');
                } else {
                    // calcolare la differenza di capitoli
                    var diff = save[key] - past[key];
                    var testo = diff > 1 ? ' nuovi capitoli': ' nuovo capitolo';
                    // aggiungerlo ad alert
                    alert += '<b>' + key + '</b> ha ' + diff + testo + '.<br>';
                    debugging(key + ' ha ' + diff + testo);
                }

            }
            // se siamo in followed salvare i nuovi cambiamenti
            if (followPage) {
                localStorage.setItem('followed', JSON.stringify(save));
                debugging('salvati i nuovi cambiamenti');
            }
        } else {
            localStorage.setItem('followed', JSON.stringify(save));
            debugging("primo salvataggio");
        }

        // segnale per verificare se ci sono state modifiche oppure no, se ce sono state alert non è vuoto
        var segnale = alert.length ? true : false;
        if (!alert.length) alert += 'Nessun nuovo capitolo.';
        debugging('segnale', segnale);
        debugging('alert', alert);

        // aggiungere la indicazione delle modifiche salvate in alert, e in homepage anche il cuoricino se ci sono state
        if (followPage) {
            $('#corpo > div:nth-child(1) > div:nth-child(3)').before('<div style="margin: 0px 10px 10px 15px; padding: 0 10px 10px 10px; color: #009999;">' + alert + '</div>');
        } else if (segnale) {
            var menuWidth = parseInt($('#secondmenu').width());
            $('#secondmenu').prepend('<a id="cuore" style="color: #009999;" href="http://www.efpfanfic.net/followed.php">&#9825;</a><div id="alert" style="display: none; position: absolute; color: #009999; background-color: #fff; padding: 5px; font-size: 10px; line-height: 14px; text-align: left; box-shadow: 0 0 3px 0 rgba(91, 146, 178, .5); border-radius: 3px; margin-top: 5px; width: ' + menuWidth + 'px;">' + alert + '</div>'
            );
            $('#cuore').hover(function() {
                $('#alert').slideToggle(400);
            });
        }
    }

})(jQuery);