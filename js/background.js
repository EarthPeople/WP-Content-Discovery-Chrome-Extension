
console.log("this is background.js");

chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {

	console.log("background.js: ondomcontentloaded", details.url, details);

		/*
		console.log("chrome", chrome);
		console.log("chrome.browserAction", chrome.browserAction);
		chrome.browserAction.setBadgeText({
			text: "YO!"
		});
		*/

});

function setIconState(state, tabId) {

	chrome.browserAction.setBadgeText({
		tabId: tabId,
		text: state === 'active' ? "API" : ""
	});


	if (state === 'active') {


	} else {

	}

}

// Retrieve message from the content script regarding the availability of the WP JSON API
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	// info about the sender object:
  	// https://developer.chrome.com/extensions/runtime#type-MessageSender
  	console.log("background onMessage", request, sender);

  	if (request && request.action && request.action === 'setApiUrlResult') {

  		console.log('got api result, apiUrl is', request.apiUrl);

  		setIconState(request.apiUrl ? 'active' : 'inactive', sender.tab.id);

  	}

    /*console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  	*/

  	/*sendResponse({
  		"yes": "This is dog",

  	});*/

  });

// Called when the user clicks on the browser action.
// Funkar inte pga använder popup
/*chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});
*/
