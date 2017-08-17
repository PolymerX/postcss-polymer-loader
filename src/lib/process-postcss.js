const postcss = require('postcss');
const sourceFrom = require('./get-postcss-from-file');
const fullPath = require('./full-path');

const opts = (file, resource, options) =>
  Object.assign({}, options, {from: fullPath(file, resource)});

const process = (file, resource, config) =>
  sourceFrom(file, resource)
    .then(src =>
      postcss(config.plugins)
        .process(src, opts(file, resource, config.options))
    );

const processWith = (resource, config) => (acc, src) =>
  acc.concat(process(src, resource, config));

module.exports = (sources, resource, config) =>
  Promise.all(
    sources.reduce(processWith(resource, config), [])
  );