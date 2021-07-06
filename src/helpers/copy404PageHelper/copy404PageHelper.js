const fs = require('fs');
const path = require('path');
const OPTIONS = require('../../constants/OPTIONS');

const copy404PageHelper = () => {
  const filePath = path.resolve(
    process.cwd(),
    `${OPTIONS.STATIC_DIRECTORY}/404/index.html`,
  );
  const newPath = path.resolve(
    process.cwd(),
    `${OPTIONS.STATIC_DIRECTORY}/404.html`,
  );
  fs.copyFileSync(filePath, newPath);
};

module.exports = copy404PageHelper;
