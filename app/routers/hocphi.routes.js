import express from "express";
import hocPhiController from "../controllers/hocphi.controller.js"

const router = express.Router()

router.get("/dathu/", hocPhiController.DaThu);
router.get("/chuathu/", hocPhiController.ChuaThu);

export default router