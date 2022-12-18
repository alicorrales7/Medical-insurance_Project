export class CompanyClientDTO {
  exchangeSubscriberID: string;
  name: string;
  policyNumber: string;
  transformerID: string;

  constructor(company: CompanyClientDTO) {
    this.exchangeSubscriberID = company.exchangeSubscriberID;
    this.name = company.name;
    this.policyNumber = company.policyNumber;
    this.transformerID = company.transformerID;
  }
}
