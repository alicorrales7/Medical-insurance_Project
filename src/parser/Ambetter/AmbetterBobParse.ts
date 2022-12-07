import fs from "fs";
import { Service } from "typedi";

import { CompanyClientDTO } from "../../DTO/companyClientDTO.ts";
import { CompanyBobParserInterface } from "../../Interface/companyBOBParserInterface";
import { AmbetterMapp } from "../../validates/Ambetter/AmbetterMapping";

@Service()
export class AmbetterBobParse implements CompanyBobParserInterface {
  constructor(private ambetterMapp: AmbetterMapp) {}

  readFile(): string[][] | string {
    try {
      const files = fs
        .readFileSync("data/Ambetter_BOB.csv", { encoding: "utf8" })
        .split("\n")
        .map((row: string): string[] => {
          return row.split(",");
        });
      console.log(files);
      return files;
    } catch (error) {
      return "Problem with read file Ambetter Book of Business: " + error;
    }
  }

  parse(): CompanyClientDTO[] | string {
    const ambetterClient: CompanyClientDTO[] = [];
    const files = this.readFile();
    const ambetterClientWrong: CompanyClientDTO[] = [];

    for (let i = 1; i < files.length; i++) {
      const company = {
        exchangeSubscriberID: files[i][13],
        policyNumber: files[i][2],
      };
      const current = this.ambetterMapp.stringToDTO(company);
      if (current.exchangeSubscriberID !== "" || current.policyNumber !== "") {
        ambetterClient.push(current);
      } else {
        ambetterClientWrong.push(current);
      }
    }
    return ambetterClient;
  }
}
