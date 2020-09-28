import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parser from './parsers.js';

export default (file1, file2) => {
  const beforeFile = fs.readFileSync(path.resolve(process.cwd(), file1), 'utf8');
  const afterFile = fs.readFileSync(path.resolve(process.cwd(), file2), 'utf8');
  const parseBeforeFile = parser(beforeFile, file1);
  const parseAfterFile = parser(afterFile, file2);

  const commonFile = { ...parseBeforeFile, ...parseAfterFile };
  const keys = Object.keys(commonFile);

  const getDiff = keys.reduce((acc, key) => {
    if (!_.has(parseBeforeFile, key)) {
      acc.push(`  + ${key}: ${parseAfterFile[key]}`);
      return acc;
    }
    if (!_.has(parseAfterFile, key)) {
      acc.push(`  - ${key}: ${parseBeforeFile[key]}`);
      return acc;
    }
    if (parseBeforeFile[key] !== parseAfterFile[key]) {
      acc.push(`  + ${key}: ${parseAfterFile[key]}`);
      acc.push(`  - ${key}: ${parseBeforeFile[key]}`);
      return acc;
    }
    acc.push(`    ${key}: ${commonFile[key]}`);
    return acc;
  }, [])
    .join('\n');

  return `{\n${getDiff}\n}`;
};
