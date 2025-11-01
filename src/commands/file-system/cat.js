import { createReadStream } from "node:fs";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";
import { Writable } from "node:stream";

export const cat = async (currentDir, fileName) => {
  if (!fileName) {
    console.log("Invalid input");
    return;
  }

  const filePath = join(currentDir, fileName);

  try {
    const writable = new Writable({
      write(chunk, encoding, callback) {
        process.stdout.write(chunk, encoding, callback);
      },
    });

    await pipeline(createReadStream(filePath, { encoding: "utf-8" }), writable);
    process.stdout.write("\n");
  } catch {
    console.log("Operation failed");
  }
};
