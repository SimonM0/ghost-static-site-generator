/* eslint-disable max-len */
import fs from 'fs';
import { replaceDomainNameHelper } from '../replaceDomainNameHelper';

jest.mock('path', () => ({
  join: (...args) => args.join(''),
}));

jest.mock('fs');

jest.mock('yargs', () => ({
  argv: {
    url: 'https://localhost:2742',
    domain: 'https://localhost:2742',
  },
}));

describe('replaceDomainNameHelper', () => {
  const MOCK_FILE_INFO = {
    '/static/protocolRelativeUrls.html': {
      contents: '//localhost:2742',
    },
    '/static/http.html': {
      contents: 'http://localhost:2742',
    },
    '/static/https.html': {
      contents: 'https://localhost:2742',
    },
  };

  beforeEach(() => {
    fs.setMockFiles(MOCK_FILE_INFO);
  });

  it('should replace `//localhost:2742` with `//www.anothersite.com` for protocolRelativeUrls', () => {
    const fileHandler = replaceDomainNameHelper(
      '/static/',
      'http://www.anothersite.com',
    );

    fileHandler('protocolRelativeUrls.html');

    expect(fs.writeFileSync)
      .toHaveBeenCalledWith(
        '/static/protocolRelativeUrls.html',
        '//www.anothersite.com',
      );
  });

  it('should replace `http://localhost:2742` with `http://www.anothersite.com` for protocolRelativeUrls', () => {
    const fileHandler = replaceDomainNameHelper(
      '/static/',
      'http://www.anothersite.com',
    );

    fileHandler('http.html');

    expect(fs.writeFileSync)
      .toHaveBeenCalledWith(
        '/static/http.html',
        'http://www.anothersite.com',
      );
  });

  it('should replace `https://localhost:2742` with `https://www.anothersite.com` for protocolRelativeUrls', () => {
    const fileHandler = replaceDomainNameHelper(
      '/static/',
      'https://www.anothersite.com',
    );

    fileHandler('https.html');

    expect(fs.writeFileSync)
      .toHaveBeenCalledWith(
        '/static/https.html',
        'https://www.anothersite.com',
      );
  });

  it('should allow protocol overriding', () => {
    const fileHandler = replaceDomainNameHelper(
      '/static/',
      'http://www.anothersite.com',
    );

    fileHandler('https.html');

    expect(fs.writeFileSync)
      .toHaveBeenCalledWith(
        '/static/https.html',
        'http://www.anothersite.com',
      );
  });
});
