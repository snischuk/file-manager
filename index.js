import { startCli } from "./src/app/cli.js";

const usernameArg = process.argv.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Anonymous";

console.log(`Welcome to the File Manager, ${username}!`);

startCli(username);
