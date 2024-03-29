const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style() {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}

function watchForChanges() {
  gulp.watch('./sass/*.scss', style);
  gulp.watch('*.html').on('change', browserSync.reload);
}

function moveFilesToPublicFolder() {
  const files = [
    'index.html',
    './images/**',
    './css/**'
  ];
  return gulp.src(files, { base: './' })
    .pipe(gulp.dest('../public/404-not-found'));
}

function sync() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
}

exports.default = (gulp.series(style), gulp.parallel(sync, watchForChanges));
exports.build = (gulp.series(moveFilesToPublicFolder));