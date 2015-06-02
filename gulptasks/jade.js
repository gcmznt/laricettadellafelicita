var gulp = require('gulp');
var jade = require('gulp-jade');


module.exports = function() {
  return gulp.src('./src/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/'))
};