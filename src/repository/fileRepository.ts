import { Service } from "typedi";
import { Logger } from "winston";

import { AmbetterBobParse } from "../parser/Ambetter/AmbetterBobParse";
import { SherpaParse } from "../parser/sherpaParser";

@Service()
export class FileRepository {
  constructor(
    private sherpaParser: SherpaParse,
    private ambetterPaser: AmbetterBobParse
  ) {}

  // async getFile() {
  //   const parse = await this.sherpaParser.parse();
  //   return parse;
  // }

  async getFile(){
      const parse = await this.ambetterPaser.parse();
      return parse;
  }
}
