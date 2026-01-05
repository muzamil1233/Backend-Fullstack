// import user from "../Model/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../Model/user.model.js";
// import { v4 as uuidv4 } from "uuid";
// import { setUser } from "../service/auth.js";
// import express from "express";




export const signUp =async  (req,res)=>{
      try {
        const{name , email , password } = req.body;
        const existing = await user.findOne({email});

        if(existing){
            return res.status(400).json({
                msg : "already added email "
            })
        }

        const salt = await bcrypt.genSalt(10) 
        const hashPass = await bcrypt.hash(password , salt)


        const newUser = new user({name , email , password : hashPass})
        await newUser.save()
        return res.status(200).json({
            msg :"added succesfully"
        })


      } catch (error) {
        console.error("ERROR AT REGISTER user", error);
    return res.status(500).json({
      message: "internal server error ",
    });
      }
}


export const login = async (req, res) =>{
    try {
         const{email , password} = req.body;

         const User = await user.findOne({email});
         if(!User){
            return res.status(404).json({
                msg : "invalid email"
            })
         }

         const ismatch = await bcrypt.compare(password ,User.password);
         if(!ismatch){
            return res.status(404).json({
                msg : "invalid credentail"
            })
         }

           const token = jwt.sign(
           { userId: User._id, role: User.role || "user" },
            process.env.JWT_SECRET,
            {
                 expiresIn: "1d",
            }
        
        )
        return res.status(200).json({
            msg : "login succesfully",
            token,
            user: {
        id: User._id,
        name: User.name,
        email: User.email,
      },
        })


    } catch (error) {
        console.error("ERROR AT LOGIN USER", error);
    return res.status(500).json({ msg: "Server error" });
    }
}
// export const login = async (req, res) =>{
//     try {
//          const{email , password} = req.body;

//          const User = await user.findOne({email});
//          if(!User){
//             return res.status(404).json({
//                 msg : "invalid email"
//             })
//          }

//          const ismatch = await bcrypt.compare(password ,User.password);
//          if(!ismatch){
//             return res.status(404).json({
//                 msg : "invalid credentail"
//             })
//          }

//            const token = jwt.sign({
//             id : user.id , role : user.role},
//             process.env.JWT_SECRET,
//             {
//                  expiresIn: "1d",
//             }
        
//         )
//         // const sessionId = express(uuidv4)
//         // setUser(sessionId,user)
//         // res.cookie("uid",sessionId)
//         // return res.status(200).json({
//         //     msg : "login succesfully",
//         //     // token,
//         //     user:{
//         //         id : User.id,
//         //         name : User.name ,
//         //         email : User.email
//         //     }
//         // })


//     } catch (error) {
//         console.error("ERROR AT LOGIN USER", error);
//     return res.status(500).json({ msg: "Server error" });
//     }
// }