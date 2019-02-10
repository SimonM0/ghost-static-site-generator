const replaceXmlUrlsHelper = require('../replaceXmlUrlsHelper');

describe('replaceXmlUrlsHelper', () => {
  it('should not replace if file is not xml', () => {
    const expected = replaceXmlUrlsHelper('file.xml')('test');
    const result = 'test';
    expect(expected).toEqual(result);
  });
});
