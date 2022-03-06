module.exports = (app) => {
    const diemdanh = require("../controllers/diemdanh.controller.js");
    var router = require("express").Router();
    router.post("/", diemdanh.Them);
    router.put("/:idDiemDanh", diemdanh.Sua);
    router.get("/:idDiemDanh", diemdanh.Xem);
    router.get("/", diemdanh.XemDanhSach);
    app.use("/api/diemdanh", router);
  };
  