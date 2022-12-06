import { SherpaBobDto } from "../DTO/SherpaClientDTO";
import fs from "fs";
import { SherpaMapp } from "../validates/sherpa/sherpaMapping";
import { Service } from "typedi";
import Validator from "../validates/sherpa/validatorSherpaParser";

@Service()
export class SherpaParse {
    constructor(private sherpaMapp: SherpaMapp, private validator: Validator){}

    readFile(file:any): string[][]|string
    {
       try{ 
        const files = fs.readFileSync("data/Health_Sherpa_BOB.csv", {encoding: "utf8"})
        .split('\n')
        .map((row:string) :string[] => {
            return row.split(',')});
            console.log(typeof files)
            return files;
        }catch(error){
            return "Problem with read file SherpaParse: " + error
        }
        

    }

     async parse(file:any):Promise<SherpaBobDto[]>{
        const sherpaClient:SherpaBobDto[]= [];
        const files = this.readFile("jh");

            for(let i=1; i<files.length; i++) {
                const current = this.sherpaMapp.stringToDTO(files[i][40]);
                
                let isValid =  await this.validator.validatorS(current)
                if(isValid === true){
                    sherpaClient.push(current)
                }
                
                
            }
            return sherpaClient;
    }

    

    

}
