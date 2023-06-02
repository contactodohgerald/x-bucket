import { Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import services from "../services/service";
import { IGetUserAuthInfoRequest } from './../types/request';
import openai from "../services/openai";

class ProccessController {
    coreFunctionHanlder = asyncHandler( async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            address: 'required|string|min:3'
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const { address } = body

        const data = {
            search_text: address,
        }

        const response = await openai.geocodeAddress(data)

        return res.status(200).json({status: true, message: 'testing', data: response})

    })

}

const proccess = new ProccessController()
export default proccess