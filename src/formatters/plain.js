import _ from 'lodash';

const plain = (tree, stackKey = []) => {
  const diff = tree.map((node) => {
    const key = [...stackKey, node.key].join('.');
    const { status } = node;
    if (status === 'deleted') {
      return `Property '${key}' was removed`;
    }
    if (status === 'added') {
      const value = _.isObject(node.value) ? '[complex value]' : node.value;
      return `Property '${key}' was ${status} with value: ${value}`;
    }
    if (status === 'updated') {
      const oldValue = _.isObject(node.oldValue) ? '[complex value]' : node.oldValue;
      const newValue = _.isObject(node.newValue) ? '[complex value]' : node.newValue;
      return `Property '${key}' was ${status}. From ${oldValue} to ${newValue}`;
    }
    if (status === 'nested') {
      return plain(node.children, [key]);
    }
    return null;
  });

  return _.filter(diff).join('\n');
};

export default plain;
