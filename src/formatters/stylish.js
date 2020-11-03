import _ from 'lodash';

const getSign = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const stylish = (data, spaceCount = 2) => {
  const iter = (tree, depth) => {
    const replacer = ' ';
    const deepSpaceCount = spaceCount + depth;
    const spaces = replacer.repeat(deepSpaceCount);
    const currentSpaces = replacer.repeat(depth);

    if (!_.isObject(tree)) {
      return tree.toString();
    }

    if (!_.isArray(tree)) {
      const lines = Object
        .entries(tree)
        .map(([key, value]) => `${spaces}  ${key}: ${value}`);
      return [
        '{',
        ...lines,
        `${currentSpaces}}`,
      ].join('\n');
    }
    const lines = tree.map((node) => {
      const { key, status } = node;
      if (status === 'updated') {
        const oldValue = iter(node.oldValue, deepSpaceCount);
        const newValue = iter(node.newValue, deepSpaceCount);
        return `${spaces}- ${key}: ${oldValue}\n${spaces}+ ${key}: ${newValue}`;
      }
      if (status === 'nested') {
        const children = iter(node.children, deepSpaceCount);
        return `${spaces}  ${key}: ${children}`;
      }
      const value = iter(node.value);
      return `${spaces}${getSign[status]} ${key}: ${value}`;
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
