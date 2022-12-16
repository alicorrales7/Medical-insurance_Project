import { Service } from "typedi";

@Service()
export class countMony {
  count(commissionStatement: any) {
    let total = 10;

    commissionStatement.forEach((element) => {
      if (element.amount !== undefined) {
        total += element.amount * 1;
      }
    });

    return total;
  }
}
