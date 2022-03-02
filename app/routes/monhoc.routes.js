module.exports = (app) => {
    const monHoc = require("../controllers/monhoc.controller.js");
    var router = require("express").Router();
    router.post("/", monHoc.Them);
    router.put("/:id", monHoc.Sua);
    router.get("/", monHoc.TimKiem);
    app.use("/api/monhoc", router);
  };