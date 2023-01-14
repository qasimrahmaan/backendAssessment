"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTasks = exports.createTasks = void 0;
//import { Task } from '../interfaces/tasks'
const tasks_1 = __importDefault(require("../models/tasks"));
// const tasks: Task[] = [];
const createTasks = async (req, res, next) => {
    try {
        const name = req.body.name;
        const task = new tasks_1.default({ name });
        const result = await task.save();
        res.json({ message: " Task Added ", task: result });
    }
    catch (err) {
        console.log(err);
    }
};
exports.createTasks = createTasks;
const listTasks = async (req, res, next) => {
    try {
        const result = await tasks_1.default.find();
        res.json({ Tasks: result });
    }
    catch (err) {
        console.log(err);
    }
};
exports.listTasks = listTasks;
