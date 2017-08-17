import test from 'ava';
import fullPath from '../../src/lib/full-path';

test('fullPath()', t => {
  t.is(
    fullPath('test.postcss', '/my/dir/file.html'),
    '/my/dir/test.postcss',
    'should return the full path of a source based on the path of the resource file'
  );
});