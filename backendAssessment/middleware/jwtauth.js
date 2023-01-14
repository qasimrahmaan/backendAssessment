"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    var _a;
    const jwtHeader = req.get('Authorization');
    if (!jwtHeader) {
        res.status(401).json({ error: "Not Authenticated" });
    }
    const token = (_a = req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, 'secretKey');
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
    if (!decodedToken) {
        res.status(401).json({ error: "Not Authenticated" });
    }
    next();
};
