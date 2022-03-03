module.exports = (app) => {
  const ctDaoTao = require("../controllers/ctdaotao.controller.js");
  var router = require("express").Router();
  router.post("/", ctDaoTao.Them);
  router.put("/:idctdt", ctDaoTao.Sua);
  router.get("/:idctdt", ctDaoTao.Xem);
  router.get("/", ctDaoTao.TimKiem);
  router.get("/chitiet/:idctdt", ctDaoTao.XemChiTiet);
  router.post("/chitiet/", ctDaoTao.ThemChiTiet);
  router.delete("/chitiet/", ctDaoTao.XoaChiTiet);
  app.use("/api/ctdaotao", router);
};
