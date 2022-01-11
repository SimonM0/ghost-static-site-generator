const removeAllUrlsHelper = require('../removeAllUrlsHelper');

jest.mock('yargs/yargs', () => () => ({
  argv: {
    url: 'http://www.example.com',
    ignoreAbsolutePaths: true,
  },
}));

describe('removeAllUrlsHelper', () => {
  it('should remove urls from strings', () => {
    const mockOutput = '<img src="http://www.example.com/logo/image.jpg"/>'
      + ' <a href="http://www.example.com/logo/image.jpg"/></a>';
    const expected = removeAllUrlsHelper(mockOutput);
    const result = '<img src="/logo/image.jpg"/>'
      + ' <a href="/logo/image.jpg"/></a>';
    expect(expected).toEqual(result);
  });
});
