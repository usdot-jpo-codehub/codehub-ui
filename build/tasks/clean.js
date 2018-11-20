var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');

function cleanWorker() {
  return gulp.src([paths.output],{ allowEmpty: true })
	.pipe(vinylPaths(del));
}

// deletes all files in the output path
gulp.task('clean', function(done){
	gulp.series(['unbundle'], cleanWorker )(done);
});
