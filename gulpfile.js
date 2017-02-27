const gulp = require('gulp')
const gutil = require('gulp-util')
const clean = require('gulp-clean')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const postcssImport = require('postcss-import')
const precss = require('precss')
const csso = require('postcss-csso')
const assets  = require('postcss-assets')
const autoprefixer = require('autoprefixer')
const revAll = require('gulp-rev-all')
const changed = require('gulp-changed')
const config = require('config')
const webpack = require('webpack')
const nodemon = require('nodemon')
const webpackConfig = config.pro ?
  require('./config/webpack.config.pro.js') :
  require('./config/webpack.config.dev.js')

gulp.task('clean:css', function () {
  return gulp.src('public/css', {read: false})
    .pipe(clean())
})

gulp.task('clean:js', function () {
  return gulp.src('public/js', {read: false})
    .pipe(clean())
})
 
gulp.task('css', ['clean:css'], function () {
  let assetsOpt = {
    basePath: './client',
    loadPaths: ['img', 'fonts']
  }
  let plugins = [
    postcssImport,
    assets(assetsOpt),
    precss
  ]
  if (config.pro) {
    plugins = plugins.concat([
      autoprefixer({browsers: '> 5%'}),
      csso({comments: false})
    ])
  }
  return gulp.src('client/scss/**/[^_]*.scss')
    .pipe(plumber())
    .pipe(postcss(plugins))
    .pipe(rename({extname: '.css'}))
    .pipe(gulp.dest('public/css'))
})

gulp.task('js', ['clean:js'], function (callback) {
  webpack(Object.create(webpackConfig), function(err, stats) {
    if(err || stats.hasErrors()) {
      throw new gutil.PluginError("webpack", err)
    }
    gutil.log("[webpack]", stats.toString({ colors: true }))
    callback()
  })
})

gulp.task('img', function () {
  return gulp.src(['client/img/**'])
    .pipe(changed('public/img'))
    .pipe(gulp.dest('public/img'))
    .pipe(gulp.dest('public/img'))
})

gulp.task('fonts', function () {
  return gulp.src(['client/fonts/**'])
    .pipe(changed('public/fonts'))
    .pipe(gulp.dest('public/fonts'))
    .pipe(gulp.dest('public/fonts'))
})

gulp.task('server', function (cb) {
  let started = false
  return nodemon({
    script: 'bin/www'
  })
  .on('start', function () {
    if (!started) {
      cb()
      started = true
      gutil.log('[nodemon] listening to', config.port)
    }
  })
})

gulp.task('rev', function () {
  let options = {
    prefix: config.cdn.prefix,
    includeFilesInManifest: ['.js', '.css', '.jpg', '.jpeg', '.png', '.gif', '.svg']
  }
  return gulp.src('public/**')
    .pipe(revAll.revision(options))
    .pipe(gulp.dest(config.cdn.dir))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(config.cdn.manifestPath))
})

gulp.task('watch', function () {
  gulp.watch('client/scss/**', ['css'])
  gulp.watch('client/js/**', ['js'])
  gulp.watch('client/img/**', ['img'])
  gulp.watch('client/fonts/**', ['fonts'])
})

gulp.task('build', ['css', 'js', 'img', 'fonts'], function () {
  gulp.start('rev')
})

gulp.task('default', ['css', 'js', 'img', 'fonts', 'watch', 'server'], function () {})
