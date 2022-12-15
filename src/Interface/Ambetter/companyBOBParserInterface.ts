import { CompanyClientDTO } from "../../DTO/companyClientDTO.ts";

export interface CompanyBobParserInterface {
  parse(file:Array<object>):object ;
  commissionAsignate():string
}
