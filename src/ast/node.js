export const getKey = (tree) => tree.key;
export const getStatus = (tree) => tree.status;
export const getValues = ({ values }) => values;
export const getOldValue = (values) => values.oldValue;
export const getNewValue = (values) => values.newValue;
export const isList = (tree) => tree.children === null;
export const getChildren = ({ children }) => children;
