'use strict';

import test from 'ava';
import fn from './../../src/lib/fix-template';

const SOURCE = `
  <dom-module id="test-awesome">
    <postcss src="./style.postcss"></postcss>
    <postcss src="./style2.postcss"></postcss>
    <template>
      <div class="TestDivOne"></div>
      <div class="TestDivTwo"></div>
    </template>
  </dom-module>
`;

const CSS = ['.TestDivOne {color: black;}', 'div {background: green;}'];

test('return a correct replacement', t => {
  const expected = '<style>.TestDivOne {color: black;} div {background: green;}</style>';
  const actual = fn(CSS, SOURCE);
  t.true(actual.includes(expected), 'Replaced <template> and added styles');
  t.false(actual.includes('<postcss'), 'Removed <postcss> tags');
});