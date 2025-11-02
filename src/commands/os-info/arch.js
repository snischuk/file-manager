import { arch } from "node:os";

export const printArchitecture = () => {
  console.log(arch());
};
