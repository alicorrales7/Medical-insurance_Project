export class SherpaBobDto {
  ffm_subscriber_id: string;
  transformerID: string;

  constructor(t: SherpaBobDto) {
    this.ffm_subscriber_id = t.ffm_subscriber_id;
    this.transformerID = t.transformerID;
  }
}
