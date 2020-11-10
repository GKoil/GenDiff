import yaml from 'js-yaml';
import ini from '@iarna/toml';

export default (content, format) => {
  switch (format) {
    case 'yml' || 'yaml':
      return yaml.safeLoad(content);
    case 'ini':
      return ini.parse(content);
    case 'json':
      return JSON.parse(content);
    default:
      throw new Error(`Don't support this content '${format}' format`);
  }
};
