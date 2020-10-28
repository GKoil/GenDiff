import _ from 'lodash';

const getAST = (before, after) => {
  const common = { ...before, ...after };
  const keys = Object.keys(common);

  return keys.reduce((acc, key) => {
    const oldValue = _.has(before, key) ? before[key] : null;
    const newValue = _.has(after, key) ? after[key] : null;
    const getStatus = (value1, value2) => {
      if (value1 === null) {
        return 'add';
      }
      if (value2 === null) {
        return 'delete';
      }
      if (value1 !== value2) {
        return 'update';
      }
      return 'stay';
    };

    const status = getStatus(oldValue, newValue);
    const hasChildren = _.isObject(before[key]) || _.isObject(after[key]);
    const children = hasChildren ? getAST(before[key], after[key]) : null;

    const tree = {
      key,
      status,
      values: {
        oldValue,
        newValue,
      },
      children,
    };
    return [...acc, tree];
  }, []);
};

export default getAST;
