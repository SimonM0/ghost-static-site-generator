const { execSync } = require('child_process');
const { argv } = require('yargs');
const OPTIONS = require('../../constants/OPTIONS');

const contentOnError = () => {
  const contentOnErrorHelpText = execSync(
    'wget --help | grep "content-on-error" || true',
  ).toString();

  return `${contentOnErrorHelpText}`
    .includes('content-on-error')
    ? '--content-on-error '
    : '';
};

const saveAsReferer = () => {
  if (OPTIONS.SAVE_AS_REFERER) {
    return '';
  }
  return '--trust-server-names ';
};

const crawlPageHelper = (url) => {
  const wgetCommand = `wget -q ${OPTIONS.SHOW_PROGRESS_BAR}--recursive `
    + '--timestamping '
    + '--page-requisites '
    + '--no-parent '
    + '--no-host-directories '
    + '--restrict-file-name=unix '
    + `--directory-prefix ${OPTIONS.STATIC_DIRECTORY} ${contentOnError()} `
    + `${saveAsReferer()}`
    + `${url}`;

  try {
    console.log(`Fetching: ${url}`);
    execSync(
      wgetCommand,
      { stdio: 'inherit' },
    );
  } catch (execSyncError) {
    console.log(`ERROR: ${execSyncError.stdout}`);
    console.log(`Using Command: ${wgetCommand}`);

    if (argv.failOnError) {
      process.exit(1);
    }
  }
};

module.exports = crawlPageHelper;
