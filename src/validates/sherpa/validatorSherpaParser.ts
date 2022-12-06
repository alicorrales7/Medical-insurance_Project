import { IsBoolean, IsNotEmpty, validateOrReject } from "class-validator";
import { Service } from "typedi";
import { SherpaBobDto } from "../../DTO/SherpaClientDTO";

@Service()
export default class Validator{
    @IsNotEmpty()
    ffm_subscriberID: string;

    constructor(obj:string){
        this.ffm_subscriberID= obj
    }

    async validatorS(instance: SherpaBobDto){
        try{
            await validateOrReject(instance);
            return true;
        }catch(error){
            return {error}
        }
        
    }
}