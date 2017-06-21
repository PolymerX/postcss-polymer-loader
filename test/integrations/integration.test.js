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

const CWD_ERROR_PATH = join(CWD, 'src-error-path');
const ENTRY_ERROR_PATH = join(CWD_ERROR_PATH, 'index.js');
const TMP_DIR_ERROR_PATH = join(CWD_ERROR_PATH, 'dist-test-error-path');
const TMP_APPJS_ERROR_PATH = join(TMP_DIR_ERROR_PATH, 'app.js');


const CWD_BAD_HTML = join(CWD, 'src-bad-html');
const ENTRY_BAD_HTML = join(CWD_BAD_HTML, 'index.js');
const TMP_DIR_BAD_HTML = join(CWD_BAD_HTML, 'dist-test-bad-html');
const TMP_APPJS_BAD_HTML = join(TMP_DIR_BAD_HTML, 'app.js');

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

test('cb with error when style.postcss is not found', async t => {
  await t.throws(execa('webpack', [ENTRY_ERROR_PATH, TMP_APPJS_ERROR_PATH], {cwd: CWD_ERROR_PATH}));
  const appJs = await readFile(TMP_APPJS_ERROR_PATH, 'utf8');
  t.false(appJs.includes('<style>'), 'No compilation without <postcss> tags');
});

test('bad html, handling removing bad <postcss> tag return source', async t => {
  await execa('webpack', [ENTRY_BAD_HTML, TMP_APPJS_BAD_HTML], {cwd: CWD_BAD_HTML});
  const appJs = await readFile(TMP_APPJS_BAD_HTML, 'utf8');
  t.false(appJs.includes('<postcss'), 'Removed <postcss> tags');
});

test.after(async t => {
  await remove(TMP_DIR);
  await remove(TMP_DIR_NO_POSTCSS);
  await remove(TMP_DIR_POSTCSS_PLUGINS);
  await remove(TMP_DIR_ERROR_PATH);
  await remove(TMP_DIR_BAD_HTML);
});