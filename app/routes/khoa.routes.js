module.exports = (app) => {
  const khoa = require("../controllers/khoa.controller.js");
  var router = require("express").Router();
  router.post("/", khoa.Them);
  router.put("/:id", khoa.Sua);
  router.get("/", khoa.TimKiem);
  app.use("/api/khoa", router);
};
