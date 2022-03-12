import express from "express";
import ctDaoTaoController from "../controllers/ctdaotao.controller.js"

const router = express.Router()

router.post("/", ctDaoTaoController.Them);
router.put("/:idctdt", ctDaoTaoController.Sua);
router.get("/:idctdt", ctDaoTaoController.Xem);
router.get("/", ctDaoTaoController.TimKiem);
router.get("/chitiet/:idctdt", ctDaoTaoController.XemChiTiet);
router.post("/chitiet/", ctDaoTaoController.ThemChiTiet);
router.delete("/chitiet/:idctdt", ctDaoTaoController.XoaChiTiet);

export default router
