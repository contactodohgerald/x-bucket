import { Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import services from "../services/service";
import Users from "../database/model/users.model";
import { IGetUserAuthInfoRequest } from './../types/request';

class UserController {

   

}

const users = new UserController()
export default users