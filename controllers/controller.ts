import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';

import services from "../services/service";
import Newsletter from "../database/model/newsletter.model";
import Enquiry from "../database/model/enquiry.model";
import { IGetUserAuthInfoRequest } from "../types/request";
import Users from "../database/model/users.model";

class Controller {

    getLoggedInUser = asyncHandler( async(req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {

        const user = await Users.findOne({xtifier: req.user?.xtifier});
        if(!user) return res.status(503).json({status: false, mesaage: 'User not found'})

        return res.status(200).json({status: true, message: 'User returned successfully', data: user})

    })

    storeNewsletter = asyncHandler( async(req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            email: 'required|string',
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const { email } = body;

        const new_email = services.formatInput(email)
        
        const emailExists = await Newsletter.findOne({ email: new_email })
        if (emailExists) return res.status(400).json({status: false, message: "Email already exist, try a different email"}) 

        await Newsletter.create({
            email: new_email,
        })
        
        return res.status(201).json({status: true, message: "Email was successfully added to newsletter"})

    })
    getNewsletters = asyncHandler( async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
        const newsletters = await Newsletter.find()

        if(newsletters.length == 0) return res.status(403).json({status: false, message: "no newsletter was found", data: []})

        return res.status(200).json({status: true, message: "Newsletter was returned successfully", data: newsletters})
    })

    storeEnquiry = asyncHandler( async(req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            email: 'required|string',
            subject: 'required|string',
            message: 'required|string',
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const { name, email, subject, message } = body;

        await Enquiry.create({
            name: services.formatInput(name),
            email: services.formatInput(email),
            subject: subject,
            message: message
        })
        
        return res.status(201).json({status: true, message: "Enquiry was sent successfully"})

    })
    getAllEnquiry = asyncHandler( async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {

        const enquiries = await Enquiry.find()

        if(enquiries.length == 0) return res.status(403).json({status: false, message: "no enquiries was found", data: []})

        return res.status(200).json({status: true, message: "Enquiry was returned successfully", data: enquiries})

    })

}

const controller = new Controller()
export default controller