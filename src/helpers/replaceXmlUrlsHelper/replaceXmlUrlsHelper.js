const OPTIONS = require('../../constants/OPTIONS');

/**
 * A small description explaining where this function is used and why
 */
const replaceXmlUrlsHelper = file => (output) => {
  if (`${file}`.includes('.xml')) {
    return `${output}`.replace(
      new RegExp(OPTIONS.DOMAIN_WITHOUT_PROTOCOL, 'g'),
      OPTIONS.URL_WITHOUT_PROTOCOL,
    );
  }
  return output;
};

module.exports = replaceXmlUrlsHelper;
