const OPTIONS = require('../../constants/OPTIONS');

/**
 * This function is used to convert domains to . to make them relative for src
 * files only
 *
 * @param {string} output - the string output of a file to convert urls in
 * @param {string} urlToReplace - this is the url to replace with
 * @returns {string} the file with converted paths
 */
const convertDomainToRelativeHelper = (
  output,
  urlToReplace = OPTIONS.URL,
) =>
  output.replace(
    new RegExp(`(src=")${urlToReplace}`, 'g'),
    '$1.',
  );

module.exports = convertDomainToRelativeHelper;
