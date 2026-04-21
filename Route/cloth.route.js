import express from "express";
import {
  AddClothes,
  deleteClothes,
  editCloth,
  getCloth,
  GetClothbyCatogory,
  getClothById,
  GetClothByType,
  searchClothes,
} from "../controller/cloth.controller.js";

import { authorize } from "../MiddleWare/auth.middleware.js";
import { upload } from "../Multer/Multer.js";

const router = express.Router();

router.post("/AddCloths", authorize, upload.array("images"), AddClothes);
router.delete("/deleteClothes/:id", authorize, deleteClothes);
router.put("/EditClothes/:id", authorize, upload.array("images"), editCloth);

router.get("/getClothes", getCloth);
router.get("/getClothes/type/:type", GetClothByType); // ✅ FIXED (no conflict)
router.get("/search", searchClothes);
router.get("/getCloth/:id", getClothById); // ✅ IMPORTANT
router.get("/getClothes/category/:category", GetClothbyCatogory);


export default router;
