import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parser from './parsers.js';

export default (file1, file2) => {
  const beforeFile = fs.readFileSync(path.resolve(process.cwd(), file1), 'utf8');
  const afterFile = fs.readFileSync(path.resolve(process.cwd(), file2), 'utf8');
  const parseBeforeFile = parser(beforeFile, file1);
  const parseAfterFile = parser(afterFile, file2);

  let result = '';

  const entriesFileBefore = Object.entries(parseBeforeFile);
  const entriesFileAfter = Object.entries(parseAfterFile);

  entriesFileBefore.forEach(([key, value]) => {
    if (parseAfterFile[key] === value) {
      result += `    ${key}: ${value} \n`;
      return;
    }
    if (!_.has(parseAfterFile, key)) {
      result += `  - ${key}: ${value} \n`;
      return;
    }
    result += `  + ${key}: ${parseAfterFile[key]} \n  - ${key}: ${value} \n`;
  });
  entriesFileAfter.forEach(([key, value]) => {
    if (!_.has(parseBeforeFile, key)) {
      result += `  - ${key}: ${value} \n`;
    }
  });

  return `{ \n${result}}`;
};
