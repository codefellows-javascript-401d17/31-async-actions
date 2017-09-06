'use strict';

//TODO: change this...
//since not .env but .dev.env, must pass in path option to config
require('dotenv').config();
//see DefinePlugin (this line for production)
const production = process.env.NODE_ENV === 'production';

const { DefinePlugin, EnvironmentPlugin } = require('webpack');
//locates root template (src/index.html)
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');

let plugins = [
  //webpack constant, comes from inside webpack
  new EnvironmentPlugin(['NODE_ENV']),
  new ExtractPlugin('bundle-[hash].css'),
  new HtmlPlugin({ template: `${__dirname}/src/index.html` }),
  //env vars as webpack constant
  new DefinePlugin({
    __DEBUG__: JSON.stringify(!production),
    __API_URL__: JSON.stringify(process.env.API_URL)
  })
]

//minification and obfuscation for production mode
if (production) {
  //take all plugins => single plugin
  plugins = plugins.concat([new CleanPlugin(), new UglifyPlugin()])
}


module.exports = {
  entry: `${__dirname}/src/main.js`,
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle-[hash].js',
    //cache in NY, cache in LA -- global distribution
    publicPath: process.env.CDN_URL
  },
  plugins,
  module: {
    rules: [
      //makes sure es6 usable on all browsers
      { test: /\.js$/, exclude: /\node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/, loader: ExtractPlugin.extract(['css-loader'], ['sass-loader'])
      },
      {
        test: /\.(woff|woff2|ttf|eot|glyph|\.svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'font/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|tiff|svg)$/,
        exclude: /\.glyph.svg/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 6000,
              name: 'image/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp3|aac|wav|flac|m4a|mp4|ogg)$/,
        exclude: /\.glyph.svg/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'audio/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: 'inline-source-map'
}
