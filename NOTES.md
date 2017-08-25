# Details

This is a SPIKE for AethOS to determine how much effort would be required to implement packaging AethOS applications.

Here's what we know so far.

AethOS applications need to be packaged into three bundles:
  
  * Server
  * Middleware (service worker)
  * Client

These three bundles have different entry points, but contain a lot of shared code.

Questions:

 * Can webpack do this?  (yes)
 * Do we have to do anything special for node packages that need to be in a non-server bundle? (i.e. can we forgo JSPM)
 * What is the appropriate project directory structure?
 * What other questions / answers can be determined in this SPIKE?

## Structure

Initially I was leaning towards having a client, server, middleware entrypoints in the same project, but now I think it's best to have everything as separate projects.

Server side is organized in services, so we should create a generic service bus for the middleware, with client code to interface (possibly convention not a library).

Any shared code should be kept in separate node modules so that they can be installed in each service, middleware or client app.

Bundle 'app.js' for each application, and have a single aethos.js bundle for all of the common packages that can be used by applications.

## Observations

Use webpack instead of gulp.

It turns out that aurelia cli does a pretty good job of handling webpack.

To test it as if it is a standalone app, don't forget to install nps and http-server.

```
sudo npm install nps -g
npm install http-server
```

To run, use `npm start`, and to test use `npm test`.

As of this writing, aurelia cli has a bug in it, so make sure you use a version that is older than 8/25/2017, or you will have to fix a syntax error in index.js.

## Followup questions

How can we create a base "aethos.js" bundle that contains all of the common application libraries and place that in the root, and then have applications use that bundle without having to re-bundle in each application?

/
  aethos.js
  middleware.js
  vendor.js (common vendor libraries)
  /apps
    /app1
      app.js
      vendor.js (don't include anything from aethos.js or index.js)
      index.html
    /app2
      app.js
      vendor.js
      index.html
  /lib
    /lib1
      index.js

Possibly use webpack [externals](https://webpack.js.org/configuration/externals/)?

No, externals is used for external non-webpack bundled modules with a single entry point (such as fully minified libraries like jquery, underscore, lodash, bootstrap, etc)

It looks like [DllPlugin](https://github.com/webpack/webpack/tree/master/examples/dll) and [DllReferencePlugin](https://github.com/webpack/webpack/tree/master/examples/dll-user) might be able to handle it.

And more specifically [Aurelia webpack](https://github.com/aurelia/webpack-plugin/wiki/Using-Webpack-DLL) documents how to do it.

Create the Dll (core aethos components) in one project and then export the manifest to other projects (via npm package?  that would be best, so that a standalone app can be tested).