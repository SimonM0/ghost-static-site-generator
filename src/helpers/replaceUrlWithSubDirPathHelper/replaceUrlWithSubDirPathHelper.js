const replacementMatches = [
  // Replaces `url(/mypic.jpg)` with `url(<Website Url>/mypic.jpg)`
  /(url\()(\/[^\/])/,
  // Replaces `src="/mypic.jpg"` with `src="<Website Url>/mypic.jpg"`
  // and `srcset="/mypic.jpg"` with `srcset="<Website Url>/mypic.jpg"`
  /(srcs?e?t?=")(\/[^\/])/,
  // Replaces `href="/styles.css"` with `href="<Website Url>/styles.css"`
  /(href=")(\/[^\/])/,
  // Replaces `w,   /myimage.jpg` with `w,   <Website Url>/myimage.jpg"`
  /(,\s*)(\/[^\/])/
];

/**
 * This function replaces all absolute path urls with the url and
 * static directory
 */
const replaceUrlWithSubDirPathHelper = (
  output = '',
  urlWithSubDir = '',
  subDir = '',
) => {
  if (subDir) {
    return replacementMatches
      .reduce((sanitizedOutput, replacementMatch) => {
        return sanitizedOutput.replace(
          new RegExp(replacementMatch, 'g'),
          `$1${urlWithSubDir}$2`,
        );
      }, output);
  }

  return output;
};

module.exports = replaceUrlWithSubDirPathHelper;
