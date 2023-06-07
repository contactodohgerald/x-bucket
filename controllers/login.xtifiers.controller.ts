import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

import services from "../services/service";
import Users from "../database/model/users.model";
import defaults from "../config/default";

class LoginXtifierController {

    store = asyncHandler( async(req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            xtifier: 'required|string|min:3',
            password: 'required|string|min:3',
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const { xtifier, password } = body;

        const new_xtifier = services.formatInput(xtifier)
        
        const xtifierExists = await Users.findOne({ xtifier: new_xtifier })
        if (!xtifierExists) return res.status(400).json({status: false, message: "Xtifier does not exist, please check and try again"}) 

        const checkPassword = await bcrypt.compare(password, xtifierExists.password);
        if(!checkPassword) return res.status(400).json({status: false, message: "Incorrect password"});

        const site_details: any = await services.getSiteDetails()
        if(!xtifierExists.status) return res.status(400).json({status: false, message: `Your account is on hold or suspended from using this service. Please contact @ ${site_details ? site_details.email : ''} for futher clarification`}) 

        const payload = {uuid: xtifierExists._id, xtifier: xtifierExists.xtifier, ipAddress: xtifierExists.ip_address}
        const token = jwt.sign(
            payload, defaults.jwt_secret(), {expiresIn: defaults.jwt_expires()}
        );
        
        const data = {
            ...payload, token, 
        }
        return res.status(200).json({status: true, message: "Login was successful", data})

    })

}

const login = new LoginXtifierController()
export default login