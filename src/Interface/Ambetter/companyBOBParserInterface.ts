export interface CompanyBobParserInterface {
  parse(file: Array<object>): object | string;
  commissionAsignate(): string;
}
