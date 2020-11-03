import _ from 'lodash';

const getAST = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));
  return keys.map((key) => {
    if (_.isPlainObject(before[key]) && _.isPlainObject(after[key])) {
      const children = getAST(before[key], after[key]);
      return {
        key, status: 'nested', children,
      };
    }

    const oldValue = _.has(before, key) ? before[key] : null;
    const newValue = _.has(after, key) ? after[key] : null;
    if (oldValue === null) {
      return {
        key, status: 'added', value: newValue,
      };
    }
    if (newValue === null) {
      return {
        key, status: 'deleted', value: oldValue,
      };
    }
    if (!_.isEqual(oldValue, newValue)) {
      return {
        key, status: 'updated', oldValue, newValue,
      };
    }
    return {
      key, status: 'unchanged', value: newValue,
    };
  });
};

export default getAST;
