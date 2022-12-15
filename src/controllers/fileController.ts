import { Request, Response } from "express";
import { Service } from "typedi";

import { FileService } from "../services/fileService";

@Service()
export class FileController {
  constructor(private fileService: FileService) {}

  async filesReport(res: Response, req: Request) {
    const nameCompany: string = req.params.name;
    const file = JSON.parse(JSON.stringify(req.files));
    const sherpa = file.sherpa as Array<object>;
    const companyBOB = file.companyBOB as Array<object>;
    const companyComm = file.companyComm as Array<object>;
    const report = await this.fileService.filesReport(
      sherpa,
      companyBOB,
      companyComm,
      nameCompany
    );
    res.status(200).json({ message: report });
  }
}
