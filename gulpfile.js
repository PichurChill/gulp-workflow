var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload =   browserSync.reload;
    stylus = require('gulp-stylus'),
    mincss = require('gulp-mini-css'),
    uglify = require('gulp-uglify'),
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
gulp.task('stylus', function () {
  return gulp.src( source + './src/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })
    )
    .pipe(gulp.dest( source + '/dist/css'));
});

gulp.task('copyJS',  function() {
  return gulp.src( source + './src/js/**/*.js')
    .pipe(gulp.dest( source + '/dist/js'))
});
gulp.task('copyPublic',  function() {
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

// 监视文件改动并重新载入
gulp.task('default', ['stylus', 'copyJS', 'copyPublic'],function() {
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