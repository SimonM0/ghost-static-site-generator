#!/usr/bin/env node
const removeQueryStringsHelper = require('./helpers/removeQueryStringsHelper');
const wget = require('node-wget');
const path = require('path');
const mkdirp = require('mkdirp');
const { argv } = require('yargs');
const { exec } = require('child_process');

// Options
const STATIC_DIRECTORY = argv.dest || 'static';
const DOMAIN = argv.domain || 'http://localhost:2368';

/**
 * Makes the static folder if it does not exist
 */
mkdirp(
  STATIC_DIRECTORY,
  error => {
    const urls = [
      DOMAIN,
      `${DOMAIN}/sitemap.xml`,
      `${DOMAIN}/sitemap-authors.xml`,
      `${DOMAIN}/sitemap-pages.xml`,
      `${DOMAIN}/sitemap-posts.xml`,
      `${DOMAIN}/sitemap-tags.xml`,
    ];
    const absoluteStaticPath = path.resolve(process.cwd(), STATIC_DIRECTORY);

    if (error) {
      console.error(error);
      return;
    }

    urls.forEach(
      url => exec(
        'wget ' +
        '--recursive ' +
        '--page-requisites ' +
        '--no-parent ' +
        '--no-host-directories ' +
        '--restrict-file-name=unix ' +
        '--trust-server-names ' +
        `--directory-prefix ${STATIC_DIRECTORY} ` +
        `${url}`,
        () => {
          /**
           * Remove all query strings from file names
           */
          removeQueryStringsHelper(absoluteStaticPath);
        },
      ),
    );

    console.log(`Domain: ${DOMAIN}`);
    console.log(`Static site generated at: ${absoluteStaticPath}`);
  },
);
