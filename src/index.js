'use strict';

const parse5 = require('parse5');
const postcssrc = require('postcss-load-config');

const getDomModule = require('./lib/get-dom-module');
const getPostcssSources = require('./lib/get-postcss-sources');
const processPostcss = require('./lib/process-postcss');
const fixTemplate = require('./lib/fix-template');

module.exports = function (source) {
  const cb = this.async();
  const htmlFilePath = this.resourcePath;

  // Check if at least one tag <postcss> is present or return the source.
  if (source.includes('<postcss src') === false) {
    return cb(null, source);
  }

  const parsed = parse5.parse(source);
  const domModule = getDomModule(parsed);
  const sourcesFilePath = getPostcssSources(domModule);

  postcssrc()
    .then(config => processPostcss(sourcesFilePath, htmlFilePath, config))
    .then(postcssRes => cb(null, fixTemplate(postcssRes, source)))
    .catch(err => cb(err));
};