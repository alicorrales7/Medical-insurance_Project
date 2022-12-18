import fs from "fs";
import { Service } from "typedi";

import { CommissionStatemDTO } from "../../DTO/commissionStatemClientDTO";
import { CommissionStatemInterface } from "../../Interface/Ambetter/commissionStatemparseInterface";
import { CommissionAmbetterMapp } from "../../validates/Ambetter/commissionAmbetterMapping";

@Service()
export class AmbetterCommParser implements CommissionStatemInterface {
  constructor(private commissionAmbetterMapping: CommissionAmbetterMapp) {}
  readFile(): string[][] | string {
    try {
      const files = fs
        .readFileSync("data/Ambetter_Comm.csv", { encoding: "utf8" })
        .split("\n")
        .map((row: string): string[] => {
          return row.split(",");
        });
      return files;
    } catch (error) {
      return "Problem with read file Ambetter Commission Statement: " + error;
    }
  }

  parse(): object | string {
    const ambetterCommissClient: CommissionStatemDTO[] = [];
    const ambetterCommissClientWrong: CommissionStatemDTO[] = [];
    const files = this.readFile();

    if (typeof files[0][11] === "string") {
      for (let i = 1; i < files.length; i++) {
        const company = {
          policyNumber: files[i][11],
          name: files[i][1] + " " + files[i][2],
          numberMember: files[i][6],
          commissionDate: files[i][8],
          amount: files[i][10],
          ifPay: false,
        };
        const current = this.commissionAmbetterMapping.stringToDTO(company);
        if (
          current.policyNumber !== "" ||
          current.name !== "" ||
          current.numberMember !== "" ||
          current.commissionDate !== "" ||
          current.amount !== ""
        ) {
          ambetterCommissClient.push(current);
        } else {
          ambetterCommissClientWrong.push(current);
        }
      }
      return [ambetterCommissClient, ambetterCommissClientWrong];
    } else {
      return "Invalid process that Ambetter Commission Statement File";
    }
  }
}