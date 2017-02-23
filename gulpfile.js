/**
 * Created by qq515 on 2016/10/2.
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');

var browserSync = require('browser-sync').create();

gulp.task('less', function () {
    return gulp.src('./master/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('jsConcat', function () {
    gulp.src('./master/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream());
});

gulp.task('loginConcat', function () {
    gulp.src('./master/login/**/*.js')
        .pipe(concat('login.js'))
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream());
});

gulp.task('file:watch', function () {
    gulp.watch('./master/js/**/*.js', ['jsConcat']);
    gulp.watch('./master/login/**/*.js', ['loginConcat']);
    gulp.watch('./master/less/**/*.less', ['less']);
});

gulp.task('server',function(){
   browserSync.init({
       server:"./"
   });
    gulp.watch('./master/js/**/*.js', ['jsConcat']);
    gulp.watch('./master/login/**/*.js', ['loginConcat']);
    gulp.watch('./master/less/**/*.less', ['less']);
    gulp.watch('./templates/**/*.html').on('change', browserSync.reload);;
});

gulp.task('default',['jsConcat','loginConcat','less','server']);