import { createInterface } from "node:readline";
import { homedir } from "node:os";
import { dispatchCommand } from "./router.js";

export const startCli = (username) => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  let currentDir = homedir();

  console.log(`You are currently in ${currentDir}`);
  readline.prompt();

  readline.on("line", async (line) => {
    const input = line.trim();

    if (input === ".exit") {
      readline.close();
      return;
    }

    try {
      const newDir = await dispatchCommand(input, currentDir);

      if (newDir) {
        currentDir = newDir;
      }
    } catch {
      console.log("Operation failed");
    }

    console.log(`You are currently in ${currentDir}`);
    readline.prompt();
  });

  readline.on("close", () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });

  process.on("SIGINT", () => readline.close());
};
