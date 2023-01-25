import {Schema, Types, model} from "mongoose"


const UserSchena = new Schema({
    name: {
        type:String,
        require: true,
        minLength:[3, "Your name should not be less than 3" ],
        maxLength:[100, "Your name must be less than 100" ]
    },
    books: [{type:Types.ObjectId, ref:"Book"}]
}, {
    collection: "User"
})

export default model("User", UserSchena)


















