import { CommissionStatemDTO } from "../DTO/commissionStatemClientDTO";

export interface CommissionStatemInterface {
  readFile(file: File): string[][] | string;
  parse(file: File): CommissionStatemDTO[];
}
