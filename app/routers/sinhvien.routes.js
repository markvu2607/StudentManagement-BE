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
router.get("/thongke/:idLop", sinhVienController.ThongKeTheoLop);

export default router