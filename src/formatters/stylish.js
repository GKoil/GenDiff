import _ from 'lodash';

const getSpaces = (depth) => {
  const replacer = ' ';
  const spaceCount = 2;

  const deepSpaceCount = spaceCount + depth;
  const spaces = replacer.repeat(deepSpaceCount);
  const currentSpaces = replacer.repeat(depth);

  return [currentSpaces, spaces, deepSpaceCount];
};

const getValue = (value, depth) => {
  if (_.isObject(value)) {
    const [currentSpaces, spaces] = getSpaces(depth);
    const lines = Object
      .entries(value)
      .map(([key, objectValue]) => `${spaces}  ${key}: ${objectValue}`);
    return [
      '{',
      ...lines,
      `${currentSpaces}}`,
    ].join('\n');
  }
  return value.toString();
};

const stylish = (data) => {
  const iter = (tree, depth) => {
    const [currentSpaces, spaces, deepSpaceCount] = getSpaces(depth);
    const lines = tree.map((node) => {
      const { key, status } = node;
      switch (status) {
        case 'updated':
          return `${spaces}- ${key}: ${getValue(node.oldValue, deepSpaceCount)}\n${spaces}+ ${key}: ${getValue(node.newValue, deepSpaceCount)}`;
        case 'nested':
          return `${spaces}  ${key}: ${iter(node.children, deepSpaceCount)}`;
        case 'added':
          return `${spaces}+ ${key}: ${getValue(node.value, deepSpaceCount)}`;
        case 'deleted':
          return `${spaces}- ${key}: ${getValue(node.value, deepSpaceCount)}`;
        case 'unchanged':
          return `${spaces}  ${key}: ${getValue(node.value, deepSpaceCount)}`;
        default:
          throw new Error(`Formatter 'stylish' don't support this '${status}' node status`);
      }
    });

    return [
      '{',
      ...lines,
      `${currentSpaces}}`,
    ].join('\n');
  };

  return iter(data, 0);
};

export default stylish;
