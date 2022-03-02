module.exports = (app) => {
  const ctDaoTao = require("../controllers/ctdaotao.controller.js");
  var router = require("express").Router();
  router.post("/", ctDaoTao.Them);
  router.put("/:idctdt", ctDaoTao.Sua);
  router.get("/:idctdt", ctDaoTao.Xem);
  router.get("/", ctDaoTao.TimKiem);
  app.use("/api/ctdaotao", router);
};
