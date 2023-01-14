"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.login = exports.register = void 0;
const check_1 = require("express-validator/check");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
//import { User } from '../interfaces/user'
const register = async (req, res, next) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ error: errors });
    }
    try {
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const user = new user_1.default({ email, password: hashedPassword });
        const result = await user.save();
        res.status(201).json({ user: { id: result._id, email: result.email } });
    }
    catch (err) {
        console.log("error", err);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let fetchedUser;
    try {
        fetchedUser = await user_1.default.findOne({ email });
        if (!fetchedUser) {
            res.status(401).json({ error: "Not Authenticated" });
        }
        const isEqual = bcryptjs_1.default.compare(password, fetchedUser.password);
        if (!isEqual) {
            res.status(401).json({ error: "Wrong Password" });
        }
        const token = jsonwebtoken_1.default.sign({
            email: fetchedUser.email,
            userId: fetchedUser._id.toString()
        }, "secretKey", { expiresIn: '1h' });
        res.status(200).json({ jwt: token });
    }
    catch (err) {
        console.log(err);
    }
};
exports.login = login;
const getUser = async (req, res, next) => {
    const email = req.body.email;
    try {
        const result = await user_1.default.findOne({ email });
        res.json({ user: { id: result._id, email: result.email } });
    }
    catch (err) {
        console.log(err);
    }
};
exports.getUser = getUser;
