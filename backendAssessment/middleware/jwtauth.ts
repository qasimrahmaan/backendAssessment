import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const jwtHeader = req.get('Authorization');
  if(!jwtHeader){
    res.status(401).json({error: "Not Authenticated"})
  }
  const token : any = req.get('Authorization')?.split(' ')[1];
  let decodedToken;
  try{
    decodedToken = jwt.verify(token, 'secretKey')
  }catch(err){
    res.status(500).json({error: err})
  }
  if(!decodedToken){
    res.status(401).json({error: "Not Authenticated"})
  }
  next();
}