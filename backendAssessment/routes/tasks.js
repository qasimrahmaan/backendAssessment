"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_1 = require("../controllers/tasks");
const jwtauth_1 = __importDefault(require("../middleware/jwtauth"));
const router = express_1.Router();
router.get('/list-tasks', jwtauth_1.default, tasks_1.listTasks);
router.post('/create-tasks', jwtauth_1.default, tasks_1.createTasks);
exports.default = router;
