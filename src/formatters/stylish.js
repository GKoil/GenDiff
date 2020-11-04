import _ from 'lodash';

const increaseDepth = (depth, spaceCount = 2) => depth + spaceCount;

const getIndent = (count, replacer = ' ') => replacer.repeat(count);
const getSpaces = (depth) => {
  const deepSpaceCount = increaseDepth(depth);
  return getIndent(deepSpaceCount);
};
const getCurrentSpaces = (depth) => getIndent(depth);

const getOutputTree = (lines, spaces) => `{\n${lines.join('\n')}\n${spaces}}`;

const getValue = (value, depth) => {
  if (_.isObject(value)) {
    const lines = Object
      .entries(value)
      .map(([key, objectValue]) => `${getSpaces(depth)}  ${key}: ${objectValue}`);
    return getOutputTree(lines, getCurrentSpaces(depth));
  }
  return value.toString();
};

const stylish = (data) => {
  const iter = (tree, depth) => {
    const spaces = getSpaces(depth);
    const lines = tree.map((node) => {
      const increasedDepth = increaseDepth(depth);
      const { key, status } = node;
      switch (status) {
        case 'updated':
          return `${spaces}- ${key}: ${getValue(node.oldValue, increasedDepth)}\n${spaces}+ ${key}: ${getValue(node.newValue, increasedDepth)}`;
        case 'nested':
          return `${spaces}  ${key}: ${iter(node.children, increasedDepth)}`;
        case 'added':
          return `${spaces}+ ${key}: ${getValue(node.value, increasedDepth)}`;
        case 'deleted':
          return `${spaces}- ${key}: ${getValue(node.value, increasedDepth)}`;
        case 'unchanged':
          return `${spaces}  ${key}: ${getValue(node.value, increasedDepth)}`;
        default:
          throw new Error(`Formatter 'stylish' don't support this '${status}' node status`);
      }
    });
    return getOutputTree(lines, getCurrentSpaces(depth));
  };
  return iter(data, 0);
};

export default stylish;
