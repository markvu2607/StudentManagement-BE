import express from "express";
import DiemRenLuyenController from "../controllers/diemrenluyen.controller.js";

const router = express.Router();

router.post("/", DiemRenLuyenController.Them);
router.get("/", DiemRenLuyenController.TimKiem);

export default router;