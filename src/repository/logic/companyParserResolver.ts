import { config } from "../../util/config";
import { Service } from "typedi";
import { parse } from "path";

@Service()
export class  CompanyParserResolver{

    constructor(config:string){}

    resolve(companyId:string){

        let companyBOB:string = "";
        let companyCS:string = "";
        for (let index = 0; index < config.length; index++) {
            const element = config[index];
            if(config[index].name === companyId){
                companyBOB = config[index].parseBOB;
                
                break;
            }
        }
        return companyBOB; 
    
}
    }