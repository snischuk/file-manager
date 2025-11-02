import { userInfo } from "node:os";

export const printUsername = () => {
  console.log(userInfo().username);
};
