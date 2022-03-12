import express from "express";
import DiemController from "../controllers/diem.controller.js"

const router = express.Router()

router.post("/", DiemController.Them);
router.put("/:idDiem", DiemController.Sua);
router.get("/:idsv", DiemController.Xem);
router.get("/", DiemController.TimKiem);

export default router
