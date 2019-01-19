const OPTIONS = require('../../constants/OPTIONS');

/**
 * This function replaces all the urls with the replacement url specified with
 * the --url flag
 */
const replaceDomainWithUrlHelper = (
  output,
  domain = OPTIONS.DOMAIN,
  url = OPTIONS.URL,
) => `${output}`.replace(
  new RegExp(domain, 'g'),
  url,
);

module.exports = replaceDomainWithUrlHelper;
