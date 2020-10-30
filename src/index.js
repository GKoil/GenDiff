import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import getAST from './getAST.js';
import formatAST from './formatters/index.js';

const getContent = (filePath) => {
  const readFile = (file) => fs.readFileSync(path.resolve(process.cwd(), file), 'utf8');
  const getFormatFile = (file) => path.extname(file).slice(1);

  const [contentFile, formatFile] = [readFile(filePath), getFormatFile(filePath)];
  return parse(contentFile, formatFile);
};

export default (filePath1, filePath2, format = 'stylish') => {
  const content1 = getContent(filePath1);
  const content2 = getContent(filePath2);

  const ast = getAST(content1, content2);
  return formatAST(ast, format);
};
