import { Service, Container } from "typedi";

import { CommissionStatemInterface } from "../../Interface/Ambetter/commissionStatemparseInterface";
import { CompanyBobParserInterface } from "../../Interface/Ambetter/companyBOBParserInterface";
import { SherpaParse } from "../../parser/sherpaParser";
import { CompanyParserResolver } from "./companyParserResolver";
import { AmbetterBobParse } from "../../parser/Ambetter/AmbetterBobParse";
import { AmbetterCommParser } from "../../parser/Ambetter/AmbetterCommParse";
import { findElementsBetweenBOBs } from "./findElementsBetweenBOBs";
import { findBetweenBobCs} from "./findBetweenBobCs"
import { findReportCommiS } from "./findReportCommiS";



@Service()
export class Orquestrator{
    commssionStatement: CommissionStatemInterface;

    constructor( private companyBOBParserResolver: CompanyParserResolver, private sherpaParser: SherpaParse, 
      private findElementsComm: findElementsBetweenBOBs, private findBetweenBobCs: findBetweenBobCs,
      private findReportCommiS: findReportCommiS ) {}

    index(SherpaBobFIle:Array<object>,
        companyBOBFile: Array<object>,
        companyComm: Array<object>,
        nameCompany: string
        ){
          //This is the the code that send file to SherpaParse and get both Arrays wit good and bad Clients  
          const sherpaArray = this.sherpaParser.parse(SherpaBobFIle)


          //This is the the code that send file to companyBOB and get both Arrays wit good and bad Clients
          // with the adapter of CompanyBOB
          const parserid = this.companyBOBParserResolver.resolve(nameCompany)
          const companyBOBParser: CompanyBobParserInterface = Container.get(AmbetterBobParse)// parserid
          const companyBobArray = companyBOBParser.parse(companyBOBFile)


          const comm = companyBOBParser.commissionAsignate()
          const CommissionSParser: CommissionStatemInterface = Container.get(AmbetterCommParser) //comm
          //separar las informaciones de la variable en buenas y malas
          const companyCStArray = CommissionSParser.parse(companyComm)



          //[commonElementsBetweenSherpaCompany,elementsOnlySherpa,elementsOnlyCompanyBOB, elementsWithOutPolicyNumber]
          const informBetweenBOBs = this.findElementsComm.analysisBetweenBOB(sherpaArray,companyBobArray)

          //[clientsCommon,clientsOnlyCS, clientsOnlyBOBCommon]
          const informBetweenBobCs = this.findBetweenBobCs.analysisBetweenBobCs(companyCStArray[0],informBetweenBOBs[0])
          const informClientsCSgood = informBetweenBobCs[0]

          //return clients that have more than one present Commission Statem
          const findReportCommiS = this.findReportCommiS.dateResponse(companyCStArray[0])

          //const cantMony = 


          return {informClientsCSgood, findReportCommiS};
          }
     
          

  }
        //const companyBOBFileConverter = JSON.parse(JSON.stringify(companyBOBFile[0])) 

7