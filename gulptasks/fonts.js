var gulp = require("gulp");
// var gulpfontgen = require("gulp-fontgen");

module.exports = function() {
  return (
    gulp
      .src("src/assets/fonts/*")
      // .pipe(gulpfontgen({
      //   dest: "./dist/assets/fonts/"
      // }));
      .pipe(gulp.dest("./dist/assets/fonts"))
  );
};
