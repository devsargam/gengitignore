import { join } from 'path';
import { expect, test, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { execaCommandSync } from 'execa';
import type { ExecaSyncReturnValue, SyncOptions } from 'execa';

const CLI_PATH = join(__dirname, '../');

const tmpDir = './tmp';

beforeEach(async () => {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }
});

afterEach(async () => {
  fs.rmdirSync(tmpDir, { recursive: true });
});

const run = (
  args: string[],
  options: SyncOptions = {},
): ExecaSyncReturnValue => {
  return execaCommandSync(`node ${CLI_PATH}cli.js ${args.join(' ')}`);
};

test('prompts for language name if not supplied', () => {
  const { stdout } = run(['']);
  expect(stdout).toContain('What is your language?');
});

test('creates a file in certain directory', () => {
  run([tmpDir, '--language', 'Python']);
  expect(fs.existsSync(tmpDir + '/.gitignore')).toBeTruthy();
  run([tmpDir, '--language', 'Python']);
  expect(fs.existsSync(tmpDir + '/.gitignore')).toBeTruthy();
});
