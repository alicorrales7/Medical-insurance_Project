import { Response, Request } from "express";
import { Service } from "typedi";

import { FileService } from "../services/fileService";

@Service()
export class FileController {
  constructor(private fileService: FileService) {}

  async postSherpa(res: Response, req: Request){
    const file = req.body;
    const report = await this.fileService.postSherpa(file);
    res.status(200).json({ message: file });
  }

  async postAmbetterBOB(res: Response, req: Request) {
    const file = req.body;
    const report = await this.fileService.postAmbetterBOB(file);
    res.status(200).json({ message: report });
  }

  async postAmbetterCommiss(res: Response, req: Request) {
    const file = req.body;
    const report = await this.fileService.postAmbetterCommiss(file);
    res.status(200).json({ message: report });
  }
}
