const { parseString } = require('xml2js');
const fs = require('fs');
const path = require('path');
const get = require('lodash/get');
const crawlPageHelper = require('../crawlPageHelper');
const OPTIONS = require('../../constants/OPTIONS');

const getUrlLinks = (result, linkPath) => {
  const sitemaps = get(result, linkPath, []);
  return sitemaps.reduce((accumulator, page) => {
    const uncrawledUrl = get(page, 'loc[0]', '');

    if (uncrawledUrl) {
      return [
        ...accumulator,
        uncrawledUrl,
      ];
    }

    return accumulator;
  }, []);
};

const fetchUrlHelper = (url) => {
  crawlPageHelper(url);

  if (url.includes('.js')) {
    /**
     * TODO: Read this from the js files  instead
     */
    crawlPageHelper(url.replace('.js', '.map.js'));
    crawlPageHelper(url.replace('.js', '.js.map'));
  }

  if (`${url}`.includes('.xml')) {
    const domainRegExp = new RegExp(`(${
      OPTIONS.DOMAIN.replace('https://', 'http://')}|${
      OPTIONS.DOMAIN.replace('http://', 'https://')
    })`, 'gi');
    const fileName = `${OPTIONS.STATIC_DIRECTORY}${url.replace(domainRegExp, '')}`;

    try {
      const filePath = path.resolve(
        process.cwd(),
        fileName,
      );
      const fileContents = fs.readFileSync(filePath, 'utf8');

      parseString(fileContents, (err, result) => {
        const sitemaps = getUrlLinks(result, 'sitemapindex.sitemap');
        const urlsets = getUrlLinks(result, 'urlset.url');

        [
          ...sitemaps,
          ...urlsets,
        ].forEach(fetchUrlHelper);
      });
    } catch (error) {
      console.error(fileName, url, error);
    }
  }
};

module.exports = fetchUrlHelper;
