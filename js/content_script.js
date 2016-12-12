/**
 * Runs on each page load. Check for the existance of the WP JSON API for the current site
 *
 * From the chrome dev page:
 * > Content scripts are JavaScript files that run in the context of web
 * > pages. By using the standard Document Object Model (DOM), they can read
 * > details of the web pages the browser visits, or make changes to them.
 *
 * This script is injected at "document_idle":
 * > In the case of "document_idle", the browser chooses a time to inject
 * > scripts between "document_end" and immediately after the window.onload
 * > event fires. The exact moment of injection depends on how complex the
 * > document is and how long it is taking to load, and is optimized for page
 * > load speed.
 */

//console.log("this is content_script.js", this, document, window);

(function() {

	let apiUrl = null;

	init();

	function init() {

		apiUrl = getApiUrl();

		// console.log("apiUrl", apiUrl);

		// if apiUrl is found then let our extension know about it
		/*console.log("chrome", chrome)
		console.log("chrome.extension", chrome.extension)
		console.log("chrome.extension.getBackgroundPage()", chrome.extension.getBackgroundPage())*/

		let message = {
			greeting: "hello",
			action: 'setApiUrlResult',
			apiUrl
		};

		chrome.runtime.sendMessage(message, function(response) {
			//console.log("response", response);
		});

		chrome.runtime.onMessage.addListener(function (msg, sender, response) {

			if (msg && msg.action && msg.action === 'getApiUrl') {

				// console.log("content_script recieved onmessage with action getApiUrl", getApiUrl());

				response({
					"apiUrl": getApiUrl()
				});

			}
		});

	}

	function getApiUrl() {

		// According to https://developer.wordpress.org/rest-api/discovery/
		// a link element is added to the html like this:
		// <link rel='https://api.w.org/' href='http://example.com/wp-json/' />
		var link = document.querySelector("link[rel='https://api.w.org/']");

		// if no link then no API found
		// @TODO: try to call /wp-json/ and /?rest_route=/ and check for existance that way

		if (link) {

			var href = link.getAttribute("href");

			if (href) {
				return href;
			}

		}

		return null;

		// with pretty links url is
		// https://simple-history.com/wp-json/
		// without pretty links url is
		// https://simple-history.com/?rest_route=/

	}

}());

