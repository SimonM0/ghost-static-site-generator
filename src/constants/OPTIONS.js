const path = require('path');
const { argv } = require('yargs');
const { execSync } = require('child_process');

const URL = argv.domain || 'http://localhost:2368';
const STATIC_DIRECTORY = argv.dest || 'static';

const shouldShowProgress = () => {
  if (argv.silent) {
    return '';
  }

  const showProgressHelpText = execSync(
    'wget --help | grep "show-progress" || true',
  ).toString();

  return `${showProgressHelpText}`.includes('show-progress');
};

const OPTIONS = {
  ABSOLUTE_STATIC_DIRECTORY: path.resolve(
    process.cwd(),
    `${STATIC_DIRECTORY}`,
  ),
  STATIC_DIRECTORY,
  DOMAIN: URL.replace(/^https?:\/\//i, ''),
  URL,
  SHOW_PROGRESS_BAR: shouldShowProgress()
    ? '--show-progress '
    : '',
};

module.exports = OPTIONS;
