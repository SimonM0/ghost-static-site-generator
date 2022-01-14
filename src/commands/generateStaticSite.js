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

const generateStaticSite = async () => {
  const absoluteStaticPath = path.resolve(
    process.cwd(),
    OPTIONS.STATIC_DIRECTORY,
  );

  try {
    /**
     * Makes the static folder if it does not exist
     */
    await mkdirp(`${OPTIONS.STATIC_DIRECTORY}/content`);

    const urls = [
      `${OPTIONS.SOURCE_DOMAIN}/`,
      `${OPTIONS.SOURCE_DOMAIN}/sitemap.xsl`,
      `${OPTIONS.SOURCE_DOMAIN}/sitemap.xml`,
      `${OPTIONS.SOURCE_DOMAIN}/404`,
      `${OPTIONS.SOURCE_DOMAIN}/public/ghost.css`,
      `${OPTIONS.SOURCE_DOMAIN}/public/ghost.min.css`,
      `${OPTIONS.SOURCE_DOMAIN}/public/404-ghost.png`,
      `${OPTIONS.SOURCE_DOMAIN}/public/404-ghost@2x.png`,
    ];

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

    console.log(`Domain: ${OPTIONS.SOURCE_DOMAIN}`);
    console.log(`Static site generated at: ${absoluteStaticPath}`);
    console.timeEnd('Site generated in');

    if (argv.preview) {
      previewGeneratedSite(absoluteStaticPath);
    }
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

module.exports = generateStaticSite;
