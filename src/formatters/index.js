import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const getFormat = (ast, format) => {
  switch (format) {
    case 'stylish':
      return stylish(ast);
    case 'plain':
      return plain(ast);
    case 'json':
      return json(ast);
    default:
      console.log('Don\'t have this format');
      return false;
  }
};

export default getFormat;
