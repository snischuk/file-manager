import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";

export const calculateHash = async (currentDir, filePath) => {
  try {
    const fullPath = join(currentDir, filePath);
    const hash = createHash("sha256");
    const fileStream = createReadStream(fullPath);

    await pipeline(fileStream, hash);

    const calculatedHash = hash.digest("hex");
    console.log(calculatedHash);
  } catch {
    console.log("Operation failed");
  }
};
