var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;

var common = {
  devtool: 'eval-source-map',
  entry: ['whatwg-fetch', path.resolve('src', 'main.js')],
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: [
      {
        "test": /\.js?$/,
        "exclude": /node_modules/,
        "loader": "babel"
      },
      {
        "test": /\.html?$/,
        "loader": "raw"
      },
      {
        "test": /\.json?$/,
        "loader": "json"
      },
      {
        "test": /\.png$/,
        "loader": "url-loader",
        "query": { "mimetype": "image/png" }
      }
    ]
  },
  devServer: {
    historyApiFallback: {
      index: '/'
    },
    proxy: {
      '/api/*': {
        target: 'http://dev.servall.xyz',
        rewrite: function(req) {
          req.url = req.url.replace(/^\/api/, '');
        },
        secure: false
      }
    }
  }
};

if (TARGET === 'start') {
  module.exports = merge(common, {
    module: {
      loaders: [
        {
          test: /\.css?$/,
          loader: "style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]"
        },
        {
          test: /\.scss?$/,
          loader: "style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass"
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      })
    ]
  });
} else if (TARGET === 'build'){ // production
  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules")
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules!sass-loader")
        }
      ]
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new ExtractTextPlugin("styles.css"),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
  });
}
