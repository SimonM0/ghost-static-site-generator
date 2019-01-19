const path = require('path');
const fs = require('fs');
const { argv } = require('yargs');
const { compose } = require('lodash/fp');
const OPTIONS = require('../../constants/OPTIONS');
const replaceUrlWithSubDirPathHelper = require('../replaceUrlWithSubDirPathHelper');
const convertDomainToRelativeHelper = require('../convertDomainToRelativeHelper');

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
  // Some users may want to host files under a sub directory
  const { subDir } = argv;
  // const urlWithSubDir = getSubDirectoryHelper(replaceUrl, subDir);
  const filePath = path.join(directory, file);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const output = compose(
    convertDomainToRelativeHelper,
    replaceUrlWithSubDirPathHelper,
  )(
    fileContents,
    subDir,
    filePath,
  );

  // output = output.replace(
  //   new RegExp(/\/ .*\.map/, 'g'),
  //   '',
  // );

  fs.writeFileSync(filePath, output);
  console.log(`${OPTIONS.URL} => ${replaceUrl}: ${filePath}`);
};

module.exports = replaceDomainNameHelper;
