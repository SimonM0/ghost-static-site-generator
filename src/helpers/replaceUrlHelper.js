const fs = require('fs');
const path = require('path');
const { argv } = require('yargs');
const OPTIONS = require('../constants/OPTIONS');

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
      replaceUrlHelper(filePath);
      return false;
    }
    return file.match(match);
  }).forEach((file) => {
    const filePath = path.join(directory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const output = fileContents.replace(
      new RegExp( OPTIONS.DOMAIN, 'g'),
      replaceUrl
    );

    fs.writeFileSync(filePath, output);
    console.log(`${OPTIONS.DOMAIN} => ${argv.url}: ${filePath}`);
  });
};

module.exports = replaceUrlHelper;
