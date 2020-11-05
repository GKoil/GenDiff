import _ from 'lodash';

const getOutputValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (data) => {
  const iter = (tree, stackKey) => {
    const diff = tree.flatMap((node) => {
      const key = [...stackKey, node.key].join('.');
      const { status } = node;

      switch (status) {
        case 'deleted':
          return `Property '${key}' was removed`;
        case 'added':
          return `Property '${key}' was ${status} with value: ${getOutputValue(node.value)}`;
        case 'updated':
          return `Property '${key}' was ${status}. From ${getOutputValue(node.oldValue)} to ${getOutputValue(node.newValue)}`;
        case 'nested':
          return iter(node.children, [key]);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Formatter 'plain' don't support this '${status}' node status`);
      }
    });
    return diff.join('\n');
  };
  return iter(data, []);
};

export default plain;
