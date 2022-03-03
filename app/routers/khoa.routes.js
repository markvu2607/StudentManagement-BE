import express from "express";
import khoaController from "../controllers/khoa.controller.js"

const router = express.Router()

router.post("/", khoaController.Them);
router.put("/:idKhoa", khoaController.Sua);
router.get("/:idKhoa", khoaController.Xem);
router.get("/", khoaController.TimKiem);

export default router