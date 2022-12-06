import { CompanyClientDTO } from "../DTO/companyClientDTO.ts"

export interface CompanyBobParserInterface{
    parse(file:any): CompanyClientDTO[]
    validate(file:any): boolean
}