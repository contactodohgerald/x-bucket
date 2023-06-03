import { Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import { IGetUserAuthInfoRequest } from '../types/request';
import Users from "../database/model/users.model";
import flutterwave from "../services/flutterwave";
import Subscription from "../database/model/subscription.model";

class SubscriptionController {

    subscribeUser = asyncHandler( async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            trans_id: 'required|string',
            amount: 'required|integer'
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const user = await Users.findOne({xtifier: req.user?.xtifier});

        const { trans_id, amount } = body

        const subscribeExist = await Subscription.findOne({ userId: user?._id, status: true})
        if(subscribeExist) return res.status(500).json({status: false, message: "You subscription is ongoing"})

        const response = await flutterwave.verifyPayment(trans_id)
        if(response.data.status == "successful" && response.data.amount >= amount){

            await Subscription.create({
                userId: user?._id,
                amount: response.data.amount,
                trans_ref: trans_id,
                tx_ref: response.data.tx_ref,
                status: true
            })
            const n_user = await Users.findOneAndUpdate({_id: user?._id}, {is_subscribed: true})

            return res.status(200).json({status: true, message: 'Request was successfull', data: n_user}) 

        }else{
            return res.status(500).json({status: false, message: 'Request could not be comepleted, try again later'})
        }
    })

}

const subscription = new SubscriptionController()
export default subscription