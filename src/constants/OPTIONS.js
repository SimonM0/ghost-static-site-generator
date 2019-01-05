import { argv } from 'yargs';

const URL = argv.domain || 'http://localhost:2368';

export const OPTIONS = {
  STATIC_DIRECTORY: argv.dest || 'static',
  DOMAIN: URL.replace(/^https?:\/\//i, ''),
  URL,
};
