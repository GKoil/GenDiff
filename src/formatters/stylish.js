import _ from 'lodash';

const getSign = {
  added: '+',
  deleted: '-',
  'not changed': ' ',
};

const stylish = (value, spaceCount = 2) => {
  const iter = (tree, depth) => {
    const replacer = ' ';
    const deepSpaceCount = spaceCount + depth;
    const spaces = replacer.repeat(deepSpaceCount);
    const currentSpaces = replacer.repeat(depth);

    if (!_.isObject(tree)) {
      return tree.toString();
    }

    if (!_.isArray(tree)) {
      const values = Object
        .entries(tree)
        .map(([key, value]) => `${spaces}  ${key}: ${value}`);
      return [
        '{',
        ...values,
        `${currentSpaces}}`,
      ].join('\n');
    }
    const lines = tree.map((node) => {
      if (node.status === 'updated') {
        const oldValue = iter(node.oldValue, deepSpaceCount);
        const newValue = iter(node.newValue, deepSpaceCount);
        return `${spaces}- ${node.key}: ${oldValue}\n${spaces}+ ${node.key}: ${newValue}`;
      }
      if (node.status === 'nested') {
        const makeNode = iter(node.children, deepSpaceCount);
        return `${spaces}  ${node.key}: ${makeNode}`;
      }
      const value = iter(node.value);
      return `${spaces}${getSign[node.status]} ${node.key}: ${value}`;
    });

    return [
      '{',
      ...lines,
      `${currentSpaces}}`,
    ].join('\n');
  };

  return iter(value, 0);
};

export default stylish;
