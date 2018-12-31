const fs = require('fs');
const path = require('path');

const removeQueryStrings = (
  dir,
  match = /\?.*/,
  replace = '',
) => {
  const files = fs.readdirSync(dir);

  files.filter((file) => {
    const filePath = path.resolve(dir, file);
    const stats = fs.lstatSync(filePath);

    if (stats.isDirectory()) {
      removeQueryStrings(filePath);
      return false;
    }
    return file.match(match);
  }).forEach((file) => {
    const filePath = path.join(dir, file);
    const newFilePath = path.join(dir, file.replace(match, replace));

    fs.renameSync(filePath, newFilePath);
  });
};

module.exports = removeQueryStrings;
