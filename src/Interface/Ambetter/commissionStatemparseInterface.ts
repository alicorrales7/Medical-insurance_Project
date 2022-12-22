export interface CommissionStatemInterface {
  readFile(filePath: string): string[][] | string;
  parse(file: object): object | string;
}
