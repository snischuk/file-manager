import { createReadStream, createWriteStream } from "node:fs";
import { stat, access, constants } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { resolve, join, basename, dirname, isAbsolute } from "node:path";

export const copyFile = async (currentDir, srcPath, destPath) => {
  if (!srcPath || !destPath) {
    console.log("Invalid input");
    return;
  }

  try {
    const source = isAbsolute(srcPath) ? srcPath : resolve(currentDir, srcPath);
    const sourceStats = await stat(source);
    if (!sourceStats.isFile()) {
      console.log(`Source is not a file: ${srcPath}`);
      return;
    }

    const destAbsolute = isAbsolute(destPath) ? destPath : resolve(currentDir, destPath);
    let destFile;

    try {
      const destStats = await stat(destAbsolute);
      if (destStats.isDirectory()) {
        destFile = join(destAbsolute, basename(source));
      } else {
        destFile = destAbsolute;
      }
    } catch {
      const parentDir = dirname(destAbsolute);
      try {
        await access(parentDir, constants.F_OK | constants.W_OK);
        destFile = destAbsolute;
      } catch {
        console.log(`Destination folder does not exist or is not writable: ${destPath}`);
        return;
      }
    }

    await pipeline(createReadStream(source), createWriteStream(destFile));
    console.log(`File copied to '${destFile}'`);
  } catch (err) {
    console.log("Operation failed:", err.message);
  }
};
