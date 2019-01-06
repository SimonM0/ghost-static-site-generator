const path = require('path');
const { spawn } = require('child_process');
const OPTIONS = require('../constants/OPTIONS');

const convertDataForOutput = data =>
  data
    .toString()
    .replace('\n', '');

const previewGeneratedSite = () => {
  const preview = spawn(
    path.resolve(`${__dirname}', '../../../node_modules/.bin/http-server`),
    [OPTIONS.STATIC_DIRECTORY, '-o'],
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
