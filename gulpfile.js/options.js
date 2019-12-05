const path = './public';

exports.options = {
  projectName: 'projectName',
  envOptions: {
    string: 'env',
    default: {
      env: 'dev',
    },
  },
  ejs: {
    src: [
      './src/templates/**.ejs',
      '!./src/templates/**/_*.ejs',
    ],
    rename: '.html',
    dist: path,
  },
  scss: {
    src: ['./src/stylesheets/**/*.scss'],
    includePath: ['./node_modules/bootstrap/scss'],
    dist: `${path}/stylesheets`,
  },
  javascript: {
    src: ['./src/javascript/all.js'],
    concat: 'all.js',
    dist: `${path}/javascript`,
  },
  vendors: {
    src: [
      './node_modules/jquery/dist/**/jquery.min.js',
      './node_modules/bootstrap/dist/js/**/bootstrap.bundle.min.js',
    ],
    concat: 'vendors.js',
    dist: `${path}/javascript`,
  },
  images: {
    src: ['./src/images/**/*'],
    dist: `${path}/images/`,
  },
  clean: {
    src: path,
  },
  browserSync: {
    baseDir: path,
    reloadDebounce: 2000,
  },
  nodemon: {
    script: './server/app.js',
  }
};
