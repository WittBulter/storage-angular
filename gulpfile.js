const gulp = require('gulp')
const del = require('del')
const webpack = require('webpack')
const path = require('path')
const cache = require('gulp-cached')
const tslint = require('gulp-tslint')
const exec = require('child_process').exec
const argv = require('yargs')
  .boolean('failOnError')
  .default('failOnError', false)
  .argv

const compilePath = /^win/.test(process.platform)
  ? 'node_modules\\.bin\\ngc.cmd'
  : './node_modules/.bin/ngc'

gulp.task('lint', () => gulp.src(['src/**/*.ts'])
  .pipe(cache('lint'))
  .pipe(tslint({ formatter: 'prose' }))
  .pipe(tslint.report({
    emitError: argv.failOnError,
    summarizeFailureOutput: true,
  })))

gulp.task('compile', done => {
  exec(`${compilePath} -p ./tsconfig.json`, err => err ? console.log(err) : done())
    .stdout
    .on('data', data => console.log(data))
})

gulp.task('bundle', done => {
  webpack({
    devtool: 'source-map',
    resolve: { extensions: ['.js'] },
    entry: path.join(__dirname, './release/', 'mocker.module.js'),
    output: {
      path: path.join(__dirname, 'bundle/'),
      filename: 'ng-mocker.js',
      libraryTarget: 'umd',
    },
    externals: [/^\@angular\//, /^rxjs\//],
  }, err => {
    err && console.log(`Webpack Error: ${err}`)
    done()
  })
})

gulp.task('clean', () => del(['dist/']))
gulp.task('build', gulp.series('clean', 'lint', 'compile', 'bundle'))
gulp.task('default', gulp.series('build'))

