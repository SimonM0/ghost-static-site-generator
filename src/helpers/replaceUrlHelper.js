const fs = require('fs');
const path = require('path');
const OPTIONS = require('../constants/OPTIONS');

/**
 * This helper finds all instances of OPTIONS.URL and replaces it with the
 * url provided by the `url` flag. It will replace `http://`, `https://` and
 * `//`
 *
 * @param {string} directory - This is the directory to scan
 * @param {string} match - These are the file extensions to match
 * @param {string} replaceUrl - This is the url to replace with
 */
const replaceUrlHelper = (
  directory,
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
  }).forEach((file) => {
    const filePath = path.join(directory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    let output = fileContents.replace(
      new RegExp(OPTIONS.URL, 'g'),
      replaceUrl,
    );

    // Replace any localhost domains without protocol with the the domain
    // i.e '//localhost:2365'
    if (replaceUrl !== '') {
      output = output.replace(
        new RegExp(OPTIONS.DOMAIN, 'g'),
        replaceUrl.replace(/^https?\:\/\//i, '')
      )
    }

    fs.writeFileSync(filePath, output);
    console.log(`${OPTIONS.URL} => ${replaceUrl}: ${filePath}`);
  });
};

module.exports = replaceUrlHelper;
