import { up } from "../commands/navigation/up.js";
import { cd } from "../commands/navigation/cd.js";
import { ls } from "../commands/navigation/ls.js";

import { cat } from "../commands/file-system/cat.js";
import { add } from "../commands/file-system/add.js";

const commandMap = {
  up: (currentDir) => up(currentDir),
  cd: (currentDir, args) => cd(currentDir, args[0]),
  ls: (currentDir) => ls(currentDir),
  cat: (currentDir, args) => cat(currentDir, args[0]),
  add: (currentDir, args) => add(currentDir, args[0]),
};

const parseArgs = (input) =>
  [...input.matchAll(/[^\s"]+|"([^"]*)"/g)].map(
    (match) => match[1] ?? match[0]
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
