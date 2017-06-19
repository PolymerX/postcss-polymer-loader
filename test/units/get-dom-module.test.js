'use strict';

import test from 'ava';
import fn from './../../src/lib/get-dom-module';

const PARSED = {
  childNodes: [
    {nodeName: 'something'},
    {nodeName: 'html',
      childNodes: [
        {nodeName: 'another-something'},
        {nodeName: 'body',
          childNodes: [
            {nodeName: 'double-something'},
            {nodeName: 'dom-module', childNodes: [{nodeName: 'AWESOME'}]}
          ]
        }
      ]
    }
  ]
};

test('return dom-module node correctly', t => {
  const expected = {nodeName: 'dom-module', childNodes: [{nodeName: 'AWESOME'}]};
  const actual = fn(PARSED);
  t.deepEqual(actual, expected, 'Dom module found');
});