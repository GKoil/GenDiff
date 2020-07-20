import path from 'path';
import yaml from 'js-yaml';

export default (fileContent, file) => {
  const formatFile = path.extname(file);

  if (formatFile === '.yml' || formatFile === '.yaml') {
    return yaml.safeLoad(fileContent);
  }

  return JSON.parse(fileContent);
};
