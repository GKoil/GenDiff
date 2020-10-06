import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parser from './parsers.js';

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

const getKey = (tree) => tree.key;
const getStatus = (tree) => tree.status;
const getValues = ({ values }) => values;
const getOldValue = (values) => values.oldValue;
const getNewValue = (values) => values.newValue;
const isList = (tree) => tree.children === null;
const getChildren = ({ children }) => children;

const stylish = (tree, indentCount = 0) => tree.reduce((acc, node) => {
  const makeList = (key, status, value, count) => {
    const indent = ' '.repeat(count);

    if (status === 'add') {
      return `${indent}+ ${key}: ${getNewValue(value)}`;
    }
    if (status === 'delete') {
      return `${indent}- ${key}: ${getOldValue(value)}`;
    }
    if (status === 'update') {
      return `${indent}- ${key}: ${getOldValue(value)}\n${indent}+ ${key}: ${getNewValue(value)}`;
    }
    return `${indent}  ${key}: ${getNewValue(value)}`;
  };
  const makeNode = (key, status, children, count) => {
    const indent = ' '.repeat(count);
    const value = stylish(children, count);
    const stylishValue = `{\n${value}\n${indent}}`;
    if (status === 'add') {
      return `${indent}+ ${key}: ${stylishValue}`;
    }
    if (status === 'delete') {
      return `${indent}- ${key}: ${stylishValue}`;
    }
    return `${indent}  ${key}: ${stylishValue}`;
  };

  const key = getKey(node);
  const status = getStatus(node);
  const values = getValues(node);

  if (isList(node)) {
    const list = makeList(key, status, values, indentCount + 2);
    return [...acc, list];
  }

  const children = getChildren(node);
  const newNode = makeNode(key, status, children, indentCount + 2);
  return [...acc, newNode];
}, [])
  .join('\n');

export default (file1, file2) => {
  const beforeFile = fs.readFileSync(path.resolve(process.cwd(), file1), 'utf8');
  const afterFile = fs.readFileSync(path.resolve(process.cwd(), file2), 'utf8');
  const parseBeforeFile = parser(beforeFile, file1);
  const parseAfterFile = parser(afterFile, file2);

  const diff = getNode(parseBeforeFile, parseAfterFile);
  // console.log(JSON.stringify(diff, null, ' '));
  return `{\n${stylish(diff)}\n}`;
};
