import express, { Application } from "express";
import mongoose from "mongoose";
import mongo from "./config/mongo";
import model from "./model/routes";
const app:Application = express()
app.use(express.json())
mongo()
.then(():void=> console.log("Book backend TS"))
.catch((error:unknown)=> console.log(error))
app.use(model)
app.listen(9090, ():void => console.log(9090))