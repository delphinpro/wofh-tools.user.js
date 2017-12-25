/**
 * Wofh Tools Client script.
 *
 * @since        20.01.2016 16:04
 * @author       delphinpro delphinpro@gmail.ru
 * @copyright    copyright (C) 2016 delphinpro
 * @license      Licensed under the MIT license
 */

const path    = require('path');
const webpack = require('webpack');

const headerString = require('./source/banner.js');
const NODE_ENV     = process.env.NODE_ENV || 'production';
const DEV_BUILD    = process.env.DEV_BUILD || false;
const DEV_MODE     = NODE_ENV === 'development';

console.log(`Webpack start in ${NODE_ENV.toUpperCase()} mode`);

let entry      = './source/wofh-tools.user.js';
let outputDir  = path.join(__dirname, 'dist');
let outputFile = DEV_MODE ? 'wofh-tools.dev.user.js' : 'wofh-tools.user.js';
console.log(`Output into: ${path.join(outputDir, outputFile)}`);

let webpackConfig = {
  entry,
  output: {
    path    : outputDir,
    filename: outputFile,
  },

  watch  : DEV_MODE && (DEV_BUILD === false),

  module : {
    noParse: '/jquery.js/',

    rules: [
      {
        test: /\.scss$/,
        use : [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {minimize: true}},
          {loader: 'autoprefixer-loader', options: {browsers: 'last 2 version'}},
          {loader: 'sass-loader'},
        ],
      },
      {
        test: /\.png$/,
        use : [
          {loader: 'url-loader', options: {name: '[path][name].[ext]'}},
        ],
      },
      {
        test: /\.twig$/,
        use : [
          {loader: 'twig-loader'},
        ],
      },
      {
        test: /\.js$/,
        use : [
          {loader: 'babel-loader'},
        ],
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      DEV_MODE: JSON.stringify(DEV_MODE),
    }),
  ],
};

if (NODE_ENV === 'production') {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    parallel : true,
    compress : {
      warnings    : false,
      drop_console: true,
    },
  }));

  webpackConfig.plugins.push(new webpack.BannerPlugin({
    banner: headerString,
    raw   : true,
  }));
}

module.exports = webpackConfig;
