"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_1 = require("express-validator/check");
const user_1 = __importDefault(require("../models/user"));
const user_2 = require("../controllers/user");
const jwtauth_1 = __importDefault(require("../middleware/jwtauth"));
const router = express_1.Router();
router.post('/register', [
    check_1.body('email')
        .isEmail()
        .withMessage('Enter a valid email!')
        .custom((value, { req }) => {
        return user_1.default.findOne({ email: value })
            .then((userData) => {
            if (userData) {
                return Promise.reject("User Already Exists!");
            }
        });
    })
        .normalizeEmail(),
    check_1.body('password').trim().isLength({ min: 5 }),
], user_2.register);
router.post('/login', user_2.login);
router.get('/user', jwtauth_1.default, user_2.getUser);
exports.default = router;
