import { Service } from "typedi";

import { SherpaBobDto } from "../../DTO/SherpaClientDTO";

@Service()
export class SherpaMapp {
  stringToDTO(t: SherpaBobDto): SherpaBobDto {
    const sherpa: SherpaBobDto = {
      ffm_subscriber_id: t.ffm_subscriber_id,
      name: t.name,
      transformerID: this.convert(t.transformerID),
    };
    const returnDTO = new SherpaBobDto(sherpa);
    return returnDTO;
  }

  convert(transformerID: string) {
    return transformerID?.slice(-7);
  }
}
