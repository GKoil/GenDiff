import yaml from 'js-yaml';

export default (fileYAML) => yaml.safeLoad(fileYAML);
