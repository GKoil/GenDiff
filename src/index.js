import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import getAST from './ast/genast.js';
import formatAST from './formatters/index.js';

const getReadFile = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');
const getFormatFile = (filePath) => path.extname(filePath).slice(1);

export default (filePath1, filePath2, format = 'stylish') => {
  const beforeFile = getReadFile(filePath1);
  const formatBeforeFile = getFormatFile(filePath1);
  const afterFile = getReadFile(filePath2);
  const formatAfterFile = getFormatFile(filePath2);

  const parserBeforeFile = parse(beforeFile, formatBeforeFile);
  const parserAfterFile = parse(afterFile, formatAfterFile);

  const ast = getAST(parserBeforeFile, parserAfterFile);
  return formatAST(ast, format);
};
