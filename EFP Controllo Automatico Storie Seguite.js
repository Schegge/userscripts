// ==UserScript==
// @name         EFP: Controllo Automatico Storie Seguite
// @namespace    https://github.com/Schegge
// @version      1.0
// @description  Controllo automatico e segnalazione di nuovi capitoli aggiunti alle storie seguite
// @author       Schegge
// @match        http://www.efpfanfic.net/
// @match        http://www.efpfanfic.net/followed.php
// @grant        none
// ==/UserScript==


(function($) {

    // DEBUGGING /////////////////////////////////////////////////////////////////////////////////
    var debug = false;
    function debugging(varName, variable) {
        if (debug) {
            var messaggio = "{Controllo Storie Seguite} [" + varName + "]";
            if (variable !== undefined) messaggio += " (" + typeof variable + ") " + variable;
            console.log(messaggio);
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////

    debugging("inizio");

    // controllare se siamo sulla pagina delle storie seguite (followed) oppure no
    var followPage = false;
    if (window.location.pathname== "/followed.php") followPage = true;
    debugging("followPage", followPage);

    // se non siamo in followed, recuperare le informazioni con una richiesta xhr, altrimenti non ce n'è bisogno
    if (!followPage) {        
        $("body").append("<div id='data-followed' style='display: none'></div>"); // dove i dati verranno salvati
        // richiesta xhr
        $.get("http://www.efpfanfic.net/followed.php").done(function(data){
            debugging("richiesta xhr] [data");
            // prendere gli elementi tra #corpo e #footer
            var dataCut = data.split("<div id=\"corpo\">")[1];
            dataCut = dataCut.split("<div id=\"footer\">")[0];
            debugging("dataCut", dataCut);
            // inserirli nella pagina
            $("#data-followed").html("<div id=\"corpo\">" + dataCut);
            // controllare le informazioni sulle storie e capitoli
            checkNewChapters("#data-followed");
        });
    } else {
        checkNewChapters("#wrap");
    }

    function checkNewChapters(element) {
        // element = #data-followed se siamo in followed, altrimenti #wrap
        var parentId = element;

        var save = [], saved = ""; // serviranno per salvare titoli e capitoli
        // l'elenco delle storie seguite
        $(parentId + " #corpo > div:nth-child(1) > div:nth-child(3) > div")
            .each(function() {
                // titolo e capitolo si trovano in un <div> che non ha id
                if ($(this).attr("id") === undefined) {
                    // il titolo si trova nell'unico <strong> presente
                    var title = $(this).children("strong").text();
                    title = title.replace(/[@#]/g, " ");
                    title = title.trim();
                    // il capitolo in un <a>
                    var chapter = $(this).children("a").text();
                    // che combacia con (numeri).(spazio)(lettere)
                    var found = chapter.match(/(\d+)\.\s\w+/);
                    // found[1] combacia con il raggruppamento (\d+) ossia il numero del capitolo
                    save.push([title, found[1]]);
                }
            });
        // aggiungere i titoli e i capitoli in una stringa
        for(var i = 0; i < save.length; i++) {
            // save[i][0] = titolo, save[i][1] = numero capitolo
            saved += "@" + save[i][0] + "#" + save[i][1];
        }
        debugging("save", save);
        debugging("saved", saved);

        var alert = ""; // servirà per indicare a quali storie sono stati aggiunti capitoli
        // recuperare l'ultimo salvataggio
        var past = localStorage.getItem("followed");
        debugging("past", past);
        // se esiste controllare se ci sono modifiche, altrimenti fare il primo salvataggio
        if (past) {
            if (past == saved) {
                debugging("Nessun cambio e nessuna nuova storia aggiunta o tolta");
            } else {
                // sgl = le informazioni per ogni storia: titolo + numero capitolo insieme
                var sgl = past.split("@");
                debugging("sgl", sgl);
                // dividere anche titolo e capitolo: els[][0] = titolo, els[][1] = numero capitolo
                var els = [];
                for(var x = 1; x < sgl.length; x++) {
                    els.push( sgl[x].split("#") );
                }
                debugging("els", els);

                // per ogni elemento appena recuperato controllare con i dati salvati se ci sono state modifiche
                for(var j = 0; j < els.length; j++) {
                    for(var z = 0; z < save.length; z++) {
                        debugging("titoli] [" + els[j][0] + " ? " + save[z][0]);
                        // se il titolo combacia
                        if (els[j][0] == save[z][0]) {
                            debugging("capitoli] [" + els[j][1] + " ? " + save[z][1]);
                            // se il capitolo combacia non fare niente, altrimenti...
                            if (els[j][1] == save[z][1]) {
                                debugging(els[j][0] + "\" non ha nessun nuovo capitolo");
                            } else {
                                // calcolare la differenza di capitoli
                                var diff = parseInt(save[z][1]) - parseInt(els[j][1]);
                                debugging("diff", diff);
                                var testo = " nuovo capitolo";
                                if (diff > 1) testo = " nuovi capitoli";
                                // aggiungerlo ad alert
                                alert += "\"<b>" + els[j][0] + "</b>\" ha " + diff + testo + ".<br>";
                                debugging(els[j][0] + "\" ha " + diff + testo);
                                debugging("alert", alert);
                            }
                        }
                    }
                }
                // se siamo in followed salvare i nuovi cambiamenti
                if (followPage) {
                    localStorage.setItem("followed", saved);
                    debugging("Salvati i nuovi cambiamenti");
                }
            }
        } else {
            localStorage.setItem("followed", saved);
            debugging("Primo salvataggio");
        }

        // segnale per verificare se ci sono state modifiche oppure no, se ce sono state alert non è vuoto
        var segnale = false;
        if (alert.length) segnale = true; else alert += "Nessun nuovo capitolo.";
        debugging("segnale", segnale);
        debugging("alert", alert);

        // aggiungere le indicazione delle modifiche salvate in alert e in homepage anche il cuoricino se ce ne sono state
        if (followPage) {
            $("#corpo > div:nth-child(1) > div:nth-child(3)").before("<div style='margin: 0px 10px 10px 15px; padding: 0 10px 10px 10px; color: #009999;'>" + alert + "</div>");
        } else if (segnale) {
            var menuWidth = parseInt($("#secondmenu").css("width"));
            $("#secondmenu").prepend("<a id='cuore' style='color: #009999' href='http://www.efpfanfic.net/followed.php'>&#9825;</a><div id='alert' style='display: none; position: absolute; color: #009999; background-color: #fff; padding: 5px; font-size: 10px; line-height: 14px; text-align: left; box-shadow: 0 0 3px 0 rgba(91, 146, 178, .5); border-radius: 3px; margin-top: 5px; width: " + menuWidth + "px;'>" + alert + "</div>"
            );
            $("#cuore").hover(function() {
                $("#alert").slideToggle(400);
            });
        }
    }

})(jQuery);