'use strict';

import test from 'ava';
import fn from './../../src/lib/get-postcss-sources';

const DOM_MODULE = {
  childNodes: [
    {
      nodeName: 'nothing'
    },
    {
      nodeName: 'img',
      attrs: [{name: 'src', value: 'nothing-here'}]
    },
    {
      nodeName: 'postcss',
      attrs: [{name: 'src', value: './style.postcss'}]
    },
    {
      nodeName: 'img',
      attrs: [{name: 'src', value: 'another-nothing'}]
    },
    {
      nodeName: 'postcss',
      attrs: [{name: 'src', value: './style2.postcss'}]
    }
  ]
};

const DOM_MODULE_NO_SRC = {
  childNodes: [
    {
      nodeName: 'postcss'
    }
  ]
};

test('get postcss file path from postcss tag', t => {
  const expected = ['./style.postcss', './style2.postcss'];
  const actual = fn(DOM_MODULE);
  t.deepEqual(actual, expected, 'Postcss path sources found inside the dom-module');
});

test('handle <postcss> tag without "src" attribute', t => {
  const expected = [];
  const actual = fn(DOM_MODULE_NO_SRC);
  t.deepEqual(actual, expected, 'Returns empty array when src is not specified');
});