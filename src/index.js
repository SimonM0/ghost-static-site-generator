#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const generateStaticSite = require('./commands/generateStaticSite');
const deprecationWarning = require('./helpers/deprecationWarnings');

const { argv } = yargs(hideBin(process.argv));

deprecationWarning(argv);

console.time('Site generated in');

generateStaticSite();
