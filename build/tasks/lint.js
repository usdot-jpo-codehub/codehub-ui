var gulp = require('gulp');
var paths = require('../paths');
var eslint = require('gulp-eslint');

// runs eslint on all .js files
gulp.task('lint', function() {
  return gulp.src(paths.source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', function(done){
    gulp.series(['lint'], function (done) {
      // This will only run if the lint task is successful...
      done();
    })(done);
  }
);
