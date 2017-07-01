'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();


gulp.task('css', function(){
  return gulp.src('css/style.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css/'));
});

gulp.task('watch', function(){
  gulp.watch('css/style.less', ['css']);
});

gulp.task('sync', function(){
  browserSync.init({
    server: './'
  });

  browserSync.watch(['css/style.css', 'index.html']).on('change', browserSync.reload);
});

gulp.task('default', function(cb){
  runSequence('css', ['watch', 'sync'], cb);
});

