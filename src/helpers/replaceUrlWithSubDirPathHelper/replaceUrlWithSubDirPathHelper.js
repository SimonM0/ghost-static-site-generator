const OPTIONS = require('../../constants/OPTIONS');

const replacementMatches = [
  // Replaces `url(/mypic.jpg)` with `url(<Website Url>/mypic.jpg)`
  /(url\()(\/[^\/])/,
  // Replaces `src="/mypic.jpg"` with `src="<Website Url>/mypic.jpg"`
  // and `srcset="/mypic.jpg"` with `srcset="<Website Url>/mypic.jpg"`
  /(srcs?e?t?=")(\/[^\/])/,
  // Replaces `href="/styles.css"` with `href="<Website Url>/styles.css"`
  /(href=")(\/[^\/])/,
  // Replaces `w,   /myimage.jpg` with `w,   <Website Url>/myimage.jpg"`
  /(w,\s*)(\/[^\/])/,
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
  if (subDir) {
    const numberOfLevels = filePath
      .split(`/${OPTIONS.STATIC_DIRECTORY}`)
      .pop()
      .split(/\/.*\//)
      .length;
    return replacementMatches
      .reduce(
        (sanitizedOutput, replacementMatch) =>
          sanitizedOutput.replace(
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

              return `${matchGroup1}${relativePathPrefix}${matchGroup2}`
                .replace('//', '/');
            },
          ),
        output,
      );
  }

  return output;
};

module.exports = replaceUrlWithSubDirPathHelper;
