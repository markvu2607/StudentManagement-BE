module.exports = (app) => {
  const ctDaoTao = require("../controllers/ctdaotao.controller.js");
  var router = require("express").Router();
  router.post("/", ctDaoTao.Them);
  router.put("/:id", ctDaoTao.Sua);
  router.get("/:id", ctDaoTao.Xem);
  router.get("/", ctDaoTao.TimKiem);
  app.use("/api/ctdaotao", router);
};
