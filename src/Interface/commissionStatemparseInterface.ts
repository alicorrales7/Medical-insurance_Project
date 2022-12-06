import { CommissionStatemDTO } from "../DTO/commissionStatemClientDTO"


export interface CommissionStatemInterface{
    parse(file:any): CommissionStatemDTO []
}