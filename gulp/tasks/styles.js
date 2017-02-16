var gulp = require('gulp');
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var addVariablesToCss = require('postcss-simple-vars');
var addNestedCssStructures = require('postcss-nested');
var cssImport = require('postcss-import');

gulp.task('styles', function() {
  return gulp.src('./assets/css/main.css')
    .pipe(postCss([cssImport,addVariablesToCss,addNestedCssStructures,autoprefixer]))
    .on('error', function(error) {
      console.log(error.toString());
      this.emit('end');
    }) // if an error occurs
    .pipe(gulp.dest('./assets/temp/css'));
});
