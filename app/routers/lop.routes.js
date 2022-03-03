import express from "express";
import lopController from "../controllers/lop.controller.js"


const router = express.Router()

router.post("/", lopController.Them);
router.put("/:idLop", lopController.Sua);
router.delete("/:idLop", lopController.Dung);
router.get("/:idLop", lopController.Xem);
router.get("/", lopController.TimKiem);

export default router
