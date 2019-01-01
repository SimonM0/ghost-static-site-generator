const { argv } = require('yargs');

const OPTIONS = {
  STATIC_DIRECTORY: argv.dest || 'static',
  DOMAIN: argv.domain || 'http://localhost:2368',
};

module.exports = OPTIONS;
