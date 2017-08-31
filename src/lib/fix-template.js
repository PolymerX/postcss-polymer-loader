'use strict';

module.exports = (postcssRes, source) => {
  const template = `<style>${postcssRes.join(' ')}</style>`;
  return source
		.replace(/<postcss.+<\/postcss>/g, template);
};