import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import getAST from './getAST.js';
import formatAST from './formatters/index.js';

const getContent = (filePath) => {
  const contentFile = fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');
  const formatFile = path.extname(filePath).slice(1);

  return parse(contentFile, formatFile);
};

export default (filePath1, filePath2, format = 'stylish') => {
  const content1 = getContent(filePath1);
  const content2 = getContent(filePath2);

  const ast = getAST(content1, content2);
  return formatAST(ast, format);
};
