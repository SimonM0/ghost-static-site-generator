import { parseString } from 'xml2js';
import fs from 'fs';
import path from 'path';
import get from 'lodash/get';
import { crawlPageHelper } from '../crawlPageHelper';
import { OPTIONS } from '../../constants/OPTIONS';

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

/**
 * A small description explaining where this function is used and why
 */
export const fetchUrlHelper = (url) => {
  crawlPageHelper(url);

  if (`${url}`.includes('.xml')) {
    const filePath = path.resolve(
      process.cwd(),
      `${OPTIONS.STATIC_DIRECTORY}${url.replace(OPTIONS.URL, '')}`,
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    parseString(fileContents, (err, result) => {
      const sitemaps = getUrlLinks(result, 'sitemapindex.sitemap');
      const urlsets = getUrlLinks(result, 'urlset.url');
      console.log('uncrawledUrls', sitemaps, urlsets);
      [
        ...sitemaps,
        ...urlsets,
      ].forEach(fetchUrlHelper);
    });
  }
};
