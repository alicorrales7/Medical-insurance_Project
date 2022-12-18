export class SherpaBobDto {
  ffm_subscriber_id: string;
  name: string;
  transformerID: string;
  

  constructor(t: SherpaBobDto) {
    this.ffm_subscriber_id = t.ffm_subscriber_id;
    this.name = t.name;
    this.transformerID = t.transformerID;
    
  }
}
