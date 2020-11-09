import _ from 'lodash';

const getIndent = (count, replacer = ' ') => replacer.repeat(count);
const getLine = (depth, key, sign, value) => `${getIndent(depth + 2)}${sign} ${key}: ${value}`;
const getOutputTree = (lines, spaces) => `{\n${lines.join('\n')}\n${spaces}}`;

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

const stylish = (data) => {
  const iter = (tree, depth) => {
    const lines = tree.flatMap((node) => {
      const { key, status } = node;
      switch (status) {
        case 'nested':
          return `${getIndent(depth + 2)}  ${key}: ${iter(node.children, depth + 2)}`;
        case 'updated':
          return [getLine(depth, key, '-', getValue(node.oldValue, depth)),
            getLine(depth, key, '+', getValue(node.newValue, depth))];
        case 'added':
          return getLine(depth, key, '+', getValue(node.value, depth));
        case 'deleted':
          return getLine(depth, key, '-', getValue(node.value, depth));
        case 'unchanged':
          return getLine(depth, key, ' ', getValue(node.value, depth));
        default:
          throw new Error(`Formatter 'stylish' don't support this '${status}' node status`);
      }
    });
    return getOutputTree(lines, getIndent(depth));
  };
  return iter(data, 0);
};

export default stylish;
