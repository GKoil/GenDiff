#!/usr/bin/env node

import program from 'commander';
import process from 'process';
import diff from '../index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    const difference = diff(file1, file2);
    console.log(difference);
  })
  .option('-f, --format', 'output format');

program.parse(process.argv);
