#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const difference = genDiff(filepath1, filepath2, program.format);
    console.log(difference);
  })
  .parse(process.argv);
