import { NextFunction, Request, Response } from "express"
import { ErrorHandler } from "../../middlevare/error.middlevare";
import { validateBook } from "../../validate/monga.validate";
import model from "./model";
import userModel from "../user/model";


const GET = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        res.json(await model
            .find()
            .populate("users"))
    } catch (error) {
        console.log(error);
    }
}

const POST = async (req:Request, res:Response, next:NextFunction):Promise<void|Response> => {
    try {
        const {title, id} = req.body
        const book = new model({
            title,
        })
        const newbook = validateBook(book)
        if(newbook) {
            return res.status(500).json({
                data: newbook
            })
        }
        if (id == undefined) {
            await book.save()
            res.json({
                data:book
            })
        }
        
        const user = await userModel.findById({_id:id}) as any;

        user?.books.push(book._id)
        await book.save()
        await user?.save()
            res.json({
                data:book
            })
    } catch (error:unknown) {
        console.log(error);
        next(new ErrorHandler(error as any, 500)) 
    }
}
const PUT = async (req:Request, res:Response, next:NextFunction):Promise<void|Response> => {
    try {
        const { id } = req.params
        const {title, users} = req.body
        const book = await model.findByIdAndUpdate({_id:id}, {title, users})
        .catch(error => next(new ErrorHandler(error as any, 500)))

        res.json({
            status: 200,
            data:book
        })
    } catch (error) {
        console.log(error);
        next(new ErrorHandler(error as any, 500))
        
    }
}
const DELETE = async (req:Request, res:Response, next:NextFunction):Promise<void|Response> => {
    try {
        const { id } = req.params
        const book = await model.findByIdAndDelete({_id:id})
        .catch(error => next(new ErrorHandler(error as any, 500)))

        res.json({
            message: "success",
            data: book
        })
    } catch (error) {
        console.log(error);
        next(new ErrorHandler(error as any, 500))
    }
}
export {GET, POST, PUT, DELETE}