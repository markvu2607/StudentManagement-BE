import express from "express";
import sinhVienController from "../controllers/sinhvien.controller.js"

const router = express.Router()

router.post("/", sinhVienController.Them);
router.put("/:idsv", sinhVienController.Sua);
router.get("/", sinhVienController.TimKiem);
router.get("/:idsv", sinhVienController.Xem);

export default router