import fs from "fs";
import { Service } from "typedi";

import { CompanyClientDTO } from "../../DTO/companyClientDTO.ts";
import { CompanyBobParserInterface } from "../../Interface/Ambetter/companyBOBParserInterface";
import { AmbetterMapp } from "../../validates/Ambetter/AmbetterMapping";

@Service()
export class AmbetterBobParse implements CompanyBobParserInterface {
  constructor(private ambetterMapp: AmbetterMapp) {}

  private readFile(filePath: string): string[][] | string {
    try {
      const files = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .split("\n")
        .map((row: string): string[] => {
          return row.split(",");
        });
      return files;
    } catch (error) {
      return "Problem with read file Ambetter Book of Business: " + error;
    }
  }

  parse(file: Array<object>): object | string {
    const filePath = JSON.parse(JSON.stringify(file[0]));
    const ambetterClientWrong: CompanyClientDTO[] = [];
    const ambetterClient: CompanyClientDTO[] = [];
    const files = this.readFile(filePath.path);
    let cont;

    for (let index = 0; index < files[0].length; index++) {
      const element = files[0][index];
      if (element === "Exchange Subscriber ID") {
        cont = index;
      }
    }

    if (files[0][cont] === "Exchange Subscriber ID") {
      for (let i = 1; i < files.length; i++) {
        const company = {
          exchangeSubscriberID: files[i][13],
          name: files[1][3]+ " " + files[i][4],
          policyNumber: files[i][2],
          transformerID: files[i][13],
        };
        const current = this.ambetterMapp.stringToDTO(company);
        if (
          current.exchangeSubscriberID !== "" ||
          current.policyNumber !== ""
        ) {
          ambetterClient.push(current);
        } else {
          ambetterClientWrong.push(current);
        }
      }
      const report = { good: ambetterClient, bad: ambetterClientWrong };
      return report;
    } else {
      return "'Invalid process that Ambetter BOB File'";
    }
  }
  commissionAsignate(): string {
    return "AmbetterCommParser";
  }
}
