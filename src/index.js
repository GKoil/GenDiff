import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parser from './parsers.js';

// const stylish = (object, key, sign = ' ') => `  ${sign} ${key}: ${object[key]}`;

const getNode = (before, after) => {
  const common = { ...before, ...after };
  const keys = Object.keys(common);

  return keys.reduce((acc, key) => {
    const oldValue = _.has(before, key) ? before[key] : null;
    const newValue = _.has(after, key) ? after[key] : null;
    const getStatus = (value1, value2) => {
      if (value1 === null) {
        return 'add';
      }
      if (value2 === null) {
        return 'delete';
      }
      if (value1 !== value2) {
        return 'update';
      }
      return 'stay';
    };
    const status = getStatus(oldValue, newValue);
    const children = _.isObject(common[key]) ? getNode(before[key], after[key]) : null;

    const tree = {
      key,
      status,
      values: {
        oldValue,
        newValue,
      },
      children,
    };
    acc.push(tree);
    return acc;
  }, []);
};

export default (file1, file2) => {
  const beforeFile = fs.readFileSync(path.resolve(process.cwd(), file1), 'utf8');
  const afterFile = fs.readFileSync(path.resolve(process.cwd(), file2), 'utf8');
  const parseBeforeFile = parser(beforeFile, file1);
  const parseAfterFile = parser(afterFile, file2);

  const diff = getNode(parseBeforeFile, parseAfterFile);
  return JSON.stringify(diff, null, ' ');
};
