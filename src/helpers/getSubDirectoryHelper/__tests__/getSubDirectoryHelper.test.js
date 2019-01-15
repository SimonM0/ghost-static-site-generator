const getSubDirectoryHelper = require('../getSubDirectoryHelper');

describe('getSubDirectoryHelper', () => {
  it('should return replaceUrl is subDir does not exist', () => {
    const subDir = undefined;
    const mockReplaceUrl = 'http://www.test.com';
    const expected = getSubDirectoryHelper(mockReplaceUrl, subDir);
    const result = 'http://www.test.com';
    expect(expected).toEqual(result);
  });
  it('should return replaceUrl is subDir is not a string', () => {
    const subDir = 1;
    const mockReplaceUrl = 'http://www.test.com';
    const expected = getSubDirectoryHelper(mockReplaceUrl, subDir);
    const result = 'http://www.test.com';
    expect(expected).toEqual(result);
  });
  it('should return replaceUrl with subDir', () => {
    const subDir = '/my-custom-folder';
    const mockReplaceUrl = 'http://www.test.com';
    const expected = getSubDirectoryHelper(mockReplaceUrl, subDir);
    const result = 'http://www.test.com/my-custom-folder';
    expect(expected).toEqual(result);
  });
  it('should return replaceUrl with subDir and handle forward slashes', () => {
    const subDir = '//////my-custom-folder';
    const mockReplaceUrl = 'http://www.test.com';
    const expected = getSubDirectoryHelper(mockReplaceUrl, subDir);
    const result = 'http://www.test.com/my-custom-folder';
    expect(expected).toEqual(result);
  });
});
