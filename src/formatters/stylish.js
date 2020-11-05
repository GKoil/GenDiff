import _ from 'lodash';

const spaceCount = 2;

const getIndent = (count, replacer = ' ') => replacer.repeat(count);
const getSpaces = (depth) => getIndent(depth);
const getCurrentSpaces = (depth) => getIndent(depth);

const getOutputTree = (lines, spaces) => `{\n${lines.join('\n')}\n${spaces}}`;

const getLine = (spaces, key, sign, value) => `${spaces}${sign} ${key}: ${value}`;

const getValue = (value, depth) => {
  if (_.isObject(value)) {
    const increasedDepth = depth + spaceCount;
    const lines = Object
      .entries(value)
      .map(([key, objectValue]) => `${getSpaces(increasedDepth)}  ${key}: ${objectValue}`);
    return getOutputTree(lines, getCurrentSpaces(depth));
  }
  return value.toString();
};

const stylish = (data) => {
  const iter = (tree, depth) => {
    const spaces = getSpaces(depth + spaceCount);
    const lines = tree.flatMap((node) => {
      const increasedDepth = depth + spaceCount;
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
    return getOutputTree(lines, getCurrentSpaces(depth));
  };
  return iter(data, 0);
};

export default stylish;
