import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import cache from 'gulp-cache';
import replace from 'gulp-replace';
import project from '../aurelia.json';
import {CLIOptions, build, Configuration} from 'aurelia-cli';
import pckg from '../../package.json';
import moment from 'moment';

let env = CLIOptions.getEnvironment();
const buildOptions = new Configuration(project.build.options);
const useCache = buildOptions.isApplicable('cache');

function configureEnvironment() {
  let ver = getBuildVersion(pckg.version);
  return gulp.src(`aurelia_project/environments/${env}.js`)
    .pipe(changedInPlace({firstPass: true}))
    .pipe(rename('environment.js'))
    .pipe(replace(/version: null/g,`version: \'${ver}\'`))
    .pipe(gulp.dest(project.paths.root));
}

function getBuildVersion(version) {
  let parts = version.split('.')
  if (parts.length != 3) {
    return version
  }

  let dt_str = moment().utc().toISOString()
  dt_str = dt_str.replace(/T/g,'').replace(/:/g,'').replace(/\-/g,'').substring(2,12)

  return `${parts[0]}.${parts[1]}.${dt_str}`
}

function buildJavaScript() {
  let transpile = babel(project.transpiler.options);
  if (useCache) {
    // the cache directory is "gulp-cache/projName-env" inside folder require('os').tmpdir()
    // use command 'au clear-cache' to purge all caches
    transpile = cache(transpile, {name: project.name + '-' + env});
  }

  return gulp.src(project.transpiler.source)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changedInPlace({firstPass: true}))
    .pipe(sourcemaps.init())
    .pipe(transpile)
    .pipe(build.bundle());
}

export default gulp.series(
  configureEnvironment,
  buildJavaScript
);
