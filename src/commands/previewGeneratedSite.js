import { spawn } from 'child_process';
import OPTIONS from '../constants/OPTIONS';

const convertDataForOutput = data =>
  data
    .toString()
    .replace('\n', '');

export const previewGeneratedSite = () => {
  const preview = spawn('http-server', [OPTIONS.STATIC_DIRECTORY, '-o']);

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
