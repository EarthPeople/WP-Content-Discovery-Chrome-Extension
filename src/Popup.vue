
<template>
  <div id="rootRendered">

   <div v-if="apiUrl">

      <p>
        Found WordPress API REST URL at:
        <br><code><a v-bind:href="apiUrl">{{apiUrl}}</a></code>
      </p>

      <div v-if="apiVersionFound">
        <p>Found version <code>{{apiVersionFound}}</code> of API.</p>
      </div>
      <div v-else>
        <p>No API version found that we can work with.</p>
      </div>

    </div>
    <div v-else>
      <p>Sorry, no WP API REST found at this page.</p>
    </div>

    <div v-if="apiVersionFound">

      <div v-if="pages">
        <h2>Pages</h2>
        <p>Got {{pages.length}} pages from the WP-JSON API.</p>
        <ul>

          <li v-for="post in pages">
            <a :href="post.link">{{post.title.rendered}}</a>
          </li>

        </ul>
      </div>
      <div v-else>
        <h2>Pages</h2>
        <p>Fetching pages...</p>
      </div>

      <div v-if="posts">
        <h2>Posts</h2>
        <p>Got {{posts.length}} pages from the WP-JSON API.</p>
        <ul>

          <li v-for="post in posts">
            <a :href="post.link">{{post.title.rendered}}</a>
          </li>

        </ul>
      </div>
      <div v-else>
        <h2>Posts</h2>
        <p>Fetching posts...</p>
      </div>

    </div>

</div>
</template>

<script>

  import data from './data.js';

  // console.log("from Popup.vue", data);

  export default {
    name: 'popup',
    data () {
      return data;
    },
    methods: {

      getPosts() {

        let url = `${data.apiUrl}wp/v2/posts?per_page=99`;

        this.$http.get(url).then((response) => {
          if (response.ok) {
            console.log("pages ok response", response.body);
            this.posts = response.body;
          }
        }, (response) => {
          console.log("pages err response", response);
        });

      },

      getPages() {

        let url = `${data.apiUrl}wp/v2/pages?per_page=99`;

        this.$http.get(url).then((response) => {
          if (response.ok) {
            console.log("posts ok response", response.body);
            this.pages = response.body;
          }
        }, (response) => {
          console.log("posts err response", response);
        });

      },

      /**
       * Return api version, something like "wp/v2"
       * @return mixed string version if version found, undefined if not found
       */
      getApiVersion() {

        let url = `${data.apiUrl}`;

        this.$http.get(url).then((response) => {

          if (response.ok && response.body.namespaces) {

            console.log("getApiVersion ok response", response.body.namespaces);
            //this.pages = response.body;

            let apiVersion = response.body.namespaces.find((val) => {
              return val.match('wp/v');
            });

            console.log("apiVersion", apiVersion);

            this.apiVersionFound = apiVersion;

            this.getPages();
            this.getPosts();

          }
        }, (response) => {
          console.log("getApiVersion err response", response);
          this.apiVersionFound = null;
        });

      }

    }, // methods

    watch: {

      apiUrl(newApiUrl) {

        console.log("apiUrl changed to", newApiUrl);

        this.getApiVersion();

      }

    } // watch

  }
</script>
