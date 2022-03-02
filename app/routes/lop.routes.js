module.exports = (app) => {
    const lop = require("../controllers/lop.controller.js");
    var router = require("express").Router();
    router.post("/", lop.Them);
    router.put("/:idLop", lop.Sua);
    router.delete("/:idLop", lop.Dung);
    router.get("/:idLop", lop.Xem);
    router.get("/", lop.TimKiem);
    app.use("/api/lop", router);
  };
  