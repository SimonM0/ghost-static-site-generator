const deprecationWarnings = (argv) => {
  if (argv.domain) {
    console.warn('WARNING: the "--domain" flag is deprecated and will be removed in the next version. Please use the "--sourceDomain" flag instead');
  }

  if (argv.url) {
    console.warn('WARNING: the "--url" flag is deprecated and will be removed in the next version. Please use the "--productionDomain" flag instead');
  }
};

module.exports = deprecationWarnings;
