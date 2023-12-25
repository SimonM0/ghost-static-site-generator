#!/usr/bin/env node
const generateStaticSite = require('./commands/generateStaticSite');

console.time('Site generated in');

generateStaticSite();
