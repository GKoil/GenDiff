import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('findDifferences', async () => {
  const beforeFile = await fs.readFileSync(`${__dirname}/../__fixtures__/before.json`, 'utf8');
  const afterFile = await fs.readFileSync(`${__dirname}/../__fixtures__/after.json`, 'utf8');
  const result = await fs.readFileSync(`${__dirname}/../__fixtures__/result.json`, 'utf8');

  const difference = gendiff(beforeFile, afterFile);
  expect(difference).toEqual(difference);
});
