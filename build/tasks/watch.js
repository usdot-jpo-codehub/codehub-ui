var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');

// outputs changes to files to the console
function reportChange(event) {
  console.log('File ' + event + ' was changed, running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
function browserSyncWorker(done){
  browserSync.reload();
  done();
}

gulp.task('watch', function(done){
  gulp.series(['serve'], function(done) {
    gulp.watch(paths.source, gulp.parallel(['build-system', browserSyncWorker])).on('change', reportChange);
    gulp.watch(paths.html, gulp.parallel(['build-html', browserSyncWorker])).on('change', reportChange);
    gulp.watch(paths.css, gulp.parallel(['build-css'])).on('change', reportChange);
    gulp.watch(paths.style, gulp.parallel(function() {
      return gulp.src(paths.style).pipe(browserSync.stream());
    })(done)).on('change', reportChange);
    done();
  })(done);
});
