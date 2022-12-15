export interface CompanyBobParserInterface {
  parse(file: Array<object>): object;
  commissionAsignate(): string;
}
