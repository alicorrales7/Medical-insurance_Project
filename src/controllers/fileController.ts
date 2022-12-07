import { Response } from "express";
import { Service } from "typedi";

import { FileService } from "../services/fileService";

@Service()
export class FileController {
  constructor(private fileService: FileService) {}

  async getFile(res: Response) {
    const file = await this.fileService.getFile();
    res.status(200).json({ message: file });
  }
}
