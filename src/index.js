#!/usr/bin/env node
require('@babel/register');
const { generateStaticSite } = require('./commands/generateStaticSite');

generateStaticSite();
