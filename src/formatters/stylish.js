import _ from 'lodash';

const indent = ' '.repeat(4);
const getIndent = (count) => indent.repeat(count);
const getStringifyTree = (lines, spaces) => (
  [
    '{',
    ...lines,
    `${spaces}}`,
  ].join('\n')
);

const getValue = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => {
      const preparedValue = getValue(value, depth + 1);
      return `${getIndent(depth)}${indent}${key}: ${preparedValue}`;
    });
  return getStringifyTree(lines, getIndent(depth));
};

const getStringifyLine = (depth, sign, key, value) => `${getIndent(depth)}  ${sign} ${key}: ${getValue(value, depth + 1)}`;
const processingNode = {
  added: (depth, node) => getStringifyLine(depth, '+', node.key, node.value),
  deleted: (depth, node) => getStringifyLine(depth, '-', node.key, node.value),
  unchanged: (depth, node) => getStringifyLine(depth, ' ', node.key, node.value),
  updated: (depth, node) => [getStringifyLine(depth, '-', node.key, node.oldValue), getStringifyLine(depth, '+', node.key, node.newValue)],
};

const stylish = (data) => {
  const iter = (tree, depth) => {
    const lines = tree.flatMap((node) => {
      if (node.status === 'nested') {
        return `${getIndent(depth)}${indent}${node.key}: ${iter(node.children, depth + 1)}`;
      }
      return processingNode[node.status](depth, node);
    });
    return getStringifyTree(lines, getIndent(depth));
  };
  return iter(data, 0);
};

export default stylish;
