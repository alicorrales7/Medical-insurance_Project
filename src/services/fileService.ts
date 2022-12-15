import { Service } from "typedi";

import { FileRepository } from "../repository/fileRepository";

@Service()
export class FileService {
  constructor(private fileRepository: FileRepository) {}

  async filesReport(
    sherpa: Array<object>,
    companyBOB: Array<object>,
    companyComm: Array<object>,
    nameCompany: string
  ) {
    const report = await this.fileRepository.filesReport(
      sherpa,
      companyBOB,
      companyComm,
      nameCompany
    );

    return report;
  }
}
