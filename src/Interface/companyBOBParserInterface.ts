import { CompanyClientDTO } from "../DTO/companyClientDTO.ts";

export interface CompanyBobParserInterface {
  readFile(file: File): string[][] | string;
  parse(file: File): CompanyClientDTO[] | string;
}
