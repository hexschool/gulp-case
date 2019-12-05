const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ lazy: false });
const autoprefixer = require('autoprefixer');
const minimist = require('minimist');
const log = require('fancy-log');
const browserSync = require('browser-sync').create();
const { options } = require('./options');

const devStatus = minimist(process.argv.slice(2), options.envOptions);

// develop status
// eslint-disable-next-line no-console
console.log(devStatus);

/**
 * ejs Block
 */
function ejs() {
  return gulp.src(options.ejs.src)
    .pipe($.ejs({
      title: options.ejs.projectName,
    }).on('error', log))
    .pipe($.rename({ extname: options.ejs.rename }))
    .pipe($.if(options.envOptions.env === 'prod', $.htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest(options.ejs.dist))
    .pipe(browserSync.stream());
}

/**
 * Sass block
 */
function sass() {
  const plugins = [
    autoprefixer(),
  ];
  return gulp.src(options.scss.src)
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        outputStyle: 'expanded',
        includePaths: options.scss.includePath,
      }).on('error', $.sass.logError),
    )
    .pipe($.postcss(plugins))
    .pipe($.if(options.envOptions.env === 'prod', $.cssnano()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(options.scss.dist))
    .pipe(browserSync.stream());
}

/**
 * JavaScript block
 */
function babel() {
  return gulp.src(options.javascript.src)
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['@babel/env'],
    }))
    .pipe($.concat(options.javascript.concat))
    .pipe($.if(options.envOptions.env === 'prod', $.uglify()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(options.javascript.dist))
    .pipe(browserSync.stream());
}

function vendorsJs() {
  return gulp.src(options.vendors.src)
    .pipe($.concat(options.vendors.concat))
    .pipe(gulp.dest(options.vendors.dist));
}

/**
 * Images block
 */
function images() {
  return gulp.src(options.images.src)
    .pipe($.if(options.envOptions.env === 'prod', $.image()))
    .pipe(gulp.dest(options.images.dist));
}

/**
 * browserSync
 */
function browser() {
  browserSync.init({
    server: {
      baseDir: options.browserSync.baseDir,
      reloadDebounce: options.browserSync.reloadDebounce,
    },
  });
}

/**
 * nodemon
 */
function nodemon() {
  $.nodemon({
    script: options.nodemon.script,
  });
}

/**
 * clean file
 */
function clean() {
  return gulp.src(options.clean.src, { read: false, allowEmpty: true })
    .pipe($.clean());
}

/**
 * watch file
 */
function watch() {
  gulp.watch(options.ejs.src, ejs);
  gulp.watch(options.scss.src, sass);
  gulp.watch(options.javascript.src, babel);
}

exports.build = gulp.series(clean, ejs, sass, babel, vendorsJs, images);

exports.buildHeroku = gulp.series(clean, ejs, sass, babel, vendorsJs, images, nodemon);

exports.default = gulp.series(
  clean,
  ejs,
  sass,
  babel,
  vendorsJs,
  images,
  gulp.parallel(browser, watch),
);
