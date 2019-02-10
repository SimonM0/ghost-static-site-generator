const path = require('path');
const { argv } = require('yargs');
const { execSync } = require('child_process');

const DOMAIN = argv.domain || 'http://localhost:2368';
const URL = argv.url || 'http://localhost:2368';
const IGNORE_ABSOLUTE_PATHS = argv.ignoreAbsolutePaths || false;
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
  // This is the path of the static directory the your machine
  ABSOLUTE_STATIC_DIRECTORY: path.resolve(
    process.cwd(),
    `${STATIC_DIRECTORY}`,
  ),
  // This is the --dest flag
  STATIC_DIRECTORY,
  // This is the --domain flag without http:// or https://
  DOMAIN_WITHOUT_PROTOCOL: DOMAIN.replace(/^https?:\/\//i, ''),
  // This is the --domain flag
  DOMAIN,
  // This is the --url flag
  URL,
  // This is the --url flag without http:// or https://
  URL_WITHOUT_PROTOCOL: URL.replace(/^https?:\/\//i, ''),
  // The --silent flag determines if we should show the progress bar or not
  SHOW_PROGRESS_BAR: shouldShowProgress()
    ? '--show-progress '
    : '',
  // --ignore-absolute-paths flag will remove all urls
  IGNORE_ABSOLUTE_PATHS,
};

module.exports = OPTIONS;
