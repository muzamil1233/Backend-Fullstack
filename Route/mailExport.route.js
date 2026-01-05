import express from "express";
import { exportEmail } from "../controller/mailExporter.controller.js";

const router = express.Router();
router.post("/sendquery", exportEmail)
export default router;