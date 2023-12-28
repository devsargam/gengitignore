import prompts from 'prompts';
import yargs from 'yargs';

import { getAllFiles } from './get-languages';
import { getContentFromFile } from './get-content';
import { writeToFile } from './write-content';

prompts.override(yargs.argv);

(async () => {
  const { fileName } = await prompts({
    type: 'autocomplete',
    name: 'fileName',
    message: 'What is your language?',
    choices: await getAllFiles(),
  });

  const content = await getContentFromFile(fileName);

  await writeToFile(content);
})();
