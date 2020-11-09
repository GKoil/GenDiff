import _ from 'lodash';

const getIndent = (count, replacer = ' ') => replacer.repeat(count);
const getOutputTree = (lines, spaces) => [
  '{',
  ...lines,
  `${spaces}}`,
].join('\n');

const getValue = (value, depth) => {
  if (_.isObject(value)) {
    const increasedDepth = depth + 4;
    const lines = Object
      .entries(value)
      .map(([key, objectValue]) => `${getIndent(increasedDepth)}  ${key}: ${objectValue}`);
    return getOutputTree(lines, getIndent(depth + 2));
  }
  return value.toString();
};

const getLine = {
  added: (depth, key, value) => `${getIndent(depth + 2)}+ ${key}: ${value}`,
  deleted: (depth, key, value) => `${getIndent(depth + 2)}- ${key}: ${value}`,
  unchanged: (depth, key, value) => `${getIndent(depth + 2)}  ${key}: ${value}`,
};

const stylish = (data) => {
  const iter = (tree, depth) => {
    const lines = tree.flatMap((node) => {
      const { key, status } = node;
      if (status === 'nested') {
        return `${getIndent(depth + 2)}  ${key}: ${iter(node.children, depth + 2)}`;
      }
      if (status === 'updated') {
        return [getLine.deleted(depth, key, getValue(node.oldValue, depth)),
          getLine.added(depth, key, getValue(node.newValue, depth))];
      }
      return getLine[status](depth, key, node.value);
    });
    return getOutputTree(lines, getIndent(depth));
  };
  return iter(data, 0);
};

export default stylish;
