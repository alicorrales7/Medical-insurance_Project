export interface CommissionStatemInterface {
  readFile(): string[][] | string;
  parse(file: object): object | string;
}
