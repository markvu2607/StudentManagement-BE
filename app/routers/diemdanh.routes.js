import express from "express";
import DiemDanhController from "../controllers/diemdanh.controller.js";

const router = express.Router();

router.post("/", DiemDanhController.Them);
router.put("/:idDiemDanh", DiemDanhController.Sua);
router.get("/:idDiemDanh", DiemDanhController.Xem);
router.get("/chitiet/:idDiemDanh", DiemDanhController.XemChiTietDiemDanh);
router.get("/", DiemDanhController.XemDanhSach);
router.put("/sinhvien/:idsv", DiemDanhController.SvDiemDanh);

export default router;