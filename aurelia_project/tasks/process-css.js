import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import sourcemaps from 'gulp-sourcemaps';
import less from 'gulp-less';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processCSS() {
  return gulp.src(project.cssProcessor.path+'styles.less')
    // .pipe(changedInPlace({firstPass: false}))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(less({paths: [project.cssProcessor.path,'./node_modules/bootstrap-less']}))
    .pipe(gulp.dest('./styles/'))
    .pipe(build.bundle());
}
