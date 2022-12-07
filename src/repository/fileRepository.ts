import { Service } from "typedi";
import { Logger } from "winston";
import fs from "fs";


import { AmbetterBobParse } from "../parser/Ambetter/AmbetterBobParse";
import { SherpaParse } from "../parser/sherpaParser";
import { AmbetterCommParser } from "../parser/Ambetter/AmbetterCommParse";

@Service()
export class FileRepository {
  constructor(
    private sherpaParser: SherpaParse,
    private ambetterPaser: AmbetterBobParse,
    private ambetterCommParser: AmbetterCommParser
  ) {}

  async postSherpa(file:File) {
    const parse = await this.sherpaParser.parse(file);
    return parse;
  }

  async postAmbetterBOB(file:File){
    const parse = await this.ambetterPaser.parse(file);
    return parse;
  }

  async postAmbetterCommiss(file:File){
    const parse = await this.ambetterCommParser.parse();
    return parse;
  }   
}