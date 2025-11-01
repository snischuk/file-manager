import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const sortAlphabetically = (arr) => arr.sort((a, b) => a.localeCompare(b));

const formatTableData = ({ directories, files }) => [
  ...directories.map((name) => ({ Name: name, Type: 'directory' })),
  ...files.map((name) => ({ Name: name, Type: 'file' })),
];

const getDirectoryContent = async (currentDir) => {
  const directories = [];
  const files = [];

  const items = await readdir(currentDir);

  for (const item of items) {
    const fullPath = join(currentDir, item);
    try {
      const stats = await stat(fullPath);
      if (stats.isDirectory()) directories.push(item);
      else files.push(item);
    } catch (error) {
      console.warn(`Warning: Could not read '${item}': ${error.message}`);
    }
  }

  return { directories, files };
};

export const ls = async (currentDir) => {
  try {
    const content = await getDirectoryContent(currentDir);

    const sortedContent = {
      directories: sortAlphabetically(content.directories),
      files: sortAlphabetically(content.files),
    };

    const tableData = formatTableData(sortedContent);
    console.table(tableData);
  } catch {
    console.log('Operation failed');
  }
};
