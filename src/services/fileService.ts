import { Service } from "typedi";

import { FileRepository } from "../repository/fileRepository";

@Service()
export class FileService {
  constructor(private fileRepository: FileRepository) {}

  async postSherpa(file: File) {
    const report = await this.fileRepository.postSherpa(file);
    return file;
  }

  async postAmbetterBOB(file: File) {
    const report = await this.fileRepository.postAmbetterBOB(file);
    return file;
  }

  async postAmbetterCommiss(file: File) {
    const report = await this.fileRepository.postAmbetterCommiss(file);
    return file;
  }
}
