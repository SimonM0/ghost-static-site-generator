const path = require('path');
const mkdirp = require('mkdirp');
const { argv } = require('yargs');
const previewGeneratedSite = require('./previewGeneratedSite');
const fetchUrlHelper = require('../helpers/fetchUrlHelper');
const removeQueryStringsHelper = require('../helpers/removeQueryStringsHelper');
const replaceUrlHelper = require('../helpers/replaceUrlHelper');
const OPTIONS = require('../constants/OPTIONS');

const generateStaticSite = () => {
  const absoluteStaticPath = path.resolve(
    process.cwd(),
    OPTIONS.STATIC_DIRECTORY,
  );

  /**
   * Makes the static folder if it does not exist
   */
  mkdirp(
    OPTIONS.STATIC_DIRECTORY,
    (error) => {
      const urls = [
        `${OPTIONS.URL}/sitemap.xsl`,
        `${OPTIONS.URL}/sitemap.xml`,
      ];

      if (error) {
        console.error(error);
        return;
      }

      urls.forEach(fetchUrlHelper);

      /**
       * Remove all query strings = file names
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

      console.log(`Domain: ${OPTIONS.URL}`);
      console.log(`Static site generated at: ${absoluteStaticPath}`);

      if (argv.preview) {
        previewGeneratedSite();
      }
    },
  );
};

module.exports = generateStaticSite;
