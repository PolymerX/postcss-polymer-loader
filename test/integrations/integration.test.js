'use strict';

import {join} from 'path';
import {remove, readFile} from 'fs-extra';

import test from 'ava';
import execa from 'execa';

const CWD = join(__dirname, 'fixtures');

const ENTRY = join(CWD, 'src', 'index.js');
const TMP_DIR = join(CWD, 'dist-test');
const TMP_APPJS = join(TMP_DIR, 'app.js');

const ENTRY_NO_POSTCSS = join(CWD, 'src-no-postcss', 'index.js');
const TMP_DIR_NO_POSTCSS = join(CWD, 'dist-test-no-postcss');
const TMP_APPJS_NO_POSTCSS = join(TMP_DIR_NO_POSTCSS, 'app.js');

test('correct run webpack and process postcss', async t => {
  await execa('webpack', [ENTRY, TMP_APPJS], {cwd: CWD});
  const appJs = await readFile(TMP_APPJS, 'utf8');
  t.true(appJs.includes('<template> <style>div{background:black;}p{color:red;}span{color:green;}</style>'), 'Correct compilation postcss');
});

test('handle without postcss tag, returning the source', async t => {
  await execa('webpack', [ENTRY_NO_POSTCSS, TMP_APPJS_NO_POSTCSS], {cwd: CWD});
  const appJs = await readFile(TMP_APPJS_NO_POSTCSS, 'utf8');
  t.false(appJs.includes('<style>'), 'No compilation without <postcss> tags');
});

test.after(async t => {
  await remove(TMP_DIR);
  await remove(TMP_DIR_NO_POSTCSS);
});