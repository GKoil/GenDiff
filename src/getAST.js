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
    if (!_.has(before, key)) {
      return {
        key, status: 'added', value: after[key],
      };
    }
    if (!_.has(after, key)) {
      return {
        key, status: 'deleted', value: before[key],
      };
    }
    if (!_.isEqual(before[key], after[key])) {
      return {
        key, status: 'updated', oldValue: before[key], newValue: after[key],
      };
    }
    return {
      key, status: 'unchanged', value: after[key],
    };
  });
};

export default getAST;
