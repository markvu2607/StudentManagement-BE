import express from "express";
import CtLichThiController from "../controllers/ctlichthi.controller.js"

const router = express.Router()

router.post("/", CtLichThiController.Them);

export default router
