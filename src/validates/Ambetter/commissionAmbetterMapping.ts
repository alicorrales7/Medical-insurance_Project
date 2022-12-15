import { Service } from "typedi";

import { CommissionStatemDTO } from "../../DTO/commissionStatemClientDTO";

@Service()
export class CommissionAmbetterMapp {
  stringToDTO(t: CommissionStatemDTO): CommissionStatemDTO {
    const comm = {
      policyNumber: this.consvertOriginal(t.policyNumber),
      name: t.name,
      numberMember: t.numberMember,
      commissionDate: t.commissionDate,
      amount: t.amount,
      ifPay: t.ifPay,
    };

    const returnDTO = new CommissionStatemDTO(comm);
    return returnDTO;
  }

  consvertOriginal(exchangeSubscriberID: string) {
    const final = exchangeSubscriberID?.slice(0, -1);
    return final;
  }
}
