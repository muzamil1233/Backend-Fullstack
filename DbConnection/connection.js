import mongoose from "mongoose"


export const dbConnection = async ()=>{
    try {
        const con = await mongoose.connect(process.env.DB_URI);
        console.log("connected succesfully")
    } catch (error) {
        console.log("failed to connect with dbb", error)
        
    }
}