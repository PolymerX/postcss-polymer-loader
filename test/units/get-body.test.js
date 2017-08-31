'use strict';

import test from 'ava';
import fn from './../../src/lib/get-body';

const PARSED = {
  childNodes: [
    {nodeName: 'something'},
    {nodeName: 'html',
      childNodes: [
        {nodeName: 'another-something'},
        {nodeName: 'body',
          childNodes: [
            {nodeName: 'double-something'}
          ]
        }
      ]
    }
  ]
};

test('return dom-module node correctly', t => {
  const expected = {nodeName: 'body', childNodes: [{nodeName: 'double-something'}]};
  const actual = fn(PARSED);
  t.deepEqual(actual, expected, 'Body found');
});