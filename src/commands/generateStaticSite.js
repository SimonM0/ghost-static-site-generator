const path = require('path');
const mkdirp = require('mkdirp');
const { argv } = require('yargs');
const previewGeneratedSite = require('./previewGeneratedSite');
const fetchUrlHelper = require('../helpers/fetchUrlHelper');
const removeQueryStringsHelper = require('../helpers/removeQueryStringsHelper');
const responsiveImagesHelper = require('../helpers/responsiveImagesHelper/responsiveImagesHelper');
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
    `${OPTIONS.STATIC_DIRECTORY}/content`,
    (error) => {
      const urls = [
        `${OPTIONS.URL}/sitemap.xsl`,
        `${OPTIONS.URL}/sitemap.xml`,
        `${OPTIONS.URL}/404`,
      ];

      if (error) {
        console.error(error);
        return;
      }

      urls.forEach(fetchUrlHelper);

      /**
       * Generate all missing responsive images
       */
      responsiveImagesHelper();

      /**
       * Remove all query strings = file names
       */
      removeQueryStringsHelper(absoluteStaticPath);

      // Replace urls if not in preview mode, otherwise use preview url
      if (argv.url && !argv.preview) {
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
      console.timeEnd('Site generated in');


      if (argv.preview) {
        previewGeneratedSite(absoluteStaticPath);
      }
    },
  );
};

module.exports = generateStaticSite;
