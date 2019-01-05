import path from 'path';
import mkdirp from 'mkdirp';
import { argv } from 'yargs';
import { execSync } from 'child_process';
import { replaceUrlHelper } from '../helpers/replaceUrlHelper';
import { OPTIONS } from '../constants/OPTIONS';
import { removeQueryStringsHelper } from '../helpers/removeQueryStringsHelper';
import { previewGeneratedSite } from './previewGeneratedSite';

const shouldShowProgress = () => {
  if (argv.silent) {
    return '';
  }

  const showProgressHelpText = execSync(
    'wget --help | grep "show-progress" || true',
  ).toString();

  return `${showProgressHelpText}`.includes('show-progress')
    ? '--show-progress '
    : '';
};

export const generateStaticSite = () => {
  const progressBar = shouldShowProgress();

  /**
   * Makes the static folder if it does not exist
   */
  mkdirp(
    OPTIONS.STATIC_DIRECTORY,
    (error) => {
      const urls = [
        OPTIONS.URL,
        `${OPTIONS.URL}/sitemap.xsl`,
        `${OPTIONS.URL}/sitemap.xml`,
        `${OPTIONS.URL}/sitemap-authors.xml`,
        `${OPTIONS.URL}/sitemap-pages.xml`,
        `${OPTIONS.URL}/sitemap-posts.xml`,
        `${OPTIONS.URL}/sitemap-tags.xml`,
      ];
      const absoluteStaticPath = path.resolve(
        process.cwd(),
        OPTIONS.STATIC_DIRECTORY,
      );

      if (error) {
        console.error(error);
        return;
      }

      urls.forEach(
        (url) => {
          try {
            console.log(`Fetching: ${url}`);
            execSync(
              `${'wget '
              + '-q '}${
                progressBar
              }--recursive `
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

          /**
           * Remove all query strings from file names
           */
          removeQueryStringsHelper(absoluteStaticPath);

          if (argv.url) {
            /**
             * Replace url in links
             */
            replaceUrlHelper(
              absoluteStaticPath,
              /\.(html|xml|xsl|txt|js)/,
              argv.url,
            );
          }
        },
      );

      console.log(`Domain: ${OPTIONS.URL}`);
      console.log(`Static site generated at: ${absoluteStaticPath}`);

      if (argv.preview) {
        previewGeneratedSite();
      }
    },
  );
};
