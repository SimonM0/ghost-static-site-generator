const { spawn } = require('child_process');
const OPTIONS = require('../constants/OPTIONS');

const previewGeneratedSite = () => {
  const preview = spawn('http-server', [OPTIONS.STATIC_DIRECTORY, '-o']);

  preview.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
  });

  preview.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
  });

  preview.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
  });
};

module.exports = previewGeneratedSite;
