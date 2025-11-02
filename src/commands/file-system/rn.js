// import { rename, stat } from "node:fs/promises";
// import { join } from "node:path";

// export const renameFile = async (currentDir, oldFileName, newFileName) => {
//   if (!oldFileName || !newFileName) {
//     console.log("Invalid input");
//     return;
//   }

//   const oldPath = join(currentDir, oldFileName);
//   const newPath = join(currentDir, newFileName);

//   try {
//     const fileStat = await stat(oldPath);
//     if (!fileStat.isFile()) {
//       console.log(`'${oldFileName}' is not a file`);
//       return;
//     }

//     await rename(oldPath, newPath);
//     console.log(`File '${oldFileName}' renamed to '${newFileName}'`);
//   } catch (error) {
//     console.log("Operation failed");
//   }
// };
import { rename, stat } from "node:fs/promises";
import { join, resolve, isAbsolute } from "node:path";

export const renameFile = async (currentDir, oldFileName, newFileName) => {
  if (!oldFileName || !newFileName) {
    console.log("Invalid input");
    return;
  }

  const oldPath = isAbsolute(oldFileName) ? oldFileName : resolve(currentDir, oldFileName);
  const newPath = isAbsolute(newFileName) ? newFileName : resolve(currentDir, newFileName);

  try {
    const fileStat = await stat(oldPath);
    if (!fileStat.isFile()) {
      console.log(`'${oldFileName}' is not a file`);
      return;
    }

    await rename(oldPath, newPath);
    console.log(`File '${oldFileName}' renamed to '${newFileName}'`);
  } catch (error) {
    console.log("Operation failed");
  }
};
