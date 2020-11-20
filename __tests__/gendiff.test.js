/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filePath) => path.join(__dirname, '..', '__fixtures__', filePath);

const readFile = (filePath) => fs.readFileSync(getFixturePath(filePath), 'utf8');

let resultStylish;
let resultPlain;
let resultJSON;
beforeAll(() => {
  resultStylish = readFile('result-stylish.txt');
  resultPlain = readFile('result-plain.txt');
  resultJSON = readFile('result-json.txt');
});

test('findDifferencesJSON', () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileJSON = getFixturePath('after.json');

  const differenceStylish = gendiff(beforeFileJSON, afterFileJSON);
  expect(differenceStylish).toEqual(resultStylish);
  const differencePlain = gendiff(beforeFileJSON, afterFileJSON, 'plain');
  expect(differencePlain).toEqual(resultPlain);
  const differenceJSON = gendiff(beforeFileJSON, afterFileJSON, 'json');
  expect(differenceJSON).toEqual(resultJSON);
});
test('findDifferencesYAML', () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileYAML = getFixturePath('after.yml');

  const differenceStylish = gendiff(beforeFileJSON, afterFileYAML);
  expect(differenceStylish).toEqual(resultStylish);
  const differencePlain = gendiff(beforeFileJSON, afterFileYAML, 'plain');
  expect(differencePlain).toEqual(resultPlain);
  const differenceJSON = gendiff(beforeFileJSON, afterFileYAML, 'json');
  expect(differenceJSON).toEqual(resultJSON);
});
test('findDifferencesINI', () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileINI = getFixturePath('after.ini');

  const differenceStylish = gendiff(beforeFileJSON, afterFileINI);
  expect(differenceStylish).toEqual(resultStylish);
  const differencePlain = gendiff(beforeFileJSON, afterFileINI, 'plain');
  expect(differencePlain).toEqual(resultPlain);
  const differenceJSON = gendiff(beforeFileJSON, afterFileINI, 'json');
  expect(differenceJSON).toEqual(resultJSON);
});
