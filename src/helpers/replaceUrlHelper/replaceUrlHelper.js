const fs = require('fs');
const path = require('path');
const replaceDomainNameHelper = require('../replaceDomainNameHelper');

/**
 * This helper finds all instances of OPTIONS.SOURCE_DOMAIN and replaces it with the
 * url provided by the `url` flag. It will replace `http://`, `https://` and
 * `//`
 *
 * @param {string} directory - This is the directory to scan
 * @param {string} match - These are the file extensions to match
 * @param {string} replaceUrl - This is the url to replace with
 */
const replaceUrlHelper = (
  directory = '',
  match = /\.html/,
  replaceUrl = '',
) => {
  const files = fs.readdirSync(directory);

  files.filter((file) => {
    const filePath = path.resolve(directory, file);
    const stats = fs.lstatSync(filePath);

    if (stats.isDirectory()) {
      replaceUrlHelper(filePath, match, replaceUrl);
      return false;
    }

    return file.match(match);
  }).forEach(
    replaceDomainNameHelper(
      directory,
      replaceUrl,
    ),
  );
};

module.exports = replaceUrlHelper;
