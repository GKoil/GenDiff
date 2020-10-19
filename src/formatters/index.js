import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const getFormat = (ast, format) => {
  switch (format) {
    case 'plain':
      return plain(ast);
    case 'json':
      return json(ast);
    default:
      return stylish(ast);
  }
};

export default getFormat;
