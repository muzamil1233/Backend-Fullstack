import express from "express"
// import { AddBag, bagPatch, DeleteBagItem, GetBag, GetBagCount, UpdateBagItem } from "../controller/Bag.controller.js"
import { authorize } from "../MiddleWare/auth.middleware.js";

const router = express.Router()

router.post("/",  addPayment);
router.get("/getbag/:userId",  GetBag)
router.get("/count", GetBagCount)
router.put("/updateBag/:itemId",  UpdateBagItem)
router.patch("/patchBag/:itemId",  bagPatch)
router.delete("/deleteBag/:itemId",  DeleteBagItem)

export default router;