'use strict';

const {join, basename} = require('path');
const fs = require('fs-extra');

module.exports = (filePath, resourcePath) => {
  const htmlFilename = basename(resourcePath);
  const folderPath = resourcePath.replace(htmlFilename, '');
  return fs.readFile(join(folderPath, filePath), 'utf8');
};
