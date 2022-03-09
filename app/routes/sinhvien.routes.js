module.exports = (app) => {
  const sinhVien = require("../controllers/sinhvien.controller.js");
  var router = require("express").Router();
  router.post("/", sinhVien.Them);
  router.put("/:idsv", sinhVien.Sua);
  router.get("/", sinhVien.TimKiem);
  router.get("/lophocphan/:idsv", sinhVien.XemTheoLop);
  router.get("/kytucxa", sinhVien.ThongKeKTX);
  router.get("/:idsv", sinhVien.Xem);
  app.use("/api/sinhvien", router);
};
