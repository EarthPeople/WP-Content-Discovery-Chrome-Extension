import Vue from 'vue';
import Popup from './Popup.vue'
import data from './data.js';
var VueResource = require('vue-resource');

Vue.use(VueResource);

console.log("this is popup.js");

(function() {

  let app = null;

  document.addEventListener('DOMContentLoaded', function() {

    init();

  });

  function initVue() {

    app = new Vue({
      el: "#root",
      render: h => h(Popup)
    });

  }

  function init() {

    initVue();

    console.log("init data", data);

    // ...query for the active tab...
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {

       	console.log("popup sends message to content_script to get value of getApiUrl()");

        chrome.tabs.sendMessage(
            tabs[0].id, {
                from: 'popup',
                action: 'getApiUrl'
            },
            function(response) {

                console.log("popup send message response", response);
                console.log("data", data);
                data.apiUrl = response.apiUrl;

            }
        );

    });

  }

})();
