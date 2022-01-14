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
  subDir,
  filePath = `/${OPTIONS.STATIC_DIRECTORY}`,
) => (
  output,
  urlToReplace = OPTIONS.SOURCE_DOMAIN,
) => {
  // TODO: detect folder
  if (!subDir) {
    return output;
  }

  const urlWithoutProtocol = urlToReplace.replace(/^https?:/i, '');
  const pathMap = filePath
    .split(`/${OPTIONS.STATIC_DIRECTORY}`)
    .pop()
    .split(/\//g);
  pathMap.pop();
  const numberOfLevels = pathMap.filter((item) => !!item)
    .length + 1;
  /**
   * This part of the code is used to determine how many levels
   * deep the asset of link is so we can append links with ./ or
   * ./../
   */
  const relativePathPrefix = new Array(numberOfLevels)
    .fill('../')
    .join('')
    .substring(1);

  return output.replace(
    new RegExp(`(src=")(${urlToReplace}|${urlWithoutProtocol})/?`, 'g'),
    `$1${relativePathPrefix}`,
  );
};

module.exports = convertDomainToRelativeHelper;
