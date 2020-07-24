import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (fileContent, file) => {
  const formatFile = path.extname(file);

  switch (formatFile) {
    case '.yml' || '.yaml':
      return yaml.safeLoad(fileContent);
    case '.ini':
      return ini.parse(fileContent);
    default:
      return JSON.parse(fileContent);
  }
};
