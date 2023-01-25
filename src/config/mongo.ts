import User from "../model/user/model";
import Book from "../model/book/model";
import mongoose from "mongoose";

export default async() => await mongoose.connect('mongodb://127.0.0.1:27017/n37')
