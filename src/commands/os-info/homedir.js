import { homedir } from "node:os";

export const printHomedir = () => {
  console.log(homedir());
};
