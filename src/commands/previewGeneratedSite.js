const path = require('path');
const { spawn } = require('child_process');
const { argv } = require('yargs');
const OPTIONS = require('../constants/OPTIONS');
const replaceUrlHelper = require('../helpers/replaceUrlHelper');

const convertDataForOutput = (data) => data
  .toString()
  .replace('\n', '');

const previewGeneratedSite = (absoluteStaticPath) => {
  /**
   * Replace url in links for previewing
   */
  replaceUrlHelper(
    absoluteStaticPath,
    /\.(html|xml|xsl|txt|js)/,
    'http://localhost:8080',
  );

  const preview = spawn(
    path.resolve(`${__dirname}', '../../../node_modules/.bin/http-server`),
    [
      // Serve cwd when making subDir so the user can see the subDir
      argv.subDir
        ? './'
        : OPTIONS.STATIC_DIRECTORY,
      // Open in browser
      '-o',
      // No Cache
      '-c-1',
    ],
  );

  preview.stdout.on('data', (data) => {
    console.log(convertDataForOutput(data));
  });

  preview.stderr.on('data', (data) => {
    console.log(convertDataForOutput(data));
  });

  preview.on('exit', (data) => {
    console.log(`child process exited with code ${convertDataForOutput(data)}`);
  });
};

module.exports = previewGeneratedSite;
