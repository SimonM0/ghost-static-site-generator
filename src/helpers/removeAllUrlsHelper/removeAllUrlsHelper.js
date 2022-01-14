const OPTIONS = require('../../constants/OPTIONS');

/**
 * This helpers removes all urls from the site
 */
const removeAllUrlsHelper = (output) => {
  if (OPTIONS.IGNORE_ABSOLUTE_PATHS) {
    return output.replace(
      new RegExp(OPTIONS.PRODUCTION_DOMAIN, 'g'),
      '',
    );
  }

  return output;
};

module.exports = removeAllUrlsHelper;
