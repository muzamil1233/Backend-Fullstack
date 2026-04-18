import express from "express"
import { AddBag, bagPatch, DeleteBagItem, GetBag, GetBagCount, UpdateBagItem } from "../controller/Bag.controller.js"
import { authorize } from "../MiddleWare/auth.middleware.js";

const router = express.Router()

router.post("/",  authorize , AddBag);
// router.get("/getbag/:userId",authorize,  GetBag)
router.get("/getbag", authorize, GetBag)


router.get("/count", authorize,GetBagCount)
router.put("/updateBag/:itemId", authorize, UpdateBagItem)
router.patch("/patchBag/:itemId",authorize,  bagPatch)
router.delete("/deleteBag/:itemId",authorize,  DeleteBagItem)

export default router;