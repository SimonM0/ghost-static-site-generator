const OPTIONS = require('../../constants/OPTIONS');

const replacementMatches = [
  /**
   * Replaces `url(/mypic.jpg)` with `url(<relativePath>/mypic.jpg)`
   */
  /(url\()(\/[^/])/,
  /**
   * Replaces `src="/mypic.jpg"` with `src="<relativePath>/mypic.jpg"`
   * and `srcset="/mypic.jpg"` with `srcset="<relativePath>/mypic.jpg"`
   */
  /(srcs?e?t?=")(\/[^/])/,
  /**
   * Replaces `href="/styles.css"` with `href="<relativePath>/styles.css"`
   */
  /(href=")(\/[^/])/,
  /**
   * Replaces `w,   /myimage.jpg` with `w,   <relativePath>/myimage.jpg"`
   */
  /(w,\s*)(\/[^/])/,
];

/**
 * This function replaces all absolute path urls with the url and
 * static directory
 */
const replaceUrlWithSubDirPathHelper = (
  output = '',
  subDir = '',
  filePath = `/${OPTIONS.STATIC_DIRECTORY}`,
) => {
  if (!subDir) {
    return output;
  }
  const pathMap = filePath
    .split(`/${OPTIONS.STATIC_DIRECTORY}`)
    .pop()
    .split(/\//g);
  pathMap.pop();
  const numberOfLevels = pathMap.filter((item) => !!item)
    .length + 1;
  return replacementMatches
    .reduce(
      (sanitizedOutput, replacementMatch) => sanitizedOutput.replace(
        new RegExp(replacementMatch, 'g'),
        (match, matchGroup1, matchGroup2) => {
          /**
             * This part of the code is used to determine how many levels
             * deep the asset of link is so we can append links with ./ or
             * ./../
             */
          let relativePathPrefix = new Array(numberOfLevels)
            .fill('../')
            .join('')
            .substring(1);

          /**
             * If the asset is on root path, then just append a . to make it
             * relative
             */
          if (relativePathPrefix === './') {
            relativePathPrefix = '.';
          }

          const relativePath = `${matchGroup1}${
            relativePathPrefix}${matchGroup2}`;

          /**
             * Remove any anomalies from
             * absolute paths e.e /mySubDir => ./ + /mySubDir = .//mySubDir.
             * Since this function only deals with relative urls we do not
             * have to account for protocols
             */
          return relativePath.replace('//', '/');
        },
      ),
      output,
    );
};

module.exports = replaceUrlWithSubDirPathHelper;
