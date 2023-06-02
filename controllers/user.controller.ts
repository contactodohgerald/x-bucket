import { Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import services from "../services/service";
import Users from "../database/model/users.model";
import { IGetUserAuthInfoRequest } from './../types/request';

class UserController {

    updateAvatar = asyncHandler( async(req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            avatar: 'required|string|min:3'
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const user = await Users.findOne({xtifier: req.user?.xtifier});
        if(!user) return res.status(503).json({status: false, mesaage: 'User not found'})

        const { avatar } = body;

        user.avatar = avatar;
        await user.save();

        return res.status(200).json({status: true, message: 'Avatar updated', data: user})

    })

    getLoggedInUser = asyncHandler( async(req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {

        const user = await Users.findOne({xtifier: req.user?.xtifier});
        if(!user) return res.status(503).json({status: false, mesaage: 'User not found'})

        return res.status(200).json({status: true, message: 'User returned successfully', data: user})

    })

}

const users = new UserController()
export default users