import { CompanyClientDTO } from "../../DTO/companyClientDTO.ts";

export interface CompanyBobParserInterface {
  readFile(): string[][] | string;
  parse(file:File): object|string;
}
