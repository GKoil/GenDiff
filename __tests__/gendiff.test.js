import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('findDifferencesJSON', async () => {
  const beforeFile = `${__dirname}/../__fixtures__/before.json`;
  const afterFile = `${__dirname}/../__fixtures__/after.json`;
  const result = await fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf8');

  const difference = gendiff(beforeFile, afterFile);
  expect(difference).toEqual(result);
});
test('findDifferencesYAML', async () => {
  const beforeFileJSON = `${__dirname}/../__fixtures__/before.json`;
  const afterFileYAML = `${__dirname}/../__fixtures__/after.yml`;
  const result = await fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf8');

  const difference = gendiff(beforeFileJSON, afterFileYAML);
  expect(difference).toEqual(result);
});