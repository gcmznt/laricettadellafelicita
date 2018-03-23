var gulp = require("gulp");

module.exports = function() {
  return gulp.src("./src/{_headers,*.php}").pipe(gulp.dest("./dist/"));
};
