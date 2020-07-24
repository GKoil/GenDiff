import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const findPathFile = (file) => `${__dirname}/../__fixtures__/${file}`;
const readFile = (file) => fs.readFileSync(`${__dirname}/../__fixtures__/${file}`, 'utf8');

let result;
beforeEach(() => {
  result = readFile('result.txt');
})

test('findDifferencesJSON', async () => {
  const beforeFile = findPathFile('before.json');
  const afterFile = findPathFile('after.json');
  

  const difference = gendiff(beforeFile, afterFile);
  expect(difference).toEqual(result);
});
test('findDifferencesYAML', async () => {
  const beforeFileJSON = findPathFile('before.json');
  const afterFileYAML = findPathFile('after.yml');

  const difference = gendiff(beforeFileJSON, afterFileYAML);
  expect(difference).toEqual(result);
});
test('findDifferencesINI', async () => {
  const beforeFileJSON = findPathFile('before.json');
  const afterFileYAML = findPathFile('after.ini');

  const difference = gendiff(beforeFileJSON, afterFileYAML);
  expect(difference).toEqual(result);
});