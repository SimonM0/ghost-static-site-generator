/* eslint-disable max-len */
const convertDomainToRelativeHelper = require('../convertDomainToRelativeHelper');

describe('convertDomainToRelativeHelper', () => {
  it('should convert all urls into paths', () => {
    const mockOutput = `
<link rel="stylesheet" type="text/css" href="https://www.website.com/assets/built/screen.css?v=69b8d4368e" />
<link rel="shortcut icon" href="https://www.website.com/favicon.ico" type="image/x-icon" />
<img class="site-logo" src="https://www.website.com/content/images/size/w300/2019/01/Logo-Preset@3x-1.png" alt="website.com" />
<a class="post-card-image-link" href="https://www.website.com/a-page/">
    <img class="post-card-image"
        srcset="https://www.website.com/content/images/size/w300/2019/01/an-image@1x.jpg 300w,
                https://www.website.com/content/images/size/w600/2019/01/an-image@1x.jpg 600w,
                https://www.website.com/content/images/size/w1000/2019/01/an-image@1x.jpg 1000w,
                https://www.website.com/content/images/size/w2000/2019/01/an-image@1x.jpg 2000w"
        sizes="(max-width: 1000px) 400px, 700px"
        src="https://www.website.com/content/images/size/w600/2019/01/an-image@1x.jpg"
    />
</a>
`;
    const mockUrlToReplace = 'https://www.website.com';
    const result = `
<link rel="stylesheet" type="text/css" href="https://www.website.com/assets/built/screen.css?v=69b8d4368e" />
<link rel="shortcut icon" href="https://www.website.com/favicon.ico" type="image/x-icon" />
<img class="site-logo" src="./content/images/size/w300/2019/01/Logo-Preset@3x-1.png" alt="website.com" />
<a class="post-card-image-link" href="https://www.website.com/a-page/">
    <img class="post-card-image"
        srcset="https://www.website.com/content/images/size/w300/2019/01/an-image@1x.jpg 300w,
                https://www.website.com/content/images/size/w600/2019/01/an-image@1x.jpg 600w,
                https://www.website.com/content/images/size/w1000/2019/01/an-image@1x.jpg 1000w,
                https://www.website.com/content/images/size/w2000/2019/01/an-image@1x.jpg 2000w"
        sizes="(max-width: 1000px) 400px, 700px"
        src="./content/images/size/w600/2019/01/an-image@1x.jpg"
    />
</a>
`;
    expect(convertDomainToRelativeHelper(__dirname)(
      mockOutput,
      mockUrlToReplace,
    ))
      .toEqual(result);
  });
});
