import SiteDetail from "../database/model/sitedetails.model"


class Services {

    formatInput (input: string): string {
        return input.toLowerCase()
    }

    async getSiteDetails () {
        return await SiteDetail.findOne()
    }
}

const services = new Services()
export default services