'use strict';

const postcss = require('postcss');
const getPostcssFromFile = require('./get-postcss-from-file');

module.exports = (sources, resourcePath, config) => {
  if (sources.length === 0) {
    return Promise.resolve([]);
  }

  const plugins = Object.assign({}, config.plugins);
  const options = Object.assign({}, config.options);

  const hasPlugins = Object.keys(plugins).length > 0;

  const promises = sources.reduce((acc, sourcePath) => {
    return acc.concat(
      getPostcssFromFile(sourcePath, resourcePath)
        .then(postcssFileContent => {
          if (hasPlugins) {
            return postcss(plugins).process(postcssFileContent);
          }
          return postcss().process(postcssFileContent, options);
        })
      );
  }, []);

  return Promise.all(promises);
};