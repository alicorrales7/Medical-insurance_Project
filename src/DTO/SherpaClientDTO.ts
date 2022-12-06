import { Service } from "typedi";


@Service(  )
export class SherpaBobDto{
    ffm_subscriberID : string;

    constructor( ffm_subscriberID:string){
        this.ffm_subscriberID = ffm_subscriberID;
    }
}