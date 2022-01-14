const { argv } = require('yargs');
const OPTIONS = require('../../constants/OPTIONS');

/**
 * This function replaces all the urls with the replacement url specified with
 * the --url flag
 */
const replaceDomainWithUrlHelper = (
  output,
  domain = OPTIONS.SOURCE_DOMAIN,
  url = OPTIONS.PRODUCTION_DOMAIN,
) => {
  // Some users may want to host files under a sub directory
  const { subDir } = argv;
  return `${output}`.replace(
    new RegExp(domain, 'g'),
    subDir ? `${url}/${subDir}` : url,
  );
};

module.exports = replaceDomainWithUrlHelper;
