import { Service } from "typedi";

@Service()
export class findReportCommiS {
  finalReport(commissionStatement: any) {
    const relations: any[] = [];
    const array = commissionStatement;

    //Return true if exist elemets repeat
    const valueArr = array.map(function (item) {
      return item.policyNumber;
    });
    const isDuplicate = valueArr.some(function (item, idx) {
      return valueArr.indexOf(item) != idx;
    });

    function getOccurrence(array, element) {
      const filt = array.filter((v) => v.policyNumber === element).length;
      return filt;
    }

    if (isDuplicate) {
      const uniq = array
        .map((numbe) => {
          return {
            count: 1,
            numbe: numbe.policyNumber,
          };
        })
        .reduce((result, b) => {
          result[b.numbe] = (result[b.numbe] || 0) + b.count;
          return result;
        }, {});

      const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);

      duplicates.forEach((element) => {
        relations.push({
          policyNumber: element,
          cont: getOccurrence(array, element),
        });
      });
      return relations;
    } else {
      return [{}];
    }
  }

  dateResponse(commissionStatementArray: any) {
    const contRepeat = this.finalReport(commissionStatementArray);

    const clientsCommon = commissionStatementArray.filter((e) => {
      return contRepeat.some((item) => item.policyNumber === e.policyNumber);
    });

    return clientsCommon;
  }
}
