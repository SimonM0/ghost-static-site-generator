const path = require('path');
const fs = require('fs');
const OPTIONS = require('../../constants/OPTIONS');
const crawlPageHelper = require('../crawlPageHelper');

/**
 * These are the image sizes that we want to generate
 * @type {string[]}
 */
const imageSizes = [
  'w100',
  'w300',
  'w600',
  'w1000',
  'w2000',
];

const getAllFileNames = (directory) => {
  const directoryContents = fs.readdirSync(directory);
  const files = directoryContents
    .reduce((images, file) => {
      const filePath = path.resolve(directory, file);
      const stats = fs.lstatSync(filePath);

      if (stats.isDirectory()) {
        if (file !== 'size') {
          getAllFileNames(filePath);
        }
        return images;
      }

      imageSizes.forEach((imageSize) => {
        const imageSizeUrl = filePath
          .replace('content/images/', `content/images/size/${imageSize}/`);
        images.push(imageSizeUrl);
      });

      return images;
    }, []);

  files.forEach((filePath) => {
    // Replace the directory with the url to call
    const url = filePath.replace(
      OPTIONS.ABSOLUTE_STATIC_DIRECTORY,
      OPTIONS.URL,
    );

    crawlPageHelper(url);
  });
};

/**
 * This helper generates all the responsive images that are missing as they
 * were not generated in the crawl
 */
const responsiveImagesHelper = () => {
  const contentPath = path.resolve(
    process.cwd(),
    `${OPTIONS.STATIC_DIRECTORY}/content`,
  );
  getAllFileNames(contentPath);
};

module.exports = responsiveImagesHelper;
