import { NextFunction,Request,Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "./pass";

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string; // or number depending on your app
  }
}

export const UserMiddleware = (req:Request,res:Response,next:NextFunction) =>{
    const header = req.headers["authorization"]
    const decoded = jwt.verify(header as string,secret) as JwtPayload;
    if(decoded) {
      req.userId = decoded.id
      next()
    }else{
      res.status(403).json({
        "message" : "You are not logged in"
      })
    }
}