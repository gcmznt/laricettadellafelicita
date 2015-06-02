var gulp = require('gulp');


gulp.task('templates', require('./gulptasks/jade'));
gulp.task('styles', require('./gulptasks/sass'));
gulp.task('scripts', require('./gulptasks/babel'));
gulp.task('images', require('./gulptasks/imagemin'));
gulp.task('fonts', require('./gulptasks/fonts'));
gulp.task('serve', [
  'templates',
  'styles',
  'scripts',
  'fonts',
  'images'
], require('./gulptasks/serve'));
gulp.task('default', ['serve']);






