import { Service } from "typedi";

@Service()
export class findBetweenBobCs{

    analysisBetweenBobCs(CommiStatemArray:any, commonMach:any){
        
        //Good case
        let clientsCommon  =  CommiStatemArray.filter(e => {
            return commonMach.some(item => item.policyNumber === e.policyNumber);
         });

        let clientsOnlyCS = CommiStatemArray.filter(e => {
            return !commonMach.some(item => item.policyNumber === e.policyNumber);
         });

        let clientsOnlyBOBCommon =  commonMach.filter(e => {
            return !CommiStatemArray.some(item => item.policyNumber === e.policyNumber);
         });

        
        return [clientsCommon,clientsOnlyCS, clientsOnlyBOBCommon]
     }
}