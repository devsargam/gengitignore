import fs from 'fs/promises';
import path from 'path';

export async function writeToFile(content: string, projectDir: string) {
  const filePath = path.join(__dirname, '..', projectDir, '.gitignore');
  try {
    await fs.writeFile(filePath, content);
  } catch {
    throw new Error('No such directory');
  }
}
