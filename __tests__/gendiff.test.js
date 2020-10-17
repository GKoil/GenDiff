/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (file) => path.join(__dirname, '..', '__fixtures__', file);

const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf8');

let resultStylish;
let resultPlain;
let resultJSON;
beforeEach(() => {
  resultStylish = readFile('result-stylish.txt');
  resultPlain = readFile('result-plain.txt');
  resultJSON = readFile('result-json.txt');
});

test('findDifferencesJSON', async () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileJSON = getFixturePath('after.json');

  const differenceStylish = gendiff(beforeFileJSON, afterFileJSON, 'stylish');
  expect(differenceStylish).toEqual(resultStylish);
  const differencePlain = gendiff(beforeFileJSON, afterFileJSON, 'plain');
  expect(differencePlain).toEqual(resultPlain);
  const differenceJSON = gendiff(beforeFileJSON, afterFileJSON, 'json');
  expect(differenceJSON).toEqual(resultJSON);
});
test('findDifferencesYAML', async () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileYAML = getFixturePath('after.yml');

  const differenceStylish = gendiff(beforeFileJSON, afterFileYAML, 'stylish');
  expect(differenceStylish).toEqual(resultStylish);
  const differencePlain = gendiff(beforeFileJSON, afterFileYAML, 'plain');
  expect(differencePlain).toEqual(resultPlain);
  const differenceJSON = gendiff(beforeFileJSON, afterFileYAML, 'json');
  expect(differenceJSON).toEqual(resultJSON);
});
test('findDifferencesINI', async () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileINI = getFixturePath('after.ini');

  const differenceStylish = gendiff(beforeFileJSON, afterFileINI, 'stylish');
  expect(differenceStylish).toEqual(resultStylish);
  const differencePlain = gendiff(beforeFileJSON, afterFileINI, 'plain');
  expect(differencePlain).toEqual(resultPlain);
  const differenceJSON = gendiff(beforeFileJSON, afterFileINI, 'json');
  expect(differenceJSON).toEqual(resultJSON);
});
