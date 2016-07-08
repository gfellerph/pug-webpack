var path = require('path');
var glob = require('glob');
var utils = require('./utils');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var HtmlPlugins = glob.sync('./src/views/**/*.pug').map(function (view) {
  return new HtmlWebpackPlugin({
    template: view,
    filename: path.win32.basename(view, '.pug') + '.html',
    inject: true
  });
});

console.log(path.resolve(__dirname + '/src/js/main.js'));

module.exports = {
  entry: {
    app: './src/js/main.js'
  },

  output: {
    path: path.resolve(__dirname + '/dist'),
    publicPath: '/',
    filename: 'js/[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.vue', '.pug'],
    fallback: [path.join(__dirname, 'node_modules')],
    alias: {
      src: path.resolve(__dirname + '/src')
    }
  },

  /*externals: {
    'vue': 'Vue'
  },*/

  module: {
    loaders: [
      {
        test: /\.pug$/,
        loader: 'pug-static-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ].concat(utils.styleLoaders())
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin(utils.assetsPath('css/[name].css')),
  ].concat(HtmlPlugins),

  devtool: '#source-map',

  vue: {
    loaders: utils.cssLoaders({
      sourceMap: '#source-map',
      extract: true
    })
  },

  pug: {
    pretty: true,
    locals: {
      foo: 'bar'
    }
  }
}