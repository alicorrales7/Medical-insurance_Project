import { Service } from "typedi";

import { CompanyClientDTO } from "../../DTO/companyClientDTO.ts";

@Service()
export class AmbetterMapp {
  stringToDTO(t: CompanyClientDTO): CompanyClientDTO {
    const comp = {
      exchangeSubscriberID: this.consvertOriginal(t.exchangeSubscriberID),
      name: t.name,
      policyNumber: t.policyNumber,
      transformerID: this.convert(t.exchangeSubscriberID),
    };
    const returnDTO = new CompanyClientDTO(comp);
    return returnDTO;
  }

  consvertOriginal(exchangeSubscriberID: string) {
    const final = exchangeSubscriberID?.slice(1, -1);
    return final;
  }

  convert(transformerID: string) {
    return transformerID?.slice(-8, -1);
  }
}
