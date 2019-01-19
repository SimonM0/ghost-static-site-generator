/* eslint-disable max-len */
const replaceUrlWithSubDirPathHelper = require('../replaceUrlWithSubDirPathHelper');

describe('replaceUrlWithSubDirPathHelper', () => {
  it('should replace all relative urls', () => {
    const mockOutput = `
<script>
  const browser = ['firefox', /Firefox\\/([0-9\\.]+)/],
  ['bb', /BlackBerry.+Version\\/([0-9\\.]+)/],
  ['bb',  /BB[0-9]+.+Version\\/([0-9\\.]+)/],
  ['opera',  /OPR\\/([0-9\\.]+)/],
  ['opera',  /Opera\\/([0-9\\.]+)/],
  ['edge',  /Edge\\/([0-9\\.]+)/],
  ['safari',  /Version\\/([0-9\\.]+).+Safari/],
  ['chrome',  /Chrome\\/([0-9\\.]+)/],
  ['ie',   /MSIE ([0-9]+)/],
  ['ie',  /Trident\\/.+rv:([0-9]+)/];
</script>
<style type="text/css">
.responsive-header-img {
    background-image: url(/content/images/size/w2000/2019/01/hero-image-1.jpg);
}
</style>
<link rel="stylesheet" type="text/css" href="/assets/built/screen.css?v=69b8d4368e" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<img class="site-logo" src="/content/images/size/w300/2019/01/Logo-Preset@3x-1.png" alt="website.com" />
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
    const mockSubDir = '/deploy-folder';
    const expected = replaceUrlWithSubDirPathHelper(
      mockOutput,
      mockSubDir,
    );
    const result = `
<script>
  const browser = ['firefox', /Firefox\\/([0-9\\.]+)/],
  ['bb', /BlackBerry.+Version\\/([0-9\\.]+)/],
  ['bb',  /BB[0-9]+.+Version\\/([0-9\\.]+)/],
  ['opera',  /OPR\\/([0-9\\.]+)/],
  ['opera',  /Opera\\/([0-9\\.]+)/],
  ['edge',  /Edge\\/([0-9\\.]+)/],
  ['safari',  /Version\\/([0-9\\.]+).+Safari/],
  ['chrome',  /Chrome\\/([0-9\\.]+)/],
  ['ie',   /MSIE ([0-9]+)/],
  ['ie',  /Trident\\/.+rv:([0-9]+)/];
</script>
<style type="text/css">
.responsive-header-img {
    background-image: url(./content/images/size/w2000/2019/01/hero-image-1.jpg);
}
</style>
<link rel="stylesheet" type="text/css" href="./assets/built/screen.css?v=69b8d4368e" />
<link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
<img class="site-logo" src="./content/images/size/w300/2019/01/Logo-Preset@3x-1.png" alt="website.com" />
<a class="post-card-image-link" href="./a-page/">
    <img class="post-card-image"
        srcset="./content/images/size/w300/2019/01/an-image@1x.jpg 300w,
                ./content/images/size/w600/2019/01/an-image@1x.jpg 600w,
                ./content/images/size/w1000/2019/01/an-image@1x.jpg 1000w,
                ./content/images/size/w2000/2019/01/an-image@1x.jpg 2000w"
        sizes="(max-width: 1000px) 400px, 700px"
        src="./content/images/size/w600/2019/01/an-image@1x.jpg"
    />
</a>
`;
    expect(expected).toEqual(result);
  });

  it('should replace all relative urls that are in nested folders', () => {
    const mockOutput = `
<script>
  const browser = ['firefox', /Firefox\\/([0-9\\.]+)/],
  ['bb', /BlackBerry.+Version\\/([0-9\\.]+)/],
  ['bb',  /BB[0-9]+.+Version\\/([0-9\\.]+)/],
  ['opera',  /OPR\\/([0-9\\.]+)/],
  ['opera',  /Opera\\/([0-9\\.]+)/],
  ['edge',  /Edge\\/([0-9\\.]+)/],
  ['safari',  /Version\\/([0-9\\.]+).+Safari/],
  ['chrome',  /Chrome\\/([0-9\\.]+)/],
  ['ie',   /MSIE ([0-9]+)/],
  ['ie',  /Trident\\/.+rv:([0-9]+)/];
</script>
<style type="text/css">
.responsive-header-img {
    background-image: url(/content/images/size/w2000/2019/01/hero-image-1.jpg);
}
</style>
<link rel="stylesheet" type="text/css" href="/assets/built/screen.css?v=69b8d4368e" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<img class="site-logo" src="/content/images/size/w300/2019/01/Logo-Preset@3x-1.png" alt="website.com" />
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
    const mockSubDir = '/deploy-folder';
    const mockFilePath = '/deploy-folder/some-other-folder';
    const expected = replaceUrlWithSubDirPathHelper(
      mockOutput,
      mockSubDir,
      mockFilePath,
    );
    const result = `
<script>
  const browser = ['firefox', /Firefox\\/([0-9\\.]+)/],
  ['bb', /BlackBerry.+Version\\/([0-9\\.]+)/],
  ['bb',  /BB[0-9]+.+Version\\/([0-9\\.]+)/],
  ['opera',  /OPR\\/([0-9\\.]+)/],
  ['opera',  /Opera\\/([0-9\\.]+)/],
  ['edge',  /Edge\\/([0-9\\.]+)/],
  ['safari',  /Version\\/([0-9\\.]+).+Safari/],
  ['chrome',  /Chrome\\/([0-9\\.]+)/],
  ['ie',   /MSIE ([0-9]+)/],
  ['ie',  /Trident\\/.+rv:([0-9]+)/];
</script>
<style type="text/css">
.responsive-header-img {
    background-image: url(./../content/images/size/w2000/2019/01/hero-image-1.jpg);
}
</style>
<link rel="stylesheet" type="text/css" href="./../assets/built/screen.css?v=69b8d4368e" />
<link rel="shortcut icon" href="./../favicon.ico" type="image/x-icon" />
<img class="site-logo" src="./../content/images/size/w300/2019/01/Logo-Preset@3x-1.png" alt="website.com" />
<a class="post-card-image-link" href="./../a-page/">
    <img class="post-card-image"
        srcset="./../content/images/size/w300/2019/01/an-image@1x.jpg 300w,
                ./../content/images/size/w600/2019/01/an-image@1x.jpg 600w,
                ./../content/images/size/w1000/2019/01/an-image@1x.jpg 1000w,
                ./../content/images/size/w2000/2019/01/an-image@1x.jpg 2000w"
        sizes="(max-width: 1000px) 400px, 700px"
        src="./../content/images/size/w600/2019/01/an-image@1x.jpg"
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
    const mockSubDir = '/deploy-folder';
    const expected = replaceUrlWithSubDirPathHelper(
      mockOutput,
      mockSubDir,
    );
    expect(expected).toEqual(mockOutput);
  });
});
