import fs from 'fs/promises';
import path from 'path';

export const getContentFromFile = async (fileName: string) => {
  const filePath = path.join(__dirname, `../templates/${fileName}.gitignore`);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (e) {
    console.error('No such file');
    process.exit(1);
  }
};
