import { Service } from "typedi";
import { Logger } from "winston";
import { SherpaParse } from "../parser/sherpaParser";

@Service()
export class FileRepository{
    constructor(private sherpaParser:SherpaParse){}

     async getFile(){
        const parse = this.sherpaParser.parse("test")
        
        return parse;
    }
}