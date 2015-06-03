var gulp = require("gulp");
var rsync = require("gulp-rsync");


module.exports = function () {
  return gulp.src("dist/")
    .pipe(rsync({
      destination: '/var/vhost/laricettadellafelicita/',
      root: 'dist/',
      hostname: '95.85.31.194',
      username: 'root',
      incremental: true,
      progress: true,
      relative: true,
      emptyDirectories: true,
      recursive: true,
      clean: true,
      exclude: ['.DS_Store'],
      include: []
    }));
};
