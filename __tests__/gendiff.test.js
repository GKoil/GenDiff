import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const getFixturePath = (file) => `${__dirname}/../__fixtures__/${file}`;
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf8');

let result;
beforeEach(() => {
  result = readFile('result.txt');
})

test('findDifferencesJSON', async () => {
  const beforeFile = getFixturePath('before.json');
  const afterFile = getFixturePath('after.json');
  

  const difference = gendiff(beforeFile, afterFile);
  expect(difference).toEqual(result);
});
test('findDifferencesYAML', async () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileYAML = getFixturePath('after.yml');

  const difference = gendiff(beforeFileJSON, afterFileYAML);
  expect(difference).toEqual(result);
});
test('findDifferencesINI', async () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileYAML = getFixturePath('after.ini');

  const difference = gendiff(beforeFileJSON, afterFileYAML);
  expect(difference).toEqual(result);
});