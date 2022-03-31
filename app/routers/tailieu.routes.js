import express from "express";
import taiLieuController from "../controllers/tailieu.controller.js"

const router = express.Router()

router.post("/upload", taiLieuController.Them);
router.get("/:idLop", taiLieuController.XemTheoLop);
router.get("/download/:filename", taiLieuController.Download);

export default router