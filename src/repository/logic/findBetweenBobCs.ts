import { Service } from "typedi";

@Service()
export class findBetweenBobCs {
  analysisBetweenBobCs(CommiStatemArray: any, commonMach: any) {
    //Good case
    const clientsCommon = CommiStatemArray.filter((e) => {
      return commonMach.some((item) => item.policyNumber === e.policyNumber);
    });

    const clientsOnlyCS = CommiStatemArray.filter((e) => {
      return !commonMach.some((item) => item.policyNumber === e.policyNumber);
    });

    const clientsOnlyBOBCommon = commonMach.filter((e) => {
      return !CommiStatemArray.some(
        (item) => item.policyNumber === e.policyNumber
      );
    });

    clientsCommon.forEach((element) => {
      element.ifPay = true;
    });
    return [clientsCommon, clientsOnlyCS, clientsOnlyBOBCommon];
  }
}
