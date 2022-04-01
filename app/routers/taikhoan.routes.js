import express from "express";
import taiKhoanController from "../controllers/taikhoan.controller.js"

const router = express.Router()

router.post("/", taiKhoanController.Them)
router.put("/:idtk", taiKhoanController.Sua);
router.get("/:idtk", taiKhoanController.Xem);
router.delete("/:idtk", taiKhoanController.Khoa);
router.get("/", taiKhoanController.TimKiem)
router.put("/doimatkhau/:idtk", taiKhoanController.DoiMatKhau);

export default router