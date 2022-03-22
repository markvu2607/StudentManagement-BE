import express from "express";
import taiLieuController from "../controllers/tailieu.controller.js"

const router = express.Router()

router.post("/", taiLieuController.Them);
router.get("/:idLop", taiLieuController.XemTheoLop);
router.get("/chitiet/:idtl", taiLieuController.Xem);

export default router