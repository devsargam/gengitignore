import prompts from 'prompts';

import { getAllFiles } from './get-languages';
import { getContentFromFile } from './get-content';
import { writeToFile } from './write-content';
import minimist from 'minimist';

const argv = minimist<{
  language?: string;
}>(process.argv.slice(2), { string: ['_'] });

prompts.override(argv);

(async () => {
  const { language } = await prompts({
    type: 'autocomplete',
    name: 'language',
    message: 'What is your language?',
    choices: await getAllFiles(),
  });

  console.log(`🧪 Generating .gitignore for ${language}`);
  const content = await getContentFromFile(language);

  await writeToFile(content);
})();
