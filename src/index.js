import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import getAST from './ast/getAST.js';
import formatAST from './formatters/index.js';

const readFile = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');
const getFormatFile = (filePath) => path.extname(filePath).slice(1);

export default (filePath1, filePath2, format = 'stylish') => {
  const [contentFile1, formatFile1] = [readFile(filePath1), getFormatFile(filePath1)];
  const [contentFile2, formatFile2] = [readFile(filePath2), getFormatFile(filePath2)];

  const parsedContent1 = parse(contentFile1, formatFile1);
  const parsedContent2 = parse(contentFile2, formatFile2);

  const ast = getAST(parsedContent1, parsedContent2);
  return formatAST(ast, format);
};
