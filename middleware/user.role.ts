import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/request";
import Users from "../database/model/users.model";


const userRoles = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
 
    const user = await Users.findOne({xtifier: req.user?.xtifier});

    if(user?.user_type == 'user') {
        return res.status(503).json({status: false, mesaage: 'User not allowed to perform action'})
    }else{
        next()
    }
  
}

export default userRoles