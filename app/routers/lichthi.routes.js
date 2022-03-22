import express from "express";
import lichThiController from "../controllers/lichthi.controller.js"

const router = express.Router()

router.post("/", lichThiController.Them);
router.put("/:idLop", lichThiController.Sua);
router.get("/:idLop", lichThiController.getByIDLop)

export default router