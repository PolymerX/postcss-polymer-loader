'use strict';

module.exports = (postcssRes, source) => {
  const template = `
    <template> <style>${postcssRes.join(' ')}</style>
  `;

  const newSource = source
		.replace(/<postcss.+<\/postcss>/g, '')
		.replace(/<template>/i, template);
  return newSource;
};