import _ from 'lodash';
import {
  getKey, getStatus, getValues, getOldValue, getNewValue, isList, getChildren,
} from '../ast/node.js';

const makeList = (key, status, values) => {
  const oldValue = _.isObject(getOldValue(values)) ? '[complex value]' : getOldValue(values);
  const newValue = _.isObject(getNewValue(values)) ? '[complex value]' : getNewValue(values);

  switch (status) {
    case 'update':
      return `Property '${key.slice(1)}' was updated. From ${oldValue} to ${newValue}`;
    case 'add':
      return `Property '${key.slice(1)}' was added with value: ${newValue}`;
    case 'delete':
      return `Property '${key.slice(1)}' was removed`;
    default:
      return false;
  }
};

const plain = (tree, stackKey = '') => {
  const diff = tree.reduce((acc, node) => {
    const key = getKey(node);
    const status = getStatus(node);
    const values = getValues(node);
    const newStackKey = `${stackKey}.${key}`;

    if (isList(node)) {
      const list = makeList(newStackKey, status, values);
      return [...acc, list];
    }

    const isObjectValue = _.isObject(getOldValue(values)) || _.isObject(getNewValue(values));
    const isAllObjectValue = _.isObject(getOldValue(values)) && _.isObject(getNewValue(values));
    const isNullValue = getOldValue(values) === null || getNewValue(values) === null;
    if (isObjectValue && !isAllObjectValue && !isNullValue) {
      const list = makeList(newStackKey, status, values);
      return [...acc, list];
    }

    const children = getChildren(node);
    const newNode = plain(children, newStackKey);
    return [...acc, newNode];
  }, [])
    .flat();

  return _.filter(diff).join('\n');
};

export default plain;
