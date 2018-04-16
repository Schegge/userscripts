// ==UserScript==
// @name         Viki: Subtitles Settings
// @namespace    https://github.com/Schegge
// @version      1.0.3
// @description  Change subtitles font, size, color, shadow and background
// @author       Schegge
// @include      https://www.viki.com/videos/*
// @grant        none
// ==/UserScript==

(function() {
	// default values
	var defValues = {
		size: '1.45em',
		font: 'sans-serif',
		color: '#fff',
		shadow: 'rgba(0, 0, 0, .6)',
		background: 'transparent',
		bottom: '10%',
		width: '100'
	};

	// saved values
	var config = localStorage.getItem('sub_style');
	if (config) {
		config = JSON.parse(config);
		// in case i'm adding options
		/*
			for (var d in defValues) {
				if (!config[d]) config[d] = defValues[d];
			}
		*/
		// in case i'm removing options
		/*
			for (var r in config) {
				if (!defValues[r]) config[r] = undefined;
			}
		*/
	} else {
		config = JSON.parse(JSON.stringify(defValues));
	}

	// add css changes
	var style = document.createElement('style');
	addCSS();
	document.getElementsByTagName('head')[0].appendChild(style);

	// HTML for options
	var options = document.createElement('div');
	options.id = 'vs-options';
	options.className = 'card card-content';
	Object.keys(config).forEach(function(c) {
		options.innerHTML += '<div>' + c + ': <input id="vs-' + c + '" type="text" value="' + config[c] + '"></div>';
	});
	// the save button
	var save = document.createElement('div');
	save.id = 'vs-save';
	save.className = 'btn-simple strong';
	save.textContent = 'SAVE';
	options.appendChild(save);
	// add options to the page
	document.querySelector('.video-lists-tab-content').insertAdjacentElement('afterbegin', options);

	// save changes
	save.addEventListener('click', function() {
		Object.keys(config).forEach(function(c) {
			if (document.getElementById('vs-' + c).value.trim()) {
				config[c] = document.getElementById('vs-' + c).value;
			} else {
				config[c] = defValues[c];
				document.getElementById('vs-' + c).value = config[c];
			}
		});
		addCSS();
		localStorage.setItem('sub_style', JSON.stringify(config));
		save.textContent = 'SAVED';
		setTimeout(function() { save.textContent = 'SAVE'; }, 1000);
	}, false);

	// add css function
	function addCSS() {
		var padding = (100 - parseInt(config.width, 10)) / 2;
		style.textContent = '.vjs-text-track-display { bottom: 0px !important } ' +
		'.vjs-fullscreen .vjs-text-track-display > div > div > div { ' +
		'font-size: ' + config.size + ' !important; }' +
		'.vjs-text-track-display > div > div { ' +
		'font-size: ' + config.size + ' !important; ' +
		'font-family: ' + config.font + ' !important; ' +
		'top: auto !important;' +
		'bottom: ' + config.bottom + ' !important; ' +
		'padding: 0 ' + padding + '%; }' +
		'.vjs-text-track-display > div > div > div { ' +
		'color: ' + config.color + ' !important;' +
		'text-shadow:  -1px -1px 1px ' + config.shadow + ', 2px 2px 1px ' + config.shadow + ', 2px 2px 3px ' + config.shadow + ', 2px 2px 4px ' + config.shadow + ' !important;' +
		'background-color: ' + config.background + ' !important; } ' +
		'#vs-options { text-align: right; } ' +
		'#vs-options input { display: inline; width: 70%; padding: 0 .5em; margin: 0; font-size: .9em; font-family: consolas, monospace; } ' +
		'#vs-save { padding: .2em 1.5em 0 0; } ';
	}
})();
