import { join } from 'path';
import { expect, test } from 'vitest';
import fs from 'fs';
import { execaCommandSync } from 'execa';
import type { ExecaSyncReturnValue, SyncOptions } from 'execa';

const CLI_PATH = join(__dirname, '../');

const run = (
  args: string[],
  options: SyncOptions = {},
): ExecaSyncReturnValue => {
  return execaCommandSync(`node ${CLI_PATH} ${args.join(' ')}}`);
};

test('prompts for language name if not supplied', () => {
  const { stdout } = run(['']);
  expect(stdout).toContain('What is your language?');
});

test.skip('No prompt when language name is supplied', () => {
  const lang = 'python';
  run(['--language', lang]);

  const generatedContent = fs.readFileSync(join(CLI_PATH, '.gitignore'));
  console.log(generatedContent);
});
