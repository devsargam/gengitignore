import prompts from 'prompts';
import path from 'path';
import minimist from 'minimist';

import { getAllFiles } from './get-languages';
import { getContentFromFile } from './get-content';
import { writeToFile } from './write-content';

const argv = minimist<{
  language?: string;
}>(process.argv.slice(2), { string: ['_'] });

prompts.override(argv);

const defaultDir = '.';

const init = async () => {
  const argTargetDir = formatTargetDir(argv._[0]);
  let targetDir = argTargetDir || defaultDir;

  const getProjectName = () => (targetDir === '.' ? '.' : targetDir);

  const { language } = await prompts({
    type: 'autocomplete',
    name: 'language',
    message: 'What is your language?',
    choices: await getAllFiles(),
  });

  console.log(`🧪 Generating .gitignore for ${language}`);
  const content = await getContentFromFile(language);

  await writeToFile(content, getProjectName());
  console.log(`🧪 Generated .gitignore for ${language}`);
};

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '');
}

init().catch((e: Error) => {
  console.error('⚠️  Some error occured');
  console.error('‼️  ' + e.message);
});
