/**
 * Some users wanted to host under a sub directory. This will check the --subDir
 * flag and append to the url.
 *
 * @param {string} replaceUrl - url to replace with provided by the --url flag
 * @param {string} subDir - subDir to link to provided by the --subDir flag
 * @returns {string}
 */
const getSubDirectoryHelper = (replaceUrl, subDir = '') => {
  if (!subDir) {
    return replaceUrl;
  }

  if (typeof subDir !== 'string') {
    return replaceUrl;
  }

  return `${replaceUrl}/${subDir.replace(/^\/*/, '')}`;
};

module.exports = getSubDirectoryHelper;
