const fs = require('fs');
const path = require('path');
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
      replaceUrlHelper(filePath, match, replaceUrl);
      return false;
    }

    return file.match(match);
  }).forEach((file) => {
    const filePath = path.join(directory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const output = fileContents.replace(
      new RegExp(OPTIONS.URL, 'g'),
      replaceUrl,
    );

    fs.writeFileSync(filePath, output);
    console.log(`${OPTIONS.URL} => ${replaceUrl}: ${filePath}`);
  });
};

module.exports = replaceUrlHelper;
