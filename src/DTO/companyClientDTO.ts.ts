export class CompanyClientDTO {
  exchangeSubscriberID: string;
  policyNumber: string;

  constructor(company: CompanyClientDTO) {
    this.exchangeSubscriberID = company.exchangeSubscriberID;
    this.policyNumber = company.policyNumber;
  }
}
