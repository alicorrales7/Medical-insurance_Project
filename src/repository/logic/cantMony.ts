import { Service } from "typedi";

@Service()
export class countMony {
  count(commissionStatement: any) {
    let total = 0;

    try {
      commissionStatement.forEach((element) => {
        if (element.amount !== undefined) {
          total += element.amount * 1;
        }
      });
      return total;
    } catch (error) {
      throw new Error("Not cant calculate the total amount");
    }
  }
}
