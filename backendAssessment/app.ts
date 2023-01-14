import express, {Request, Response, NextFunction} from "express";
import {json, urlencoded} from "body-parser";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import tasksRoutes from './routes/tasks'
import userRoutes from './routes/user'

const app = express();

app.use(urlencoded({extended: false}));
app.use(json())


app.use((req: Request, res: Response, next: NextFunction) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});


app.use("/auth",userRoutes);
app.use("/tasks",tasksRoutes);


mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.4wrvepj.mongodb.net/?retryWrites=true&w=majority`)
.then(result => {
  console.log("connected");
  app.listen({port : `${process.env.PORT}`});
})
.catch(err => {
  console.log(err)
});
