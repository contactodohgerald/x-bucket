import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import defaults from '../config/default';
import { IDecode } from "../types/interface/user.decode";

interface RequestWithUserRole extends Request {
    user?: IDecode;
}

const verifyLoginToken = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(" ")[1];
  
    if (!token || token == null) return res.status(401).json({message: 'Login to continue' })
  
    jwt.verify(token, defaults.jwt_secret(), (err: any, user: any) => {
        if (err instanceof jwt.TokenExpiredError) return res.status(401).json({message: 'Unauthorized! Access Token was expired!' })
        
        if (err instanceof jwt.JsonWebTokenError) return res.status(401).json({message: 'Unauthorized! Invalid Token!' })
        
        if (err) return res.status(401).json({message: 'Not Authenticated'})
        
        req.user = user;
    
        next()
    })
}

export default verifyLoginToken;

