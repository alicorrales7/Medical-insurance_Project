export class CommissionStatemDTO {
  policyNumber: string;
  name: string;
  numberMember: string;
  commissionDate: string;
  amount: string;
  ifPay: boolean;

  constructor(comm: CommissionStatemDTO) {
    this.policyNumber = comm.policyNumber;
    this.name = comm.name;
    this.numberMember = comm.numberMember;
    this.commissionDate = comm.commissionDate;
    this.amount = comm.amount;
    this.ifPay = comm.ifPay;
  }
}
