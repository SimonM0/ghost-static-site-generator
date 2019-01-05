const { argv } = require('yargs');
const { execSync } = require('child_process');

const URL = argv.domain || 'http://localhost:2368';

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
  STATIC_DIRECTORY: argv.dest || 'static',
  DOMAIN: URL.replace(/^https?:\/\//i, ''),
  URL,
  SHOW_PROGRESS_BAR: shouldShowProgress()
    ? '--show-progress '
    : '',
};

module.exports = OPTIONS;
