import {Schema, Types, model} from "mongoose"

const UserSchena = new Schema({
    title: {
        type:String,
        require: true,
        minLength:[5, "Your name should not be less than 5" ],
        maxLength:[99, "Your name must be less than 99" ]
    },
    users: [{type:Types.ObjectId, ref:"User"}]
}, {
    collection: "Book"
})

export default model("Book", UserSchena)
