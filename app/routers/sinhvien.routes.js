import express from "express";
import sinhVienController from "../controllers/sinhvien.controller.js"

const router = express.Router()

router.post("/", sinhVienController.Them);
router.put("/:idsv", sinhVienController.Sua);
router.get("/", sinhVienController.TimKiem);
router.get("/:idsv", sinhVienController.Xem);
router.get("/thongke/kytucxa", sinhVienController.ThongKeKTX);
router.get("/thongke/hocbong", sinhVienController.ThongKeHocBong);
router.get("/thongke/hocphi", sinhVienController.ThongKeHocPhi);
router.get("/thongke/dadangkyhoc", sinhVienController.DaDangKyHoc);
router.get("/thongke/:idLop", sinhVienController.ThongKeTheoLop);
router.post("/dangkyhoc/dangky", sinhVienController.DangKyHoc);
router.delete("/dangkyhoc/huy", sinhVienController.HuyHocPhan);
export default router