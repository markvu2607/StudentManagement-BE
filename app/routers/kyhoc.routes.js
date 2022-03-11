import express from "express";
import kyHocController from "../controllers/kyhoc.controller.js"

const router = express.Router()

router.post("/", kyHocController.Them);
router.put("/:idky", kyHocController.Sua);
router.get("/:idky", kyHocController.Xem);
router.get("/", kyHocController.XemDanhSach);

export default router