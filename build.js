require('shelljs/global');
var webpack = require('webpack');
var ora = require('ora');
var config = require('./webpack.config');

var spinner = ora('building for production...');
spinner.start();

rm('-rf', './dist');
mkdir('-p', './dist');

var compiler = webpack(config);

compiler.run(function (err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
});