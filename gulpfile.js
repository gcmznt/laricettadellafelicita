var gulp = require('gulp');


// Single tasks
gulp.task('templates', require('./gulptasks/jade'));
gulp.task('styles', require('./gulptasks/sass'));
gulp.task('scripts', require('./gulptasks/babel'));
gulp.task('images', require('./gulptasks/imagemin'));
gulp.task('fonts', require('./gulptasks/fonts'));
gulp.task('copy', require('./gulptasks/copy'));

// Aggregated
gulp.task('compile', [
  'templates',
  'styles',
  'scripts',
  'fonts',
  'copy',
  'images'
]);
gulp.task('serve', ['compile'], require('./gulptasks/serve'));
gulp.task('deploy', ['compile'], require('./gulptasks/rsync'));
gulp.task('default', ['compile']);






