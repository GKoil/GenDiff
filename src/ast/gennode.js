import _ from 'lodash';

const getNode = (before, after) => {
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
    const children = _.isObject(common[key]) ? getNode(before[key], after[key]) : null;

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

export default getNode;
