import { resolve, isAbsolute, parse } from 'node:path';
import { statSync } from 'node:fs';
import { platform } from 'node:os';

export const cd = (currentDir, targetPath) => {
  if (!targetPath) {
    console.log('Invalid input');
    return currentDir;
  }

  const newPath = isAbsolute(targetPath)
    ? targetPath
    : resolve(currentDir, targetPath);

  try {
    const stats = statSync(newPath);
    if (!stats.isDirectory()) {
      console.log('Operation failed');
      return currentDir;
    }
  } catch {
    console.log('Operation failed');
    return currentDir;
  }

  const rootDir = platform() === 'win32' ? parse(newPath).root : '/';

  if (!newPath.startsWith(rootDir)) {
    return currentDir;
  }

  return newPath;
};
