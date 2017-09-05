'use strict';

const HtmlPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const {DefinePlugin, EnvironmentPlugin} = require('webpack');

require('dotenv').config();
const production = process.env.NODE_ENV === 'production';

let plugins = [
  new EnvironmentPlugin(['NODE_ENV']),
  new ExtractPlugin('bundle-[hash].css'),
  new HtmlPlugin({template: `${__dirname}/src/index.html`}),
  DefinePlugin({
    __DEBUG__: JSON.stringify(!production),
    __API_URL__: JSON.stringify(process.env.API_URL)
  })
];

if (production) {
  plugins = plugins.concat([new CleanPlugin, new UglifyPlugin]);
}
