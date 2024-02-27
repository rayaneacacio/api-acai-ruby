import fs from "fs";
import path from "path";
import { TMP_FOLDER, UPLOADS_FOLDER } from "../configs/uploads";
import { AppError } from "../utils/AppError";

export default class DiskStorage {
  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(TMP_FOLDER, file),
      path.resolve(UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
    } catch(error) {
      throw new AppError(`erro ao deletar imagem ${file}`);
    }
  }
}