var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');



module.exports = function () {
  return gulp.src('./src/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/assets/css'));
};
