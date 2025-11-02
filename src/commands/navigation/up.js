import { dirname, parse } from 'node:path';
import { platform } from 'node:os';

export const upDir = (currentDir) => {
  const parentDir = dirname(currentDir);
  const rootDir = platform() === 'win32' ? parse(currentDir).root : '/';

  if (currentDir === rootDir) {
    return currentDir;
  }

  return parentDir;
};
