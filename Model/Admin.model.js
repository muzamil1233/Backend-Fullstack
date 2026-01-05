import mongoose, { Mongoose } from "mongoose";

const AdminSchema = new mongoose.Schema({
   name:{
        type :"string",
        required : true,
        trim : true
    },
    email:{
        type :"string",
        required:true,
        trim : true
    },
    password:{
        type :"string",
        required :true,
        min_length:5
    }
}, 
{
    timestamps:true
})

const admin = mongoose.model("admin",AdminSchema)
export default admin