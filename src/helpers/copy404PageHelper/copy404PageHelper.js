const fs = require('fs');
const path = require('path');
const OPTIONS = require('../../constants/OPTIONS');

const copy404PageHelper = () => {
  try {
    const filePath = path.resolve(
      process.cwd(),
      `${OPTIONS.STATIC_DIRECTORY}/404/index.html`,
    );
    const newPath = path.resolve(
      process.cwd(),
      `${OPTIONS.STATIC_DIRECTORY}/404.html`,
    );
    fs.copyFileSync(filePath, newPath);
  } catch (error) {
    console.error(error);
  }
};

module.exports = copy404PageHelper;
