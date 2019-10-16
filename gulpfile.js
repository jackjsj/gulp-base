const { src, dest, watch } = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  browserSync = require('browser-sync').create(),
  ts = require('gulp-typescript'),
  reload = browserSync.reload,
  tsProj = ts.createProject('tsconfig.json');

function cssFix() {
  return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        remove: false, //是否去掉不必要的前缀 默认：true
      })
    )
    .pipe(dest('src/css'))
    .pipe(
      reload({
        stream: true,
      })
    );
}

function ts2es5() {
  return src('src/ts/*.ts')
    .pipe(tsProj())
    .pipe(
      babel({
        presets: [
          [
            '@babel/env',
            {
              targets: {
                browsers: ['last 2 versions', 'Android >= 4.0'],
              },
              modules: false,
            },
          ],
        ],
      })
    )
    .pipe(dest('src/es5'))
    .pipe(
      reload({
        stream: true,
      })
    );
}

function js2es5() {
  return src('src/js/*.js')
    .pipe(
      babel({
        presets: [
          [
            '@babel/env',
            {
              targets: {
                browsers: ['last 2 versions', 'Android >= 4.0'],
              },
              modules: false,
            },
          ],
        ],
      })
    )
    .pipe(dest('src/es5'))
    .pipe(
      reload({
        stream: true,
      })
    );
}

exports.default = function() {
  browserSync.init({
    server: './',
  });
  watch('src/scss/*.scss', cssFix);
  watch('src/ts/*.ts', ts2es5);
  watch('src/js/*.js', js2es5);
  watch('*.html').on('change', reload);
};
