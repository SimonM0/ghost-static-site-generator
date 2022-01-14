const path = require('path');
const fs = require('fs');
const OPTIONS = require('../../constants/OPTIONS');
const crawlPageAsyncHelper = require('../crawlPageAsyncHelper');

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
  return directoryContents
    .reduce((images, file) => {
      const filePath = path.resolve(directory, file);
      const stats = fs.lstatSync(filePath);

      if (stats.isDirectory()) {
        return [
          ...images,
          ...getAllFileNames(filePath),
        ];
      }

      images.push(filePath);
      imageSizes
        .forEach((imageSize) => {
          const imageSizeUrl = filePath
            .replace('content/images/', `content/images/size/${imageSize}/`);
          // Prevent recursive calling of size images that already exist
          if (
            /w[0-9]{3,5}.*w[0-9]{3,5}/g.test(imageSizeUrl)
          ) {
            return;
          }
          images.push(imageSizeUrl);
        });

      return images;
    }, []);
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
  const allFiles = getAllFileNames(contentPath);

  allFiles.forEach((filePath) => {
    const url = filePath.replace(
      OPTIONS.ABSOLUTE_STATIC_DIRECTORY,
      OPTIONS.SOURCE_DOMAIN,
    );

    crawlPageAsyncHelper(url);
  });
};

module.exports = responsiveImagesHelper;
