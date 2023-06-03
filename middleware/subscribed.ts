import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/request";
import Users from "../database/model/users.model";


const userIsSubscribed = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
 
    const user = await Users.findOne({xtifier: req.user?.xtifier});

    if(user?.is_subscribed) {
        next()
    }else{
        return res.status(503).json({status: false, mesaage: 'You are not subscribed'})
    }
  
}

export default userIsSubscribed