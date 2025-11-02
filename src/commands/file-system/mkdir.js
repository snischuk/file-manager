import { mkdir } from "node:fs/promises";
import { join } from "node:path";

export const makeDir = async (currentDir, dirName) => {
  if (!dirName) {
    console.log("Invalid input");
    return;
  }

  const dirPath = join(currentDir, dirName);

  try {
    await mkdir(dirPath);
    console.log(`Directory '${dirName}' created`);
  } catch {
    console.log("Operation failed");
  }
};
