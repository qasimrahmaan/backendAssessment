import {RequestHandler ,Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator/check';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserSchema from '../models/user';
//import { User } from '../interfaces/user'


export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(422).json({error: errors})
  }
  try{
    const email = (req.body as {email: string}).email
    const password = (req.body as {password: string}).password
    const hashedPassword = await bcrypt.hash(password,12);
    const user = new UserSchema({email, password: hashedPassword});
    const result = await user.save();
    res.status(201).json({user: {id: result._id, email: result.email}})
  }catch(err){
    console.log("error",err)
  }
  
}

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const email = (req.body as {email: string}).email;
  const password = (req.body as {password: string}).password;
  let fetchedUser : any;
  try{
    fetchedUser = await UserSchema.findOne({email});
    if(!fetchedUser){
      res.status(401).json({error: "Not Authenticated"});
    }
    const isEqual: Promise<boolean> = bcrypt.compare(password, fetchedUser.password);
    if(!isEqual){
      res.status(401).json({error: "Wrong Password"});
    }
    const token = jwt.sign(
      { 
        email: fetchedUser.email, 
        userId: fetchedUser._id.toString()
      },
      "secretKey",
      {expiresIn: '1h'});
      res.status(200).json({jwt: token})
  }catch(err){
    console.log(err);
  }
}

export const getUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const email = (req.body as {email: string}).email;
  try{
    const result : any = await UserSchema.findOne({email});
    res.json({user: {id: result._id, email: result.email}})
  } catch(err){
    console.log(err);
  }
}