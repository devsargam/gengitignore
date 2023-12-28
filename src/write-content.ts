import fs from 'fs/promises';

export async function writeToFile(content: string) {
  await fs.writeFile('.gitignore', content);
}
