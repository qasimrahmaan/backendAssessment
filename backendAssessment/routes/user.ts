import { Router } from "express";

import { body } from 'express-validator/check'
import UserSchema from '../models/user'
import {register, login, getUser} from '../controllers/user';
import AuthJWT from '../middleware/jwtauth'


const router = Router();



router.post('/register',[
  body('email')
    .isEmail()
    .withMessage('Enter a valid email!')
    .custom((value, {req}) => {
      return UserSchema.findOne({email: value})
          .then((userData) => {
            if(userData){
              return Promise.reject("User Already Exists!");
            }
      })
    })
    .normalizeEmail(),
    body('password').trim().isLength({min:5}),
], register);

router.post('/login', login)

router.get('/user',AuthJWT, getUser)

export default router;