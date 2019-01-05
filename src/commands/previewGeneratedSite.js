const { spawn } = require('child_process');

const convertDataForOutput = data =>
  data
    .toString()
    .replace('\n', '');

const previewGeneratedSite = () => {
  const preview = spawn('npm', ['start']);

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
