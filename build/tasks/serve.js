var gulp = require('gulp');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    // Expecting a proxy to be present that will proxy to an API Server
    proxy: {
      target: 'localhost:8080',
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
    // server: {
    //   baseDir: ['.'],
    //   middleware: function(req, res, next) {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     next();
    //   }
    //}
  }, done);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-bundle', ['bundle'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    // Expecting a proxy to be present that will proxy to an API Server
    proxy: {
      target: 'localhost:8080',
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
    // server: {
    //   baseDir: ['.'],
    //   middleware: function(req, res, next) {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     next();
    //   }
    // }
  }, done);
});
