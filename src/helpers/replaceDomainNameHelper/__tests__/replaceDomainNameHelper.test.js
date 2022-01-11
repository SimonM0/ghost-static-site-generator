/* eslint-disable max-len */
const fs = require('fs');
const replaceDomainNameHelper = require('../replaceDomainNameHelper');

jest.mock('path', () => ({
  join: (...args) => args.join(''),
  resolve: (...args) => args.join(''),
  relative: (...args) => args.join(''),
}));

jest.mock('fs');

jest.mock('yargs/yargs', () => () => ({
  argv: {
    url: 'https://localhost:2742',
    domain: 'https://localhost:2742',
    subDir: __dirname,
  },
}));

describe('replaceDomainNameHelper', () => {
  const MOCK_FILE_INFO = {
    '/static/protocolRelativeUrls.html': {
      contents: 'src="//localhost:2742/content/someImage.jpg"',
    },
    '/static/http.html': {
      contents: 'src="http://localhost:2742/content/someImage.jpg"',
    },
    '/static/https.html': {
      contents: 'src="https://localhost:2742/content/someImage.jpg"',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fs.setMockFiles(MOCK_FILE_INFO);
  });

  it('should replace `src="//localhost:2742/content/someImage.jpg"` with `src="./content/someImage.jpg"` for protocolRelativeUrls', () => {
    const fileHandler = replaceDomainNameHelper(
      '/static/',
      'http://www.anothersite.com',
    );

    fileHandler('protocolRelativeUrls.html');

    expect(fs.writeFileSync)
      .toHaveBeenCalledWith(
        '/static/protocolRelativeUrls.html',
        'src="./content/someImage.jpg"',
      );
  });

  it('should replace `src="https://localhost:2742/content/someImage.jpg"` with `src="./content/someImage.jpg"` for protocolRelativeUrls', () => {
    const fileHandler = replaceDomainNameHelper(
      '/static/',
      'https://www.anothersite.com',
    );

    fileHandler('https.html');

    expect(fs.writeFileSync)
      .toHaveBeenCalledWith(
        '/static/https.html',
        'src="./content/someImage.jpg"',
      );
  });
});
