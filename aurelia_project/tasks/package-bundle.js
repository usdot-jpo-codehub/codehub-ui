import gulp from 'gulp';
import {CLIOptions, build as buildCLI} from 'aurelia-cli';
import build from './build';
import copyFilesPackageBundle from './copy-files-package-bundle';
import project from '../aurelia.json';

let bundle = gulp.series(
  readProjectConfiguration,
  build,
  copyFilesPackageBundle
);

let main;

if (CLIOptions.taskName() === 'package-bundle') {
  main = bundle;
}

function readProjectConfiguration() {
  return buildCLI.src(project);
}

function writeBundles() {
  return buildCLI.dest();
}

export { main as default };
