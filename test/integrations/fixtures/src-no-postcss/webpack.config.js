'use strict';

const {join} = require('path');

module.exports = {
  resolveLoader: {
    alias: {
      'postcss-polymer-loader': join(__dirname, './../../../../src/index.js'),
    }
  },
  module: {
    rules: [{
      test: /\.html$/,
      loaders: ['wc-loader', 'postcss-polymer-loader']
    }]
  }
}