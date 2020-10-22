import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

export default (ast, format) => {
  switch (format) {
    case 'stylish':
      return stylish(ast);
    case 'plain':
      return plain(ast);
    case 'json':
      return json(ast);
    default:
      throw new Error('Not have this output format');
  }
};
