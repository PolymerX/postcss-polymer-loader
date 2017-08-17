/**
 * Get a PostCSS source full path
 * @module lib/full-path
 */

const {join, dirname} = require('path');

module.exports = (fp, rp) =>
  join(
    dirname(rp),
    fp
  );