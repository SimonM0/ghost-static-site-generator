#!/usr/bin/env node
const removeQueryStrings = require('./removeQueryStrings');
const wget = require('node-wget');
const path = require('path');
const mkdirp = require('mkdirp');
const { exec } = require('child_process');

const STATIC_DIRECTORY = 'static';
const URL = 'http://localhost:2368';

/**
 * Makes the static folder if it does not exist
 */
mkdirp(
  STATIC_DIRECTORY,
  error => {
    const urls = [
      URL,
      `${URL}/sitemap.xml`,
      `${URL}/sitemap-authors.xml`,
      `${URL}/sitemap-pages.xml`,
      `${URL}/sitemap-posts.xml`,
      `${URL}/sitemap-tags.xml`,
    ];
    const absoluteStaticPath = path.resolve(process.cwd(), STATIC_DIRECTORY);

    if (error) {
      console.error(error);
      return;
    }

    console.log(`Directory Created: ${STATIC_DIRECTORY}`);

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
          removeQueryStrings(absoluteStaticPath);
        },
      ),
    );
  },
);
