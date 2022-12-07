import fs from "fs";
import { Service } from "typedi";

import { SherpaBobDto } from "../DTO/SherpaClientDTO";
import { SherpaMapp } from "../validates/sherpa/sherpaMapping";

@Service()
export class SherpaParse {
  constructor(private sherpaMapp: SherpaMapp) {}

  readFile(file:File): string[][] | string {
    try {
      const files = fs
        .readFileSync("data/Health_Sherpa_BOB.csv", { encoding: "utf8" })
        .split("\n")
        .map((row: string): string[] => {
          return row.split(",");
        });
      console.log(files);
      return files;
    } catch (error) {
      return "Problem with read file Sherpa Book of Business: " + error;
    }
  }

   parse(file:File): object | string {
    const sherpaClient: SherpaBobDto[] = [];
    const files = this.readFile(file);
    const sherpaClientWrong: SherpaBobDto[] = [];

    if(typeof files !== "string"){
    for (let i = 1; i < files.length; i++) {
      const sherpa = { ffm_subscriberID: files[i][40] };
      const current = this.sherpaMapp.stringToDTO(sherpa);

      if (current.ffm_subscriberID !== "" ) {
        sherpaClient.push(current);
      } else {
        sherpaClientWrong.push(current);
      }
    }
    return {sherpaClient,sherpaClientWrong};
  }else {return files}
  }
}
