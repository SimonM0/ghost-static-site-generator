const wget = require('node-wget');
const path = require('path');
const mkdirp = require('mkdirp');
const { exec } = require('child_process');
const { argv } = require('yargs');
const OPTIONS = require('../constants/OPTIONS');
const removeQueryStringsHelper = require('../helpers/removeQueryStringsHelper');
const previewGeneratedSite = require('../commands/previewGeneratedSite');

const generateStaticSite = () => {

  /**
   * Makes the static folder if it does not exist
   */
  mkdirp(
    OPTIONS.STATIC_DIRECTORY,
    error => {
      const urls = [
        OPTIONS.DOMAIN,
        `${OPTIONS.DOMAIN}/sitemap.xml`,
        `${OPTIONS.DOMAIN}/sitemap-authors.xml`,
        `${OPTIONS.DOMAIN}/sitemap-pages.xml`,
        `${OPTIONS.DOMAIN}/sitemap-posts.xml`,
        `${OPTIONS.DOMAIN}/sitemap-tags.xml`,
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
        url => exec(
          'wget ' +
          '--recursive ' +
          '--page-requisites ' +
          '--no-parent ' +
          '--no-host-directories ' +
          '--restrict-file-name=unix ' +
          '--trust-server-names ' +
          `--directory-prefix ${OPTIONS.STATIC_DIRECTORY} ` +
          `${url}`,
          () => {
            /**
             * Remove all query strings from file names
             */
            removeQueryStringsHelper(absoluteStaticPath);
          },
        ),
      );

      console.log(`Domain: ${OPTIONS.DOMAIN}`);
      console.log(`Static site generated at: ${absoluteStaticPath}`);


      if (argv.preview) {
        previewGeneratedSite();
      }
    },
  );
};

module.exports = generateStaticSite;
