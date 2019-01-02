const fs = require('fs');
const path = require('path');

const removeQueryStringsHelper = (
  directory,
  match = /\?.*/,
  replace = '',
) => {
  const files = fs.readdirSync(directory);

  files.filter((file) => {
    const filePath = path.resolve(directory, file);
    const stats = fs.lstatSync(filePath);

    if (stats.isDirectory()) {
      removeQueryStringsHelper(filePath, match, replace);
      return false;
    }

    return file.match(match);
  }).forEach((file) => {
    const filePath = path.join(directory, file);
    const newFilePath = path.join(directory, file.replace(match, replace));

    fs.renameSync(filePath, newFilePath);
  });
};

module.exports = removeQueryStringsHelper;
