import express from "express";
import monHocController from "../controllers/monhoc.controller.js"

const router = express.Router()

router.post("/", monHocController.Them);
router.put("/:idmh", monHocController.Sua);
router.get("/:idmh", monHocController.Xem);
router.get("/", monHocController.TimKiem);

export default router