import { Service } from "typedi";

import { FileRepository } from "../repository/fileRepository";

@Service()
export class FileService {
  constructor(private fileRepository: FileRepository) {}

  async getFile() {
    const file = await this.fileRepository.getFile();
    return file;
  }
}
