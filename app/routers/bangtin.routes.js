import express from "express";
import bangTinController from "../controllers/bangtin.controller.js"


const router = express.Router()

router.post("/", bangTinController.Them);
router.get("/", bangTinController.Xem);

export default router
