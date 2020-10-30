import _ from 'lodash';

const getAST = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));
  return keys.flatMap((key) => {
    const oldValue = _.has(before, key) ? before[key] : null;
    const newValue = _.has(after, key) ? after[key] : null;
    const [beforeHasChildren, afterHasChildren] = [_.isObject(before[key]), _.isObject(after[key])];

    if (beforeHasChildren && afterHasChildren) {
      const children = getAST(before[key], after[key]);
      return {
        key, status: 'nested', children,
      };
    }
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
    if (oldValue !== newValue) {
      return {
        key, status: 'updated', oldValue, newValue,
      };
    }

    return {
      key, status: 'not changed', value: newValue,
    };
  });
};

export default getAST;
