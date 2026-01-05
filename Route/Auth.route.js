import express from 'express'
import { login, signUp } from '../controller/Auth.controller.js'
// import { login, signUp } from '../Controller/Auth.controller.js'

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/signup",(req,res)=>{
    return res.render("signup")
})
export default router