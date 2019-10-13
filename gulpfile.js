var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  plumber = require('gulp-plumber'),
  $ = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create(),
  ts = require('gulp-typescript'),
  reload = browserSync.reload;
console.log(1);
//创建静态服务器并监听sass、html、js文件的修改
gulp.task('serve', function() {
  browserSync.init({
    server: './',
  });
  gulp.watch('src/scss/*.scss', ['cssFix']);
  gulp.watch('src/ts/*.ts', ['ts']);
  gulp.watch('src/js/*.js', ['es6']);
  gulp.watch('*.html').on('change', reload);
  gulp.watch('src/js/*.js').on('change', reload);
  gulp.watch('src/ts/*.ts').on('change', reload);
});

//编译sass，自动加兼容后缀
gulp.task('cssFix', function() {
  gulp
    .src('src/scss/*.scss')
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        remove: false, //是否去掉不必要的前缀 默认：true
      })
    )
    .pipe(gulp.dest('src/css'))
    .pipe(
      reload({
        stream: true,
      })
    );
});

gulp.task('es6', function() {
  gulp
    .src('src/js/*.js')
    .pipe($.plumber())
    .pipe(
      $.babel({
        presets: ['es2015'],
      })
    )
    .pipe(gulp.dest('src/es5'));
});

gulp.task('ts', function() {
  gulp
    .src('src/ts/*.ts')
    .pipe(ts.createProject('tsconfig.json')())
    .pipe(
      $.babel({
        presets: ['es2015'],
      })
    )
    .pipe(gulp.dest('src/es5'));
});

gulp.task('default', ['serve']);
