import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const getFixturePath = (file) => `${__dirname}/../__fixtures__/${file}`;
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf8');

let resultStylish;
let resultPlain;
beforeEach(() => {
  resultStylish = readFile('result-stylish.txt');
  resultPlain = readFile('result-plain.txt');
})

test('findDifferencesJSON', async () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileJSON = getFixturePath('after.json');

  const differenceStylish = gendiff(beforeFileJSON, afterFileJSON, 'stylish');
  expect(differenceStylish).toEqual(resultStylish);
  const differencePlain = gendiff(beforeFileJSON, afterFileJSON, 'plain');
  expect(differencePlain).toEqual(resultPlain);
});
test('findDifferencesYAML', async () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileYAML = getFixturePath('after.yml');

  const differenceStylish = gendiff(beforeFileJSON, afterFileYAML, 'stylish');
  expect(differenceStylish).toEqual(resultStylish);
  const differencePlain = gendiff(beforeFileJSON, afterFileYAML, 'plain');
  expect(differencePlain).toEqual(resultPlain);
});
test('findDifferencesINI', async () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileINI = getFixturePath('after.ini');

  const differenceStylish = gendiff(beforeFileJSON, afterFileINI, 'stylish');
  expect(differenceStylish).toEqual(resultStylish);
  const differencePlain = gendiff(beforeFileJSON, afterFileINI, 'plain');
  expect(differencePlain).toEqual(resultPlain);
});