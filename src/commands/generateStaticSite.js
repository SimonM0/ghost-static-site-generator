import path from 'path';
import mkdirp from 'mkdirp';
import { argv } from 'yargs';
import { OPTIONS } from '../constants/OPTIONS';
import { previewGeneratedSite } from './previewGeneratedSite';
import { fetchUrlHelper } from '../helpers/fetchUrlHelper';
import { removeQueryStringsHelper } from '../helpers/removeQueryStringsHelper';
import { replaceUrlHelper } from '../helpers/replaceUrlHelper';

export const generateStaticSite = () => {
  const absoluteStaticPath = path.resolve(
    process.cwd(),
    OPTIONS.STATIC_DIRECTORY,
  );

  /**
   * Makes the static folder if it does not exist
   */
  mkdirp(
    OPTIONS.STATIC_DIRECTORY,
    (error) => {
      const urls = [
        `${OPTIONS.URL}/sitemap.xsl`,
        `${OPTIONS.URL}/sitemap.xml`,
      ];

      if (error) {
        console.error(error);
        return;
      }

      urls.forEach(fetchUrlHelper);

      /**
       * Remove all query strings from file names
       */
      removeQueryStringsHelper(absoluteStaticPath);

      if (argv.url) {
        /**
         * Replace url in links
         */
        replaceUrlHelper(
          absoluteStaticPath,
          /\.(html|xml|xsl|txt|js)/,
          argv.url,
        );
      }

      console.log(`Domain: ${OPTIONS.URL}`);
      console.log(`Static site generated at: ${absoluteStaticPath}`);

      if (argv.preview) {
        previewGeneratedSite();
      }
    },
  );
};
