export default (fileBefore, fileAfter) => {
  const ObjFileBefore = JSON.parse(fileBefore);
  const ObjFileAfter = JSON.parse(fileAfter);

  let result = '';

  const entriesFileBefore = Object.entries(ObjFileBefore);
  const entriesFileAfter = Object.entries(ObjFileAfter);

  entriesFileBefore.forEach(([key, value]) => {
    if (ObjFileAfter[key] === value) {
      result += `    ${key}: ${value} \n`;
    } else if (ObjFileAfter[key] === undefined) {
      result += `  - ${key}: ${value} \n`;
    } else {
      result += `  + ${key}: ${ObjFileAfter[key]} \n  - ${key}: ${value} \n`;
    }
  });
  entriesFileAfter.forEach(([key, value]) => {
    if (ObjFileBefore[key] === undefined) {
      result += `  - ${key}: ${value} \n`;
    }
  });

  const endResult = `{ \n${result}}`;
  console.log(endResult);
};
