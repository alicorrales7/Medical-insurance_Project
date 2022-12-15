export class CompanyClientDTO {
  exchangeSubscriberID: string;
  transformerID:string;
  policyNumber: string;
  

  constructor(company: CompanyClientDTO) {
    this.exchangeSubscriberID = company.exchangeSubscriberID;
    this.policyNumber = company.policyNumber;
    this.transformerID = company.transformerID
    
  }

}
