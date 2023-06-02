import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import services from "../services/service";
import Users from "../database/model/users.model";

class CreateXtifierController {

    store = asyncHandler( async(req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            xtifier: 'required|string|min:3',
            ip_address: 'required|string',
            country: 'required|string|min:3',
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const { xtifier, ip_address, country } = body;

        const new_xtifier = services.formatInput(xtifier)
        
        const xtifierExists = await Users.findOne({ xtifier: new_xtifier })
        if (xtifierExists) return res.status(400).json({status: false, message: "Xtifier already exists"}) 
        
        const site_details: any = await services.getSiteDetails()
        const ipAddressExists = await Users.findOne({ ip_address })
        if (ipAddressExists) return res.status(400).json({status: false, message: `Your device has already been registered with our service. If you believe this is an error or if you need assistance, please contact our support team @ ${site_details ? site_details.email : ''}`})

        const storeXitifier = await Users.create({
            xtifier: new_xtifier, 
            ip_address, 
            status: true, 
            avatar: 'xitifier-main.png',
            country: services.formatInput(country)
        })

        if (!storeXitifier) return res.status(500).json({status: false, message: 'Any error occured'})
        
        
        return res.status(201).json({status: true, message: "Xtifier created successfully", data: storeXitifier})

    })

}

const register = new CreateXtifierController()
export default register