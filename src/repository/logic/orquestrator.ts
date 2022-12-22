import { Container, Service } from "typedi";

import { CommissionStatemInterface } from "../../Interface/Ambetter/commissionStatemparseInterface";
import { CompanyBobParserInterface } from "../../Interface/Ambetter/companyBOBParserInterface";
import { AmbetterBobParse } from "../../parser/Ambetter/AmbetterBobParse";
import { AmbetterCommParser } from "../../parser/Ambetter/AmbetterCommParse";
import { SherpaParse } from "../../parser/sherpaParser";
import { countMony } from "./cantMony";
import { CompanyParserResolver } from "./companyParserResolver";
import { findBetweenBobCs } from "./findBetweenBobCs";
import { findElementsBetweenBOBs } from "./findElementsBetweenBOBs";
import { findReportCommiS } from "./findReportCommiS";

@Service()
export class Orquestrator {
  commssionStatement: CommissionStatemInterface;

  constructor(
    private companyBOBParserResolver: CompanyParserResolver,
    private sherpaParser: SherpaParse,
    private findElementsComm: findElementsBetweenBOBs,
    private findBetweenBobCs: findBetweenBobCs,
    private findReportCommiS: findReportCommiS,
    private countMony: countMony
  ) {}

  index(
    SherpaBobFIle: Array<object>,
    companyBOBFile: Array<object>,
    companyComm: Array<object>,
    nameCompany: string
  ) {
    //This is the the code that send file to SherpaParse and get both Arrays wit good and bad Clients
    const sherpaArray = this.sherpaParser.parse(SherpaBobFIle);
    if (typeof sherpaArray === "string") {
      return { sherpaArray };
    }
    //This is the the code that send file to companyBOB and get both Arrays wit good and bad Clients
    // with the adapter of CompanyBOB
    const parserid = this.companyBOBParserResolver.resolve(nameCompany);
    const companyBOBParser: CompanyBobParserInterface =
      Container.get(AmbetterBobParse); // parserid
    const companyBobArray = companyBOBParser.parse(companyBOBFile);
    if (typeof companyBobArray === "string") {
      return { companyBobArray };
    }

    const comm = companyBOBParser.commissionAsignate();
    const CommissionSParser: CommissionStatemInterface =
      Container.get(AmbetterCommParser); //comm
    //separar las informaciones de la variable en buenas y malas
    const companyCStArray = CommissionSParser.parse(companyComm);
    if (typeof companyCStArray === "string") {
      return { companyCStArray };
    }

    //[commonElementsBetweenSherpaCompany,elementsOnlySherpa,elementsOnlyCompanyBOB, elementsWithOutPolicyNumber]
    const informBetweenBOBs = this.findElementsComm.analysisBetweenBOB(
      sherpaArray,
      companyBobArray
    );

    //[clientsCommon,clientsOnlyCS, clientsOnlyBOBCommon]
    const informBetweenBobCs = this.findBetweenBobCs.analysisBetweenBobCs(
      companyCStArray[0],
      informBetweenBOBs[0]
    );

    //return clients that have more than one present Commission Statem
    const findElementsRepeatDate = this.findReportCommiS.dateResponse(
      informBetweenBobCs[0]
    );

    const commonElementsBetweenSherpaCompany = informBetweenBOBs[0];
    const elementsOnlySherpa = informBetweenBOBs[1];
    const elementsOnlyCompanyBOB = informBetweenBOBs[2];
    const elementsWithOutPolicyNumber = informBetweenBOBs[3];
    const informClientsCSgood = informBetweenBobCs[0];
    const clientsOnlyCS = informBetweenBobCs[1];
    const clientsOnlyBOBCommon = informBetweenBobCs[2];

    const cantMony = this.countMony.count(informClientsCSgood);

    return { companyBobArray, cantMony, elementsOnlySherpa, elementsOnlyCompanyBOB, clientsOnlyCS, informClientsCSgood, findElementsRepeatDate  };
  }
}
