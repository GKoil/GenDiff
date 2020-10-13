import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getNode from './ast/gennode.js';
import getFormat from './formatters/index.js';

export default (file1, file2, format) => {
  const beforeFile = fs.readFileSync(path.resolve(process.cwd(), file1), 'utf8');
  const afterFile = fs.readFileSync(path.resolve(process.cwd(), file2), 'utf8');
  const parseBeforeFile = parser(beforeFile, file1);
  const parseAfterFile = parser(afterFile, file2);

  const ast = getNode(parseBeforeFile, parseAfterFile);
  // return JSON.stringify(ast, null, ' ');
  return getFormat(ast, format);
};
