import {
  getKey, getStatus, getValues, getOldValue, getNewValue, isList, getChildren,
} from '../ast/node.js';

const stylish = (tree, indentCount = 0) => {
  const diff = tree.reduce((acc, node) => {
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

  return diff; // TODO: fix output format
};
export default stylish;
