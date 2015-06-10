var gulp = require("gulp");


module.exports = function () {
  return gulp.src("src/*.php")
    .pipe(gulp.dest("dist"));
};
