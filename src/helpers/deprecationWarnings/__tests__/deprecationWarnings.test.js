const deprecationWarnings = require('../deprecationWarnings');

describe('deprecationWarnings', () => {
  const pathResolveSpy = jest.spyOn(console, 'warn');
  pathResolveSpy.mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should output a deprecation warning for --domain', () => {
    const mockArgv = { domain: 'http://google.com' };

    deprecationWarnings(mockArgv);

    expect(pathResolveSpy)
      .toHaveBeenCalledWith('WARNING: the "--domain" flag is deprecated and will be removed in the next version. Please use the "--sourceDomain" flag instead');
  });

  it('should output a deprecation warning for --url', () => {
    const mockArgv = { url: 'http://google.com' };

    deprecationWarnings(mockArgv);

    expect(pathResolveSpy)
      .toHaveBeenCalledWith('WARNING: the "--url" flag is deprecated and will be removed in the next version. Please use the "--productionDomain" flag instead');
  });

  it('should not output any deprecation warnings', () => {
    const mockArgv = {};

    deprecationWarnings(mockArgv);

    expect(pathResolveSpy).not.toHaveBeenCalled();
  });
});
