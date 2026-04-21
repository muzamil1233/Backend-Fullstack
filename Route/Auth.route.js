import express from 'express'
import { getProfile, login, signUp, updateProfile } from '../controller/Auth.controller.js'
import { authorize } from '../MiddleWare/auth.middleware.js'
// import { login, signUp } from '../Controller/Auth.controller.js'

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/signup",(req,res)=>{
    return res.render("signup")
})
router.get("/profile", authorize , getProfile);
router.put("/profile",authorize , updateProfile);
export default router