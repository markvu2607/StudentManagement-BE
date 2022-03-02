module.exports = (app) => {
  const khoa = require("../controllers/khoa.controller.js");
  var router = require("express").Router();
  router.post("/", khoa.Them);
  router.put("/:idKhoa", khoa.Sua);
  router.get("/:idKhoa", khoa.Xem);
  router.get("/", khoa.TimKiem);
  app.use("/api/khoa", router);
};
