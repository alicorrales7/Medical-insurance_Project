import { Service } from "typedi";

import { Orquestrator } from "./logic/orquestrator";

@Service()
export class FileRepository {
  constructor(private orquestrator: Orquestrator) {}

  async filesReport(
    sherpa: Array<object>,
    companyBOB: Array<object>,
    companyComm: Array<object>,
    nameCompany: string
  ) {
    const report = this.orquestrator.index(
      sherpa,
      companyBOB,
      companyComm,
      nameCompany
    );
    return report;
  }
}
