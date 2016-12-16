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

  function initGA() {

      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-44872713-18']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();

  }

  function init() {

    initVue();
    initGA();

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
