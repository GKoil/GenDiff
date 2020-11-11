import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getStringifyLine = {
  added: (key, { value }) => `Property '${key}' was added with value: ${getValue(value)}`,
  deleted: (key) => `Property '${key}' was removed`,
  unchanged: () => [],
  updated: (key, { oldValue, newValue }) => `Property '${key}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`,
  nested: (key, { children }, iter) => iter(children, [key]),
};

const plain = (data) => {
  const iter = (tree, stackKey) => {
    const diff = tree.flatMap((node) => {
      const key = [...stackKey, node.key].join('.');
      return getStringifyLine[node.status](key, node, iter);
    });
    return diff.join('\n');
  };
  return iter(data, []);
};

export default plain;
