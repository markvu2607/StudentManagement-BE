import express from "express";
import DiemController from "../controllers/diem.controller.js"

const router = express.Router()

router.put("/:idDiem", DiemController.Them);
router.put("/:idDiem", DiemController.Sua);
router.get("/:idsv", DiemController.Xem);
router.get("/diemtheolop/:idLop", DiemController.DiemTheoLop);
router.get("/", DiemController.TimKiem);

export default router
