var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload =   browserSync.reload;
    stylus = require('gulp-stylus'),
    mincss = require('gulp-mini-css'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    autoprefixer = require('gulp-autoprefixer');
// 资源路径
var source = './app/',
    dist = './app/dist/';

// 压缩 stylus-css
gulp.task('stylus-min', function () {
  return gulp.src( source + './src/stylus/**/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest( source + '/dist/css'));
});
// 不压缩 stylus-css
gulp.task('stylus', ['clean'], function () {
  return gulp.src( source + './src/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })
    )
    .pipe(gulp.dest( source + '/dist/css'));
});

gulp.task('copyJS', ['clean'],  function() {
  return gulp.src( source + './src/js/**/*.js')
    .pipe(gulp.dest( source + '/dist/js'))
});
gulp.task('copyPublic', ['clean'],  function() {
  return gulp.src( source + './src/public/**/**')
    .pipe(gulp.dest( source + '/dist/public'))
});
// js css压缩
gulp.task('mincss', function() {
    gulp.src(dist+'css/**/*.css')
          .pipe(mincss())
          .pipe(gulp.dest(source + 'dist/css'));
});
gulp.task('minjs', function() {
    gulp.src(source+'src/**/*.js')
          .pipe(uglify())
          .pipe(gulp.dest(source + 'dist'));
});


gulp.task('min',function(){
    gulp.run('minjs', 'mincss');
});

// 删除原先build的
gulp.task('clean', function () {
    return gulp.src(dist, {read: false})
        .pipe(clean());
});


// 监视文件改动并重新载入
gulp.task('default', ['clean', 'stylus', 'copyJS', 'copyPublic'],function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });
  // gulp.run('stylus', 'copyJS', 'copyPublic');
  gulp.watch(['./**/*.html', './dist/**/*.css', './dist/**/*.js'], {cwd: 'app'}, reload);

  gulp.watch(source + '/src/stylus/**/*.styl', ['stylus']);  
  gulp.watch(source + '/src/js/**/*.js', ['copyJS']);
  gulp.watch(source + '/src/public/**/**', ['copyPublic']);  
});