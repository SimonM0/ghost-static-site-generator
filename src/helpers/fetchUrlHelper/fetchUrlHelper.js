const { parseString } = require('xml2js');
const fs = require('fs');
const path = require('path');
const get = require('lodash/get');
const crawlPageHelper = require('../crawlPageHelper');
const OPTIONS = require('../../constants/OPTIONS');

const getUrlLinks = (result, path) => {
  const sitemaps = get(result, path, []);
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

  if (`${url}`.includes('.xml')) {
    const filePath = path.resolve(
      process.cwd(),
      `${OPTIONS.STATIC_DIRECTORY}${url.replace(OPTIONS.DOMAIN, '')}`,
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
  }
};

module.exports = fetchUrlHelper;
