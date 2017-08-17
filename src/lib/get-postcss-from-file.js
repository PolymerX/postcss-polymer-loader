const fs = require('fs-extra');
const fullPath = require('./full-path');

module.exports = (fp, rp) =>
  fs.readFile(
    fullPath(fp, rp),
    'utf8'
  );