const path = require('path');
const fs = require('fs');
const OPTIONS = require('../../constants/OPTIONS');

/**
 * This function replaces url and domain names
 *
 * @param {string} directory - directory where the static site is located
 * @param {string} replaceUrl - url to replace with
 * @returns {function(*=)} - returns a function that accepts a file name
 */
const replaceDomainNameHelper = (
  directory,
  replaceUrl,
) => (file) => {
  const filePath = path.join(directory, file);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  let output = `${fileContents}`.replace(
    new RegExp(OPTIONS.URL, 'g'),
    replaceUrl,
  );

  // Replace any localhost domains without protocol with the the domain
  // i.e '//localhost:2365'
  if (replaceUrl !== '') {
    output = output.replace(
      new RegExp(OPTIONS.DOMAIN, 'g'),
      `${replaceUrl}`.replace(/^https?\:\/\//i, ''),
    );
  }

  fs.writeFileSync(filePath, output);
  console.log(`${OPTIONS.URL} => ${replaceUrl}: ${filePath}`);
};

module.exports = replaceDomainNameHelper;
