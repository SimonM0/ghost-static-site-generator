import { execSync } from 'child_process';
import { OPTIONS } from '../../constants/OPTIONS';

/**
 * A small description explaining where this function is used and why
 */
export const crawlPageHelper = (url) => {
  try {
    console.log(`Fetching: ${url}`);
    execSync(
      `${'wget -q '}${OPTIONS.SHOW_PROGRESS_BAR}--recursive `
      + '--page-requisites '
      + '--no-parent '
      + '--no-host-directories '
      + '--restrict-file-name=unix '
      + '--trust-server-names '
      + `--directory-prefix ${OPTIONS.STATIC_DIRECTORY} `
      + `${url}`,
      { stdio: 'inherit' },
    );
  } catch (execSyncError) {
    console.log(`ERROR: ${execSyncError.stdout}`);
  }
};
