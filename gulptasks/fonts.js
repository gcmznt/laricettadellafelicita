var gulp = require("gulp");
var gulpfontgen = require("gulp-fontgen");


module.exports = function () {
  return gulp.src("src/assets/fonts/*.ttf")
    .pipe(gulpfontgen({
      dest: "./dist/assets/fonts/"
    }));
};
