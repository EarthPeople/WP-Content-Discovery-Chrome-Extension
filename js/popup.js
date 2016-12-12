console.log("this is popup.js");

(function() {

  let app = null;

  let data = {
    apiUrl: null
  }

  document.addEventListener('DOMContentLoaded', function() {

    init();

  });

  function initVue() {

    app = new Vue({
      el: "#root",
      data: data,
      template: `
        url: {{apiUrl}}
        <div v-if="apiUrl">
          WP API REST URL: {{apiUrl}}
        </div>

        {{data}}
        {{this}}
      `
    });

    console.log("app", app, data)

  }

  function init() {

    initVue();

    // ...query for the active tab...
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {

        // ...and send a request for the DOM info...
        console.log("send message to content_script.js");
        chrome.tabs.sendMessage(
            tabs[0].id, {
                from: 'popup',
                action: 'getApiUrl'
            },
            function(response) {

                console.log("popup send message response", response);

                if (response && response.apiUrl) {
                  data.apiUrl = response.apiUrl;
                }

            }
        );

    });

  }

})()
