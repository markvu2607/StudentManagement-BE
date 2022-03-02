module.exports = (app) => {
    const lop = require("../controllers/lop.controller.js");
    var router = require("express").Router();
    router.post("/", lop.Them);
    router.put("/:id", lop.Sua);
    router.delete("/:id", lop.Dung);
    router.get("/", lop.TimKiem);
    app.use("/api/lop", router);
  };
  