import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { resolve, join, basename, isAbsolute } from "node:path";

export const decompressFile = async (currentDir, pathToFile, pathToDestination) => {
  try {
    const sourcePath = isAbsolute(pathToFile)
      ? pathToFile
      : resolve(currentDir, pathToFile);

    const destinationDir = isAbsolute(pathToDestination)
      ? pathToDestination
      : resolve(currentDir, pathToDestination);

    let fileName = basename(pathToFile);
    if (fileName.endsWith(".br")) fileName = fileName.slice(0, -3);

    const destinationPath = join(destinationDir, fileName);

    await pipeline(
      createReadStream(sourcePath),
      createBrotliDecompress(),
      createWriteStream(destinationPath)
    );

    console.log("File successfully decompressed!");
  } catch {
    console.error("Operation failed");
  }
};
