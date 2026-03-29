import express from "express";
// import { AddClothes, deleteClothes, editCloth, getCloth, GetClothId } from "../Controller/cloth.controller.js";
// import { authorize } from "../middleWare/auth.middleware.js";
import { AddClothes,deleteClothes, editCloth, getCloth, GetClothbyCatogory, getClothById, GetClothByType,  } from "../controller/cloth.controller.js";
import { authorize } from "../MiddleWare/auth.middleware.js";
import { upload } from "../Multer/Multer.js";
const router = express.Router();


router.post("/AddCloths" , authorize,upload.array("images"), AddClothes)
router.delete("/deleteClothes/:id",authorize, deleteClothes)
router.put("/EditClothes/:id", authorize, upload.array("images"), editCloth);

router.get("/getClothes",getCloth)
router.get("/getClothes/:type",GetClothByType)
router.get("/getCloth/:id",  getClothById);

router.get("/getClothes/catogory/:category",GetClothbyCatogory)
export default router

