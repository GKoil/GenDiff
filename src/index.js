import _ from 'lodash';

export default (fileBefore, fileAfter) => {
  const objFileBefore = JSON.parse(fileBefore);
  const objFileAfter = JSON.parse(fileAfter);

  let result = '';

  const entriesFileBefore = Object.entries(objFileBefore);
  const entriesFileAfter = Object.entries(objFileAfter);

  entriesFileBefore.forEach(([key, value]) => {
    if (objFileAfter[key] === value) {
      result += `    ${key}: ${value} \n`;
      return;
    }
    if (!_.has(objFileAfter, key)) {
      result += `  - ${key}: ${value} \n`;
      return;
    }
    result += `  + ${key}: ${objFileAfter[key]} \n  - ${key}: ${value} \n`;
  });
  entriesFileAfter.forEach(([key, value]) => {
    if (!_.has(objFileBefore, key)) {
      result += `  - ${key}: ${value} \n`;
    }
  });

  return `{ \n${result}}`;
};
