const path = require('path');
const fetchUrlHelper = require('../fetchUrlHelper');
const crawlPageHelper = require('../../crawlPageHelper');

jest.mock('../../crawlPageHelper');

describe('fetchUrlHelper', () => {
  const pathResolveSpy = jest.spyOn(path, 'resolve');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should pass url to crawlPageHelper', () => {
    const mockUrl = 'https://localhost:2368';

    fetchUrlHelper(mockUrl);

    expect(crawlPageHelper)
      .toHaveBeenCalledWith(mockUrl);
  });

  it('should strip https domains from the url', () => {
    process.argv = [
      '/Users/momo/.nvm/versions/node/v16.6.1/bin/node',
      '/Users/momo/Sites/ghost-static-site-generator/src',
      '--domain',
      'https://localhost:2368',
      '--preview',
    ];

    const mockUrl = 'https://localhost:2368/sitemap.xml';

    fetchUrlHelper(mockUrl);

    expect(pathResolveSpy)
      .toHaveBeenCalledWith(
        process.cwd(),
        'static/sitemap.xml',
      );
  });
});
