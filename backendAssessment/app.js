"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tasks_1 = __importDefault(require("./routes/tasks"));
const user_1 = __importDefault(require("./routes/user"));
const app = express_1.default();
app.use(body_parser_1.urlencoded({ extended: false }));
app.use(body_parser_1.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/auth", user_1.default);
app.use("/tasks", tasks_1.default);
mongoose_1.default.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.4wrvepj.mongodb.net/?retryWrites=true&w=majority`)
    .then(result => {
    console.log("connected");
    app.listen({ port: `${process.env.PORT}` });
})
    .catch(err => {
    console.log(err);
});
