import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import sourcemaps from 'gulp-sourcemaps';
import less from 'gulp-sass';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processSCSS() {
  return gulp.src(project.cssProcessorScss.path+'main.scss')
    // .pipe(changedInPlace({firstPass: false}))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(less({paths: [project.cssProcessorScss.path,'./node_modules/gulp-sass']}))
    .pipe(gulp.dest('./styles/uswds_css/'))
    .pipe(build.bundle());
}
