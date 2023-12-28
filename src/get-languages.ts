import fs from 'fs/promises';
import path from 'path';

const templateDir = path.join(__dirname, '../templates');

const extensionSelectRegex = /\.[^.]*$/;

export const getAllFiles = async () => {
  const files = await fs.readdir(templateDir, 'utf-8');

  return files.map((file) => ({
    title: file.replace(extensionSelectRegex, ''),
  }));
};
