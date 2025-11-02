import { createReadStream, createWriteStream } from "node:fs";
import { stat, unlink, access } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { resolve, join, basename, isAbsolute } from "node:path";

export const moveFile = async (currentDir, srcPath, destPath) => {
  if (!srcPath || !destPath) {
    console.log("Invalid input");
    return;
  }

  try {
    // Абсолютные пути
    const source = isAbsolute(srcPath) ? srcPath : resolve(currentDir, srcPath);
    const destination = isAbsolute(destPath)
      ? destPath
      : resolve(currentDir, destPath);

    // Проверяем, что исходный файл существует
    const sourceStats = await stat(source);
    if (!sourceStats.isFile()) {
      console.log("Source is not a file");
      return;
    }

    // Проверяем, что директория назначения существует
    await access(destination);

    // Формируем путь назначения (если указана директория)
    const destFilePath = join(destination, basename(source));

    // Копируем потоками
    await pipeline(createReadStream(source), createWriteStream(destFilePath));

    // Удаляем оригинал
    await unlink(source);

    console.log(`File moved to '${destFilePath}'`);
  } catch {
    console.log("Operation failed");
  }
};
