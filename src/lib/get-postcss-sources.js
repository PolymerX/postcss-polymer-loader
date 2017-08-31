'use strict';

module.exports = body => {
  return body.childNodes.reduce((acc, item) => {
    if (item.nodeName !== 'postcss') {
      return acc;
    }

    if (item.attrs === undefined || item.attrs.length === 0) {
      return acc;
    }

    const src = item.attrs.find(attr => attr.name === 'src');
    acc = acc.concat(src.value);
    return acc;
  }, []);
};