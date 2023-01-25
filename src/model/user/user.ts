import { NextFunction, Request, Response } from "express"
import { ErrorHandler } from "../../middlevare/error.middlevare"
import { validate } from "../../validate/monga.validate"
import model from "./model"
import bookModel from "../book/model"
const GET = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        const find = await model
         .find()
         .populate("books")
        .catch(error => next(new ErrorHandler(error, 500)))
        res.status(200).json({
            status: 200,
            message: "Success",
            data:find
        })
        
    } catch (error:unknown) {
        console.log(error);
        next(new ErrorHandler(error as any, 500))
    }
}


const POST = async (req:Request, res:Response, next:NextFunction):Promise<void|Response> => {
    try {
        const {name, id} = req.body

        const user = new model({
            name
        })
        const newUser = validate(user)
        
        if(newUser) {
            return res.status(400).json({
                data: newUser
            })
        }
        if (id == undefined) {
            await user.save()
            res.json({
                data:user
            })
        }
        const book = await bookModel?.findById({_id:id}) as any
        book?.users.push(user._id)
        await user.save()
        await book?.save()
        res.json({
            data:user
        })
    } catch (error:unknown) {
        console.log(error);
        next(new ErrorHandler(error as any , 500)) 
    }
}

const PUT = async (req:Request, res:Response, next:NextFunction):Promise<void|Response> => {
    try {
        const { id } = req.params
        const {name, books} = req.body
        const user = await model.findByIdAndUpdate({_id:id}, {name, books})
        .catch(error => next(new ErrorHandler(error as any, 500)))
        res.json({
            status: 200,
            data:user
        })
    } catch (error) {
        console.log(error);
        next(new ErrorHandler(error as any, 500))
    }
}
const DELETE = async (req:Request, res:Response, next:NextFunction):Promise<void|Response> => {
    try {
        const { id } = req.params
        const user = await model.findByIdAndDelete({_id:id})
        .catch(error => next(new ErrorHandler(error as any, 500)))
        res.json({
            message: "success",
            data: user
        })
    } catch (error) {
        console.log(error);
        next(new ErrorHandler(error as any, 500))
    }
}

export {GET, POST, PUT, DELETE}