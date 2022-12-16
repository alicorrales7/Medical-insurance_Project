import { Service } from "typedi";

@Service()
export class findElementsBetweenBOBs {
  analysisBetweenBOB(sherpaArray: any, BOBarray: any) {
    const companyBOBgoodClient = BOBarray.good;
    const companyBOBbadClient = BOBarray.bad;

    const sherpaBOBgood = sherpaArray.good;
    const sherpaBOBbad = sherpaArray.bad;

    //This code get the elements common between Sherpa and Company BOB
    const commonElementsBetweenSherpaCompany = companyBOBgoodClient.filter(
      (e) => {
        return sherpaBOBgood.some(
          (item) => item.transformerID === e.transformerID
        );
      }
    );
    //string.includes(substring)
    //This code get the elemets that only exist in Sherpa
    const elementsOnlySherpa = sherpaBOBgood.filter((e) => {
      return !companyBOBgoodClient.some(
        (item) => item.transformerID === e.transformerID
      );
    });

    const elementsOnlyCompanyBOB = companyBOBgoodClient.filter((e) => {
      return !sherpaBOBgood.some(
        (item) => item.transformerID === e.transformerID
      );
    });

    const elementsWithOutPolicyNumber =
      commonElementsBetweenSherpaCompany.filter((e) => {
        e.policyNumber === undefined;
      });

    return [
      commonElementsBetweenSherpaCompany,
      elementsOnlySherpa,
      elementsOnlyCompanyBOB,
      elementsWithOutPolicyNumber,
    ];
  }
}
