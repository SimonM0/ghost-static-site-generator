/* eslint-disable max-len */
const replaceUrlWithSubDirPathHelper = require('../replaceUrlWithSubDirPathHelper');

describe('replaceUrlWithSubDirPathHelper', () => {
  it('should replace all relative urls', () => {
    const mockOutput = `
<style type="text/css">
.responsive-header-img {
    background-image: url(/content/images/size/w2000/2019/01/hero-image-1.jpg);
}
</style>
<link rel="stylesheet" type="text/css" href="/assets/built/screen.css?v=69b8d4368e" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<img class="site-logo" src="/content/images/size/w300/2019/01/Logo-Preset@3x-1.png" alt="50startups.com" />
<a class="post-card-image-link" href="/a-page/">
    <img class="post-card-image"
        srcset="/content/images/size/w300/2019/01/an-image@1x.jpg 300w,
                /content/images/size/w600/2019/01/an-image@1x.jpg 600w,
                /content/images/size/w1000/2019/01/an-image@1x.jpg 1000w,
                /content/images/size/w2000/2019/01/an-image@1x.jpg 2000w"
        sizes="(max-width: 1000px) 400px, 700px"
        src="/content/images/size/w600/2019/01/an-image@1x.jpg"
    />
</a>
`;
    const mockUrlWithSubDir = 'http://www.mywebsite.com/deploy-folder';
    const mockSubDir = '/deploy-folder';
    const expected = replaceUrlWithSubDirPathHelper(
      mockOutput,
      mockUrlWithSubDir,
      mockSubDir,
    );
    const result = `
<style type="text/css">
.responsive-header-img {
    background-image: url(http://www.mywebsite.com/deploy-folder/content/images/size/w2000/2019/01/hero-image-1.jpg);
}
</style>
<link rel="stylesheet" type="text/css" href="http://www.mywebsite.com/deploy-folder/assets/built/screen.css?v=69b8d4368e" />
<link rel="shortcut icon" href="http://www.mywebsite.com/deploy-folder/favicon.ico" type="image/x-icon" />
<img class="site-logo" src="http://www.mywebsite.com/deploy-folder/content/images/size/w300/2019/01/Logo-Preset@3x-1.png" alt="50startups.com" />
<a class="post-card-image-link" href="http://www.mywebsite.com/deploy-folder/a-page/">
    <img class="post-card-image"
        srcset="http://www.mywebsite.com/deploy-folder/content/images/size/w300/2019/01/an-image@1x.jpg 300w,
                http://www.mywebsite.com/deploy-folder/content/images/size/w600/2019/01/an-image@1x.jpg 600w,
                http://www.mywebsite.com/deploy-folder/content/images/size/w1000/2019/01/an-image@1x.jpg 1000w,
                http://www.mywebsite.com/deploy-folder/content/images/size/w2000/2019/01/an-image@1x.jpg 2000w"
        sizes="(max-width: 1000px) 400px, 700px"
        src="http://www.mywebsite.com/deploy-folder/content/images/size/w600/2019/01/an-image@1x.jpg"
    />
</a>
`;
    expect(expected).toEqual(result);
  });
  it('should not replace urls with protocols or domains', () => {
    const mockOutput = `
<meta name="twitter:url" content="http://localhost:8080/" />
<meta name="twitter:image" content="http://localhost:8080/content/images/2019/01/hero-image-1.jpg" />
`;
    const mockUrlWithSubDir = 'http://www.mywebsite.com/deploy-folder';
    const mockSubDir = '/deploy-folder';
    const expected = replaceUrlWithSubDirPathHelper(
      mockOutput,
      mockUrlWithSubDir,
      mockSubDir,
    );
    expect(expected).toEqual(mockOutput);
  });
});
