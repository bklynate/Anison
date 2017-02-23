var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./public/temp/css/main.css')
    .pipe(browserSync.stream());
})

gulp.task('watch', function() {

  browserSync.init({
    server: {
      baseDir: "."
    }
  });

  watch('./views/index.ejs', function() {
    browserSync.reload();
  });

  watch('./public/css/**/*.css', function() {
    gulp.start('cssInject');
  });

});
