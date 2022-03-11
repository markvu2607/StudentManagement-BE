import express from "express";
import GiangVienController from "../controllers/giangvien.controller.js";

const router = express.Router();

router.post("/", GiangVienController.Them);
router.put("/:idgv", GiangVienController.Sua);
router.get("/:idgv", GiangVienController.Xem);
router.get("/", GiangVienController.TimKiem);

export default router;