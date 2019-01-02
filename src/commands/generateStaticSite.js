const wget = require('node-wget');
const path = require('path');
const mkdirp = require('mkdirp');
const { execSync } = require('child_process');
const { argv } = require('yargs');
const OPTIONS = require('../constants/OPTIONS');
const replaceUrlHelper = require('../helpers/replaceUrlHelper');
const removeQueryStringsHelper = require('../helpers/removeQueryStringsHelper');
const previewGeneratedSite = require('../commands/previewGeneratedSite');

const shouldShowProgress = () => {
  if (argv.silent) {
    return '';
  }

  const showProgressHelpText = execSync(
    'wget --help | grep "show-progress" || true',
  ).toString();

  return `${showProgressHelpText}`.includes('show-progress') ?
    '--show-progress ' :
    '';
};

const generateStaticSite = () => {
  const progressBar = shouldShowProgress();

  /**
   * Makes the static folder if it does not exist
   */
  mkdirp(
    OPTIONS.STATIC_DIRECTORY,
    error => {
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
        url => {
          try {
            console.log(`Fetching: ${url}`);
            execSync(
              'wget ' +
              '-q ' +
              progressBar +
              '--recursive ' +
              '--page-requisites ' +
              '--no-parent ' +
              '--no-host-directories ' +
              '--restrict-file-name=unix ' +
              '--trust-server-names ' +
              `--directory-prefix ${OPTIONS.STATIC_DIRECTORY} ` +
              `${url}`,
              { stdio: 'inherit' },
            );
          } catch (error) {
            console.log(`ERROR: ${error.stdout}`);
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
              /\.(html|xml|xsl)/,
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

module.exports = generateStaticSite;
