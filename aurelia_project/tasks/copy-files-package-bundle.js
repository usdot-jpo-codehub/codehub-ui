import gulp from 'gulp';
import * as fs from 'fs-extra';
import project from '../aurelia.json';

export default function copyFilesPackageBundle(done) {
  if (typeof project.bundle !== 'object') {
    done();
    return;
  }

  if(!project.bundle.copyFiles || project.bundle.copyFiles.length==0){
    done();
    return;
  }

  if (fs.existsSync(project.bundle.target)) {
    fs.removeSync(project.bundle.target);
  }

  if (!fs.existsSync(project.bundle.target)){
    fs.mkdirSync(project.bundle.target);
  }

  project.bundle.copyFiles.forEach( (item) => {
    // process.stdout.write(JSON.stringify(item)+'\n');
    if(item.dest !== '') {
      if(!fs.existsSync(project.bundle.target+item.dest)) {
        fs.mkdirSync(project.bundle.target+item.dest);
      }
    }
    gulp.src(item.pattern)
      .pipe(gulp.dest(project.bundle.target+item.dest));
  });
  done();
}

