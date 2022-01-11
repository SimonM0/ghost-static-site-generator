const path = require('path');
const mkdirp = require('mkdirp');
const { argv } = require('yargs');
const previewGeneratedSite = require('./previewGeneratedSite');
const fetchUrlHelper = require('../helpers/fetchUrlHelper');
const copy404PageHelper = require('../helpers/copy404PageHelper');
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
        `${OPTIONS.DOMAIN}/`,
        `${OPTIONS.DOMAIN}/sitemap.xsl`,
        `${OPTIONS.DOMAIN}/sitemap.xml`,
        `${OPTIONS.DOMAIN}/404`,
        `${OPTIONS.DOMAIN}/public/ghost.css`,
        `${OPTIONS.DOMAIN}/public/ghost.min.css`,
        `${OPTIONS.DOMAIN}/public/404-ghost.png`,
        `${OPTIONS.DOMAIN}/public/404-ghost@2x.png`,
      ];

      if (error) {
        console.error(error);
        return;
      }

      urls.forEach(fetchUrlHelper);

      /**
       * Copy the 404 page to 404.html
       */
      copy404PageHelper();

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

      console.log(`Domain: ${OPTIONS.DOMAIN}`);
      console.log(`Static site generated at: ${absoluteStaticPath}`);
      console.timeEnd('Site generated in');


      if (argv.preview) {
        previewGeneratedSite(absoluteStaticPath);
      }
    },
  );
};

module.exports = generateStaticSite;
