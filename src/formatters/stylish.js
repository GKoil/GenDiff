import _ from 'lodash';

const getIndent = (count, replacer = ' ') => replacer.repeat(count);
const getLine = (spaces, key, sign, value) => `${spaces}${sign} ${key}: ${value}`;
const getOutputTree = (lines, spaces) => `{\n${lines.join('\n')}\n${spaces}}`;

const getValue = (value, depth) => {
  if (_.isObject(value)) {
    const increasedDepth = depth + 2;
    const lines = Object
      .entries(value)
      .map(([key, objectValue]) => `${getIndent(increasedDepth)}  ${key}: ${objectValue}`);
    return getOutputTree(lines, getIndent(depth));
  }
  return value.toString();
};

const stylish = (data) => {
  const iter = (tree, depth) => {
    const spaces = getIndent(depth + 2);
    const lines = tree.flatMap((node) => {
      const increasedDepth = depth + 2;
      const { key, status } = node;
      switch (status) {
        case 'nested':
          return `${spaces}  ${key}: ${iter(node.children, increasedDepth)}`;
        case 'updated':
          return [getLine(spaces, key, '-', getValue(node.oldValue, increasedDepth)),
            getLine(spaces, key, '+', getValue(node.newValue, increasedDepth))];
        case 'added':
          return getLine(spaces, key, '+', getValue(node.value, increasedDepth));
        case 'deleted':
          return getLine(spaces, key, '-', getValue(node.value, increasedDepth));
        case 'unchanged':
          return getLine(spaces, key, ' ', getValue(node.value, increasedDepth));
        default:
          throw new Error(`Formatter 'stylish' don't support this '${status}' node status`);
      }
    });
    return getOutputTree(lines, getIndent(depth));
  };
  return iter(data, 0);
};

export default stylish;
