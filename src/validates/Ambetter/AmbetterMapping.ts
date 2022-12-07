import { Service } from "typedi";

import { CompanyClientDTO } from "../../DTO/companyClientDTO.ts";

@Service()
export class AmbetterMapp {
  stringToDTO(t: CompanyClientDTO): CompanyClientDTO {
    const comp = {
      exchangeSubscriberID: t.exchangeSubscriberID,
      policyNumber: t.policyNumber,
    };

    const returnDTO = new CompanyClientDTO(comp);
    return returnDTO;
  }
}
