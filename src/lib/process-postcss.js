'use strict';

const postcss = require('postcss');
const getPostcssFromFile = require('./get-postcss-from-file');

module.exports = (sources, resourcePath, config) => {
  if (sources.length === 0) {
    return Promise.resolve([]);
  }

  const plugins = config.plugins.slice();
  const options = Object.assign({}, config.options);

  const promises = sources.reduce((acc, sourcePath) => {
    return acc.concat(
      getPostcssFromFile(sourcePath, resourcePath)
        .then(postcssFileContent => {
          return postcss(plugins).process(postcssFileContent, options);
        })
      );
  }, []);

  return Promise.all(promises);
};