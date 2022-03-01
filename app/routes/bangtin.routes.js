module.exports = (app) => {
    const bangTin = require("../controllers/bangtin.controller.js");
    var router = require("express").Router();
    router.post("/", bangTin.Them);
    router.get("/", bangTin.Xem);
    app.use("/api/bangtin", router);
  };
  