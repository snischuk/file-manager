import { writeFile } from "node:fs/promises";
import { join } from "node:path";

export const createFile = async (currentDir, fileName) => {
  if (!fileName) {
    console.log("Invalid input");
    return;
  }

  const filePath = join(currentDir, fileName);

  try {
    await writeFile(filePath, "", { flag: "wx" });
    console.log(`File '${fileName}' created`);
  } catch (error) {
    console.log("Operation failed");
  }
};
