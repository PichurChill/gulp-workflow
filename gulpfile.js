var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload =   browserSync.reload;
    stylus = require('gulp-stylus'),
    mincss = require('gulp-mini-css'),
    uglify = require('gulp-uglify');
// 资源路径
var source = './app/';
// 压缩
gulp.task('stylus-min', function () {
  return gulp.src( source + '**/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest( source + '/dist/css'));
});
// 不压缩
gulp.task('stylus', function () {
  return gulp.src( source + '**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest( source + '/dist/css'));
});

// js css压缩
gulp.task('mincss', function() {
    gulp.src(source+'src/**/*.css')
          .pipe(mincss())
          .pipe(gulp.dest(source + 'dist'));
});
gulp.task('minjs', function() {
    gulp.src(source+'src/**/*.js')
          .pipe(uglify())
          .pipe(gulp.dest(source + 'dist'));
});
gulp.task('min',function(){
    gulp.run('minjs');
});

// 监视文件改动并重新载入
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['./**/*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'app'}, reload);
  gulp.watch('./**/*.styl', ['stylus']);  

});