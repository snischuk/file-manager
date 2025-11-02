import * as navigation from "../commands/navigation/index.js";
import * as fileSystem from "../commands/file-system/index.js";
// import * as compression from "../commands/compression/index.js";
// import * as hash from "../commands/hash/index.js";
// import * as osInfo from "../commands/os-info/index.js";

const commandMap = {
  up: (currentDir) => navigation.upDir(currentDir),
  cd: (currentDir, args) => navigation.changeDir(currentDir, args[0]),
  ls: (currentDir) => navigation.list(currentDir),
  cat: (currentDir, args) => fileSystem.readFile(currentDir, args[0]),
  add: (currentDir, args) => fileSystem.createFile(currentDir, args[0]),
  mkdir: (currentDir, args) => fileSystem.makeDir(currentDir, args[0]),
  rn: (currentDir, args) => fileSystem.renameFile(currentDir, args[0], args[1]),
  cp: (currentDir, args) => fileSystem.copyFile(currentDir, args[0], args[1]),
  mv: (currentDir, args) => fileSystem.moveFile(currentDir, args[0], args[1]),
  rm: (currentDir, args) => fileSystem.removeFile(currentDir, args[0]),
};

const parseArgs = (input) =>
  [...input.matchAll(/[^\s"']+|"([^"]*)"|'([^']*)'/g)].map(
    (match) => match[1] ?? match[2] ?? match[0]
  );

export const dispatchCommand = async (input, currentDir) => {
  const [command, ...args] = parseArgs(input.trim());

  const commandHandler = commandMap[command];

  if (!commandHandler) {
    console.log("Invalid input");
    return currentDir;
  }

  try {
    const newDir = await commandHandler(currentDir, args);
    return newDir || currentDir;
  } catch (error) {
    console.log("Operation failed");
    return currentDir;
  }
};
