var gulp = require("gulp");
var rsync = require("gulp-rsync");


module.exports = function () {
  return gulp.src("dist/")
    .pipe(rsync({
      destination: '/var/vhost/laricettadellafelicita/docroot/',
      root: 'dist/',
      hostname: '46.101.225.6',
      username: 'root',
      incremental: true,
      progress: true,
      relative: true,
      emptyDirectories: true,
      recursive: true,
      clean: true,
      exclude: ['.DS_Store', 'uploads'],
      include: []
    }));
};
