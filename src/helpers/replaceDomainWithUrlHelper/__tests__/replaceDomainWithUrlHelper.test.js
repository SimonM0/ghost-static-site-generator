/* eslint-disable max-len */
const replaceDomainWithUrlHelper = require('../replaceDomainWithUrlHelper');

describe('replaceDomainWithUrlHelper', () => {
  it('should replace `src="http://abc.com"` with `src="https://www.myOtherSite.com"`', () => {
    const expected = replaceDomainWithUrlHelper(
      'src="http://abc.com"',
      'http://abc.com',
      'https://www.myOtherSite.com',
    );
    const result = 'src="https://www.myOtherSite.com"';
    expect(expected).toEqual(result);
  });

  it('should with with null`', () => {
    const expected = replaceDomainWithUrlHelper(
      null,
      'http://abc.com',
      'https://www.myOtherSite.com',
    );
    const result = 'null';
    expect(expected).toEqual(result);
  });
});
