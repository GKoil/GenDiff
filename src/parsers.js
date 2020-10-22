import yaml from 'js-yaml';
import ini from '@iarna/toml';

export default (fileContent, formatFile) => {
  switch (formatFile) {
    case 'yml' || 'yaml':
      return yaml.safeLoad(fileContent);
    case 'ini':
      return ini.parse(fileContent);
    case 'json':
      return JSON.parse(fileContent);
    default:
      throw new Error('Don\'t support this file');
  }
};
