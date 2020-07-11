import program from 'commander';

export default () => {
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format', 'output format');

  program.parse(process.argv);
};
