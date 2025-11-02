import { cpus } from "node:os";

export const printCPUs = () => {
  const cpuList = cpus();
  console.log(`Total CPUs: ${cpuList.length}`);
  cpuList.forEach((cpu, index) => {
    console.log(
      `CPU ${index + 1}: ${cpu.model.trim()} — ${(cpu.speed / 1000).toFixed(2)} GHz`
    );
  });
};
