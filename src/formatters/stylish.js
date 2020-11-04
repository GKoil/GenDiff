import _ from 'lodash';

const spaceCount = 2;

const getSpaces = (depth) => {
  const replacer = ' ';
  const deepSpaceCount = spaceCount + depth;
  const spaces = replacer.repeat(deepSpaceCount);
  const currentSpaces = replacer.repeat(depth);
  return [currentSpaces, spaces, deepSpaceCount];
};

const getValue = (value, depth) => {
  const [currentSpaces, spaces] = getSpaces(depth);
  console.log(value);
  if (_.isString(value)) {
    return value;
  }

  const lines = Object
    .entries(value)
    .map(([key, objectValue]) => `${spaces}  ${key}: ${objectValue}`);
  return [
    '{',
    ...lines,
    `${currentSpaces}}`,
  ].join('\n');
};

const stylish = (data) => {
  const iter = (tree, depth) => {
    const [currentSpaces, spaces, deepSpaceCount] = getSpaces(depth);
    const lines = tree.map((node) => {
      const { key, status } = node;
      switch (status) {
        case 'updated':
          return `${spaces}- ${key}: ${getValue(node.oldValue, depth)}\n${spaces}+ ${key}: ${getValue(node.newValue, depth)}`;
        case 'nested':
          return `${spaces}  ${key}: ${iter(node.children, deepSpaceCount)}`;
        case 'added':
          return `${spaces}+ ${key}: ${getValue(node.value, depth)}`;
        case 'deleted':
          return `${spaces}- ${key}: ${getValue(node.value, depth)}`;
        case 'unchanged':
          return `${spaces}  ${key}: ${getValue(node.value, depth)}`;
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
