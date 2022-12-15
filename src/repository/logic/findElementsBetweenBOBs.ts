
import { Service } from "typedi";

@Service()
export class findElementsBetweenBOBs{
    constructor(){}

    analysisBetweenBOB(sherpaArray:any, BOBarray:any, ){
        const companyBOBgoodClient = BOBarray.good;
        const companyBOBbadClient = BOBarray.bad;

        const  sherpaBOBgood = sherpaArray.good;
        const sherpaBOBbad = sherpaArray.bad;
        
        //This code get the elements common between Sherpa and Company BOB
        let commonElementsBetweenSherpaCompany  =  companyBOBgoodClient.filter(e => {
            return sherpaBOBgood.some(item => item.transformerID === e.transformerID);
         });
         //string.includes(substring)
         //This code get the elemets that only exist in Sherpa
         let elementsOnlySherpa  =  sherpaBOBgood.filter(e => {
            return !companyBOBgoodClient.some(item => item.transformerID === e.transformerID);
         });  
         
         let elementsOnlyCompanyBOB  =  companyBOBgoodClient.filter(e => {
            return !sherpaBOBgood.some(item => item.transformerID === e.transformerID);
         }); 

         let elementsWithOutPolicyNumber = commonElementsBetweenSherpaCompany.filter(e => {e.policyNumber === undefined})

         
         return [commonElementsBetweenSherpaCompany,elementsOnlySherpa,elementsOnlyCompanyBOB,elementsWithOutPolicyNumber]
    }

}