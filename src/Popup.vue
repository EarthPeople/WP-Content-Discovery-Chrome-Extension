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

        <div v-if="apiVersionFound" class="report">
            <ul class="report-nav">
                <li class="report-nav__item" v-bind:class="{'report-nav__item--active': show_pages}">
                    <a v-on:click.prevent="switchTab('pages')" href="#report-pages" class="report-nav__link">Pages</a>
                </li>
                <li class="report-nav__item" v-bind:class="{'report-nav__item--active': show_posts}">
                    <a v-on:click.prevent="switchTab('posts')" href="#report-posts" class="report-nav__link">Posts</a>
                </li>
                <li class="report-nav__item" v-bind:class="{'report-nav__item--active': show_users}">
                    <a v-on:click.prevent="switchTab('users')" href="#report-users" class="report-nav__link">Users</a>
                </li>
                <li class="report-nav__item" v-bind:class="{'report-nav__item--active': show_about}">
                    <a v-on:click.prevent="switchTab('about')" href="#report-about" class="report-nav__link">About</a>
                </li>
            </ul>

            <div id="report-pages" class="report__items report__items--pages" v-show="show_pages">
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
            </div>

            <div id="report-posts" class="report__items report__items--posts" v-show="show_posts">
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
            <div id="report-users" ref="tab-users" class="report__items report__items--users" v-show="show_users">
                <div v-if="users">
                    <h2>Users</h2>
                    <p>Got {{users.length}} users from the WP-JSON API.</p>
                    <ul>

                        <li v-for="user in users">
                            <img :src="user.avatar_urls['24']">
                            <a :href="user.url">{{user.slug}}</a>
                        </li>

                    </ul>
                </div>
                <div v-else>
                    <h2>Users</h2>
                    <p>Fetching users...</p>
                </div>
            </div>

            <div id="report-about" ref="tab-about" class="report__items report__items--about" v-show="show_about">
                <h2>About</h2>
                <p>This extension is built by <a href="http://earthpeople.agency">Earth People.</a></p>
                <p>
                    Check out or plugin checker, to find what popular plugins your favorite sites are running:
                    <a href="http://wppluginchecker.earthpeople.se/">WordPress Plugin Checker</a>
                </p>
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
            console.log("pages ok response", response.body);
            this.pages = response.body;
          }
        }, (response) => {
          console.log("pages err response", response);
        });

      },

      getUsers() {

        let url = `${data.apiUrl}wp/v2/users`;

        this.$http.get(url).then((response) => {
          if (response.ok) {
            console.log("users ok response", response.body);
            this.users = response.body;
          }
        }, (response) => {
          console.log("users err response", response);
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
            this.getUsers();

          }
        }, (response) => {
          console.log("getApiVersion err response", response);
          this.apiVersionFound = null;
        });

      },

      switchTab(tab) {
        this.show_pages = tab === 'pages';
        this.show_posts = tab === 'posts';
        this.show_users = tab === 'users';
        this.show_about = tab === 'about';
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
