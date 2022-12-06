import { Service } from "typedi";
import { SherpaBobDto } from "../../DTO/SherpaClientDTO";

@Service()
export class SherpaMapp{

    stringToDTO(t:string):SherpaBobDto{
        let  ffm_subscriberID = t

        const returnDTO = new SherpaBobDto(ffm_subscriberID)
        return returnDTO;
    }
}