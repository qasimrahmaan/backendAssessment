import {RequestHandler ,Request, Response, NextFunction} from 'express';


//import { Task } from '../interfaces/tasks'
import TaskSchema from '../models/tasks'



// const tasks: Task[] = [];

export const createTasks: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const name = (req.body as {name: string}).name
    const task = new TaskSchema({ name });
    const result = await task.save();
    res.json({message: " Task Added ", task: result })
  } catch(err){
    console.log(err);
  }
}

export const listTasks: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const result = await TaskSchema.find();
    res.json({Tasks: result})
  } catch(err){
    console.log(err);
  }
}