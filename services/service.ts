import SiteDetail from "../database/model/sitedetails.model"


class Services {

    formatInput (input: string): string {
        return input.toLowerCase()
    }

    async getSiteDetails () {
        return await SiteDetail.findOne()
    }

    countOccurrences(stringList: string[], targetString: string): number {
        let count = 0;
        for (const str of stringList) {
          const regex = new RegExp(str, 'gi');
          const matches = targetString.match(regex);
          count += matches ? matches.length : 0;
        }
        return count;
      }      
    
}

const services = new Services()
export default services