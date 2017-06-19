'use strict';

import {join} from 'path';
import {remove, readFile} from 'fs-extra';

import test from 'ava';
import execa from 'execa';

const CWD = join(__dirname, 'fixtures');

const CWD_MAIN = join(CWD, 'src');
const ENTRY = join(CWD_MAIN, 'index.js');
const TMP_DIR = join(CWD_MAIN, 'dist-test');
const TMP_APPJS = join(TMP_DIR, 'app.js');

const CWD_NO_POSTCSS = join(CWD, 'src-no-postcss')
const ENTRY_NO_POSTCSS = join(CWD_NO_POSTCSS, 'index.js');
const TMP_DIR_NO_POSTCSS = join(CWD_NO_POSTCSS, 'dist-test-no-postcss');
const TMP_APPJS_NO_POSTCSS = join(TMP_DIR_NO_POSTCSS, 'app.js');

const CWD_POSTCSS_PLUGINS = join(CWD, 'src-postcss-plugins');
const ENTRY_POSTCSS_PLUGINS = join(CWD_POSTCSS_PLUGINS, 'index.js');
const TMP_DIR_POSTCSS_PLUGINS = join(CWD_POSTCSS_PLUGINS, 'dist-test-postcss-plugins');
const TMP_APPJS_POSTCSS_PLUGINS = join(TMP_DIR_POSTCSS_PLUGINS, 'app.js');

test('correct run webpack and process postcss', async t => {
  await execa('webpack', [ENTRY, TMP_APPJS], {cwd: CWD_MAIN});
  const appJs = await readFile(TMP_APPJS, 'utf8');
  t.true(appJs.includes('<template> <style>div{background:black;}p{color:red;}span{color:green;}</style>'), 'Correct compilation postcss');
});

test('correct run webpack and configuration with plugin for postcss (autoprefixer)', async t => {
  await execa('webpack', [ENTRY_POSTCSS_PLUGINS, TMP_APPJS_POSTCSS_PLUGINS], {cwd: CWD_POSTCSS_PLUGINS});
  const appJs = await readFile(TMP_APPJS_POSTCSS_PLUGINS, 'utf8');
  t.true(appJs.includes('<style>div{display:-webkit-box;display:-ms-flexbox;display:flex;}</style>'), 'Compile with plugins');
});

test('handle without postcss tag, returning the source', async t => {
  await execa('webpack', [ENTRY_NO_POSTCSS, TMP_APPJS_NO_POSTCSS], {cwd: CWD_NO_POSTCSS});
  const appJs = await readFile(TMP_APPJS_NO_POSTCSS, 'utf8');
  t.false(appJs.includes('<style>'), 'No compilation without <postcss> tags');
});

test.after(async t => {
  await remove(TMP_DIR);
  await remove(TMP_DIR_NO_POSTCSS);
  await remove(TMP_DIR_POSTCSS_PLUGINS);
});