var path = require('path')
var glob = require("glob")

module.exports = {
  entry: {
    app: './src/app.js',
    common: glob.sync("./src/assets/js/*.js")
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/math/static/',
    filename: '[name].js'
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    'zepto': 'Zepto'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.less'],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
//        loader: 'babel!eslint',
        loader: 'babel',
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.less$/,
        loader: 'css!less'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel',
      less: 'vue-style!css!less'
    }
  }
}