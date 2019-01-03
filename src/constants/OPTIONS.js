const { argv } = require('yargs');

const URL = argv.domain || 'http://localhost:2368';

const OPTIONS = {
  STATIC_DIRECTORY: argv.dest || 'static',
  DOMAIN: URL.replace(/^https?\:\/\//i, ''),
  URL,
};

module.exports = OPTIONS;
