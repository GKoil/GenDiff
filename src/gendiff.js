import program from 'commander';
import fs from 'fs';
import process from 'process';
import path from 'path';
import diff from './index.js';

export default () => {
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .action((file1, file2) => {
      const beforeFile = fs.readFileSync(path.resolve(process.cwd(), file1), 'utf8');
      const afterFile = fs.readFileSync(path.resolve(process.cwd(), file2), 'utf8');
      const difference = diff(beforeFile, afterFile);
      console.log(difference);
    })
    .option('-f, --format', 'output format');

  program.parse(process.argv);
};
