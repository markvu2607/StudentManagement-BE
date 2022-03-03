import express from "express";
import taiKhoanController from "../controllers/taikhoan.controller.js"

const router = express.Router()

router.post("/", taiKhoanController.Them)
router.put("/:idtk", taiKhoanController.Sua);
router.delete("/:idtk", taiKhoanController.Khoa);

export default router