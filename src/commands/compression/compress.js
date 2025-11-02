import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { resolve, join, basename, isAbsolute } from "node:path";

export const compressFile = async (currentDir, pathToFile, pathToDestination) => {
  try {
    const sourcePath = isAbsolute(pathToFile)
      ? pathToFile
      : resolve(currentDir, pathToFile);

    const destinationDir = isAbsolute(pathToDestination)
      ? pathToDestination
      : resolve(currentDir, pathToDestination);

    const fileName = basename(pathToFile);
    const destinationPath = join(destinationDir, `${fileName}.br`);

    await pipeline(
      createReadStream(sourcePath),
      createBrotliCompress(),
      createWriteStream(destinationPath)
    );

    console.log("File successfully compressed!");
  } catch {
    console.error("Operation failed");
  }
};
