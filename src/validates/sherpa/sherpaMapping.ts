import { Service } from "typedi";

import { SherpaBobDto } from "../../DTO/SherpaClientDTO";

@Service()
export class SherpaMapp {
  stringToDTO(t: SherpaBobDto): SherpaBobDto {
    const sherpa = { ffm_subscriberID: t.ffm_subscriberID };

    const returnDTO = new SherpaBobDto(sherpa);
    return returnDTO;
  }
}
