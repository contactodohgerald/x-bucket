import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import SiteDetail from "../model/sitedetails.model";

class SiteDetailsController {

    store = asyncHandler( async(req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            email: 'required|string',
            env: 'required|string',
            address: 'required|string',
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const { email, env, address, logo_url, twitter, instagram } = body;
        
        const siteExists = await SiteDetail.findOne()
        if (siteExists){
            siteExists.email = email
            siteExists.env = env
            siteExists.address = address
            siteExists.logo_url = logo_url
            siteExists.twitter = twitter
            siteExists.instagram = instagram
            await siteExists.save()

            return res.status(200).json({status: true, message: "SiteDetail updated successfully", data: siteExists})
        }else{

            const storeSiteDetails = await SiteDetail.create({
                email, env, address, logo_url, twitter, instagram
            })

            return res.status(201).json({status: true, message: "SiteDetail created successfully", data: storeSiteDetails})
        } 

    })

}

const siteDetails = new SiteDetailsController()
export default siteDetails