import express from "express"
import { signin, signup } from "../controller/AdminAuth.controller.js";

const router = express.Router();
router.post("/signup" , signup);
router.post("/signIn" , signin);

export default router

