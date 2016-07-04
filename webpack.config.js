var path = require('path');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var HtmlPlugins = glob.sync('./src/views/**/*.pug').map(function (entry) {
  return new HtmlWebpackPlugin({
    template: entry,
    filename: path.win32.basename(entry, '.pug') + '.html'
  });
});

module.exports = {
  entry: {
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.pug']
  },
  module: {
    loaders: [
      {
        test: /\.pug$/,
        loader: 'pug-static-loader'
      }
    ]
  },
  plugins: HtmlPlugins,
  pug: {
    pretty: true,
    locals: {
      foo: 'bar'
    }
  }
}