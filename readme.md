# Readme

## The files and their connections

The connection between the files is something like this:

- when a page is loaded `content_script.js` is injected
- script checks if the API exists for the current site
- the result is sent to `background.js`, who sets the status of the icon
- and the `popup.html` does the fetching of the posts and so on

## Links and stuff

- [WP JSON REST API reference](https://developer.wordpress.org/rest-api/reference/)

## Build Setup

The extension must unfortunately be built, because:

> Some environments, such as Google Chrome Apps, enforce Content Security Policy (CSP), which prohibits the use of new Function() for evaluating expressions. The standalone build depends on this feature to compile templates, so is unusable in these environments.

The build process compiles the VUE template so it can work in the Chrome extension environment.

``` bash
# install dependencies
npm install

# build it. then you can install/reaload the extension in chrome
npm run build
```

## Example websites that works

Just some random ones that had updated to 4.7 when creating this plugin.

- https://hmn.md/ <- even has a post found called "not for your eyes" :)
- https://ma.tt/ <- has hidden page called "test123" :)
- https://simple-history.com
- http://www.norje.se/
- http://labs.earthpeople.se/- http://winassist.se/
- https://make.wordpress.org/core/
- https://tommcfarlin.com/
- https://brandson.se/
- http://lightweb.se/
- https://krokedil.se/
- https://erikbernskiold.com/
- https://www.bernskioldmedia.com
- https://10up.com/
- http://tdh.me/
- http://nackademin.se/
- https://required.com/
- http://www.wpbeginner.com/
- http://www.vansterpartiet.se/
