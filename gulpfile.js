const { src, dest, watch } = require('gulp'),
  autoprefixer = require('autoprefixer'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  browserSync = require('browser-sync').create(),
  ts = require('gulp-typescript'),
  reload = browserSync.reload,
  postcss = require('gulp-postcss'),
  pxtorem = require('postcss-pxtorem'),
  tsProj = ts.createProject('tsconfig.json');

function cssFix() {
  return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      pxtorem({
        rootValue: 37.5,
        propList: ['*'],
        replace: true,
      }),
    ]))
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
  watch('src/scss/*.scss', { ignoreInitial: false }, cssFix);
  watch('src/ts/*.ts', { ignoreInitial: false }, ts2es5);
  watch('src/js/*.js', { ignoreInitial: false }, js2es5);
  watch('*.html').on('change', reload);
};
