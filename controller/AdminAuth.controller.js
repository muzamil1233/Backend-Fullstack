import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import admin from "../Model/Admin.model.js";
// import { expires } from "mongoose/lib/utils.js";


export const signup= async (req,res)=>{
    try {
        const{name,email,password} = req.body;
        const existing = await admin.findOne({email})
        if(existing){
            return res.status(400).json({
                msg : "invalid already added"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt)
        const newUser = new admin({name , email, password:hashPass})
        await newUser.save()
        return res.status(200).json({
            msg:"admin created succusfully"
        })

    } catch (error) {
        console.error("ERROR AT REGISTER Admin", error);
    return res.status(500).json({
      message: "internal server error ",
    });
    }
}


export const signin =async (req,res)=>{
    try {
        const{email,password} = req.body;

        const Admin = await admin.findOne({email});
        if(!Admin){
            return res.status(400).json({
                msg :"invalid email"
            })
        }

        const match = await bcrypt.compare(password, Admin.password);
        if(!match){
            return res.status(400),json({
                msg :"invalid password"
            })
        }

        const  token = jwt.sign({
            id:admin.id, role: admin.role
        },    process.env.JWT_SECRET,{
              expiresIn: "1d",
        })
        return res.status(200).json({
                    msg : "login succesfully",
                    token,
                    user:{
                        id : Admin._id,
                        name : Admin.name ,
                        email : Admin.email
                    }
                })

    } catch (error) {
          console.error("ERROR AT LOGIN USER", error);
    return res.status(500).json({ msg: "Server error" });
    }
}

