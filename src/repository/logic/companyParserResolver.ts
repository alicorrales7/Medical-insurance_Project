import { Service } from "typedi";

import { config } from "../../util/config";

@Service()
export class CompanyParserResolver {
  constructor(config: string) {}

  resolve(companyId: string) {
    let companyBOB = "";
    const companyCS = "";
    for (let index = 0; index < config.length; index++) {
      const element = config[index];
      if (config[index].name === companyId) {
        companyBOB = config[index].parseBOB;

        break;
      }
    }
    return companyBOB;
  }
}
