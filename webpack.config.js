const fs = require('fs');
if (fs.existsSync('./.env')) {
  require('dotenv').config();
}
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  fonts: path.resolve(__dirname, 'src/fonts'),
  dist: path.resolve(__dirname, 'dist'),
  index: path.resolve(__dirname, 'src/index.js'),
  public: path.resolve(__dirname),
  assets: path.resolve(__dirname, 'assets'),
};

const htmlFileSettings = {
  title: 'YOUR_TITLE_HERE',
  template: path.resolve(PATHS.src, 'index.template.ejs'),
  favicon: path.resolve(PATHS.assets, 'favicon.ico'),
  inject: 'body',
};

const baseConfig = {

  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
    publicPath: '/'
  },
  
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: PATHS.src
      }, {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        include: PATHS.css
      }, {
        test: /\.woff2$/,
        loader: 'url-loader',
        query: {
          name: 'fonts/[hash].[ext]',
          limit: 5000,
          mimetype: 'application/font-woff2'
        },
        include: PATHS.fonts
      }, {
        test: /\.woff$/,
        loader: 'url-loader',
        query: {
          name: 'fonts/[hash].[ext]',
          limit: 5000,
          mimetype: 'application/font-woff'
        },
        include: PATHS.fonts
      }, {
        test: /\.ttf$|\.eot$/,
        loader: 'file-loader',
        query: {
          name: 'fonts/[hash].[ext]'
        },
        include: PATHS.fonts
      }
    ]
  }
};

if (process.env.NODE_ENV === 'production') {

  htmlFileSettings.minify = {};

  module.exports = Object.assign({ // PRODUCTION CONFIG
    entry: [
      PATHS.index
    ],
    plugins: [
      new HtmlWebpackPlugin(htmlFileSettings),
      new webpack.optimize.OccurrenceOrderPlugin(),      
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compressor: {
          warnings: false,
          screw_ie8: true
        }
      }),
      
      new webpack.DefinePlugin({
        'process.env': {
          'API_URL': JSON.stringify(process.env.API_URL),
          'NODE_ENV': JSON.stringify('production'),
        },
        '__DEV__': false,
      })
    ]
  }, baseConfig);

} else {

  // Add react-hot-loader to development
  baseConfig.module.loaders[0].loaders.unshift('react-hot-loader/webpack');

  module.exports = Object.assign({ // DEVELOPMENT CONFIG
    devtool: 'eval-source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      PATHS.index
    ],
    plugins: [
      new HtmlWebpackPlugin(htmlFileSettings),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'API_URL': JSON.stringify('http://localhost:3000'),
          'NODE_ENV': JSON.stringify('development'),
        },
        '__DEV__': true,
      })
    ]
  }, baseConfig);

}