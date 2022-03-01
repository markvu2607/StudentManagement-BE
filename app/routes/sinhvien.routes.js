module.exports = (app) => {
  const sinhVien = require("../controllers/sinhvien.controller.js");
  var router = require("express").Router();
  router.post("/", sinhVien.Them);
  router.put("/:id", sinhVien.Sua);
  router.get("/", sinhVien.TimKiem);
  router.get("/:id", sinhVien.Xem);
  app.use("/api/sinhvien", router);
};
