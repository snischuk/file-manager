import { unlink, stat } from "node:fs/promises";
import { resolve, isAbsolute } from "node:path";

export const removeFile = async (currentDir, filePath) => {
  if (!filePath) {
    console.log("Invalid input");
    return;
  }

  const fullPath = isAbsolute(filePath) ? filePath : resolve(currentDir, filePath);

  try {
    const fileStat = await stat(fullPath);
    if (!fileStat.isFile()) {
      console.log(`'${filePath}' is not a file`);
      return;
    }

    await unlink(fullPath);
    console.log(`File '${filePath}' deleted`);
  } catch (error) {
    console.log("Operation failed");
  }
};
