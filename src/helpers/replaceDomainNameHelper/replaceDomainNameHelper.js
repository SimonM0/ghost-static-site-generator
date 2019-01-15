const path = require('path');
const fs = require('fs');
const { argv } = require('yargs');
const OPTIONS = require('../../constants/OPTIONS');
const getSubDirectoryHelper = require('../getSubDirectoryHelper');
const replaceUrlWithSubDirPathHelper = require('../replaceUrlWithSubDirPathHelper');

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
  const urlWithSubDir = getSubDirectoryHelper(replaceUrl, subDir);
  const filePath = path.join(directory, file);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  let output = `${fileContents}`.replace(
    new RegExp(OPTIONS.URL, 'g'),
    urlWithSubDir,
  );

  // Replace any localhost domains without protocol with the the domain
  // i.e '//localhost:2365'
  if (urlWithSubDir !== '') {
    output = output.replace(
      new RegExp(OPTIONS.DOMAIN, 'g'),
      `${urlWithSubDir}`.replace(/^https?\:\/\//i, ''),
    );
  }

  output = replaceUrlWithSubDirPathHelper(
    output,
    urlWithSubDir,
    subDir,
  );

  fs.writeFileSync(filePath, output);
  console.log(`${OPTIONS.URL} => ${replaceUrl}: ${filePath}`);
};

module.exports = replaceDomainNameHelper;
