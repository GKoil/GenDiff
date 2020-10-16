import _ from 'lodash';
import {
  getKey, getStatus, getValues, getOldValue, getNewValue, getChildren,
} from '../ast/node.js';

const getLine = (key, status, oldValue, newValue, spaces = '', list) => {
  if (list === true) {
    return `${spaces}  ${key}: ${newValue || oldValue}`;
  }
  if (status === 'add') {
    return `${spaces}+ ${key}: ${newValue}`;
  }
  if (status === 'delete') {
    return `${spaces}- ${key}: ${oldValue}`;
  }
  if (status === 'update') {
    return `${spaces}- ${key}: ${oldValue}\n${spaces}+ ${key}: ${newValue}`;
  }
  return `${spaces}  ${key}: ${newValue}`;
};

const stylish = (value, spaceCount = 2) => {
  const iter = (tree, depth, list) => {
    const replacer = ' ';
    const deepSpaceCount = spaceCount + depth;
    const spaces = replacer.repeat(deepSpaceCount);
    const currentSpaces = replacer.repeat(depth);

    const lines = tree.reduce((acc, node) => {
      const key = getKey(node);
      const status = getStatus(node);
      const values = getValues(node);
      const oldValue = getOldValue(values);
      const newValue = getNewValue(values);
      const children = getChildren(node);

      if (!_.isObject(oldValue) && !_.isObject(newValue)) {
        return [...acc, getLine(key, status, oldValue, newValue, spaces, list)];
      }
      if (_.isObject(oldValue) && _.isObject(newValue)) {
        const makeNode = iter(children, deepSpaceCount);
        return [...acc, `${spaces}  ${key}: ${makeNode}`];
      }
      const isOldValueNotObject = _.isObject(oldValue) && !_.isObject(newValue);
      const isNewValueNotObject = !_.isObject(oldValue) && _.isObject(newValue);
      if (isOldValueNotObject || isNewValueNotObject) {
        const listValue = _.isObject(oldValue) ? newValue : oldValue;
        const listStatus = !_.isObject(oldValue) ? 'delete' : 'add';
        const nodeStatus = listStatus === 'delete' ? '+' : '-';

        const makeList = getLine(key, listStatus, listValue, listValue, spaces);
        const makeNode = iter(children, deepSpaceCount, true);

        const makeString = `${makeList}\n${spaces}${nodeStatus} ${key}: ${makeNode}`;
        return [...acc, makeString];
      }

      return acc;
    }, []);

    return [
      '{',
      ...lines,
      `${currentSpaces}}`,
    ].join('\n');
  };

  return iter(value, 0);
};
export default stylish;
