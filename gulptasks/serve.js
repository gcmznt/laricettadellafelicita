var gulp = require('gulp');
var browserSync = require('browser-sync').create();


module.exports = function() {

  browserSync.init({
    server: "./dist",
    open: false
  });

  gulp.watch("./src/assets/sass/**/*.scss", ['styles']);
  gulp.watch("./src/assets/js/**/*.js", ['scripts']);
  gulp.watch("./src/assets/images/*", ['images']);
  gulp.watch("./src/assets/fonts/*", ['fonts']);
  gulp.watch("./src/**/*.jade", ['templates']);
  gulp.watch("./dist/assets/css/style.css").on('change', browserSync.reload);
  gulp.watch("./dist/assets/js/all.js").on('change', browserSync.reload);
  gulp.watch("./dist/assets/images/*").on('change', browserSync.reload);
  gulp.watch("./dist/assets/fonts/*").on('change', browserSync.reload);
  gulp.watch("./dist/*.html").on('change', browserSync.reload);
};
