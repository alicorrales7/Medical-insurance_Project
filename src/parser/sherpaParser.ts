import fs from "fs";
import { Service } from "typedi";

import { SherpaBobDto } from "../DTO/SherpaClientDTO";
import { SherpaMapp } from "../validates/sherpa/sherpaMapping";

@Service()
export class SherpaParse {
  constructor(private sherpaMapp: SherpaMapp) {}

  private readFile(filePath: string): string[][] | string | any {
    try {
      const files = fs
        .readFileSync(filePath, { encoding: "utf8" })
        .split("\n")
        .map((row: string): string[] => {
          return row.split(",");
        });
      return files;
    } catch (error) {
      return "Problem with read file Sherpa Book of Business: " + error;
    }
  }

  parse(file: Array<object>): object {
    const filePath = JSON.parse(JSON.stringify(file[0]));
    const sherpaClient: SherpaBobDto[] = [];
    const sherpaClientWrong: SherpaBobDto[] = [];
    const files = this.readFile(filePath.path);

    if (typeof files !== "string") {
      for (let i = 1; i < files.length; i++) {
        const sherpa = {
          ffm_subscriber_id: files[i][41],
          transformerID: files[i][41],
        };
        const current = this.sherpaMapp.stringToDTO(sherpa);

        if (current.transformerID !== "") {
          sherpaClient.push(current);
        } else {
          sherpaClientWrong.push(current);
        }
      }
      const report = { good: sherpaClient, bad: sherpaClientWrong };
      return report;
    } else {
      throw "new Exception";
    }
  }
}
