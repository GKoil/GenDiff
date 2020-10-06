#!/usr/bin/env node

import program from 'commander';
import process from 'process';
import diff from '../index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((file1, file2) => {
    const difference = diff(file1, file2, program.format);
    console.log(difference);
  });

program.parse(process.argv);
