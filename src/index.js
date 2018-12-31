#!/usr/bin/env node
const removeQueryStrings = require('./removeQueryStrings');
const wget = require('node-wget');
const path = require('path');
const mkdirp = require('mkdirp');
const { exec } = require('child_process');

const STATIC_DIRECTORY = './static';
const URL = 'http://localhost:2368';

mkdirp(STATIC_DIRECTORY, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`Directory Created`);

    exec(
      'wget ' +
      '--recursive ' +
      '--page-requisites ' +
      '--no-parent ' +
      '--no-host-directories ' +
      '--restrict-file-name=unix ' +
      '--trust-server-names ' +
      `--directory-prefix ${STATIC_DIRECTORY} ` +
      `${URL}`,
      () => {
        removeQueryStrings(path.resolve(process.cwd(), STATIC_DIRECTORY))
      }
    );
  }
});
