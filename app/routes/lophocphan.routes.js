module.exports = (app) => {
    const lophocphan = require("../controllers/lophocphan.controller.js");
    var router = require("express").Router();
    router.post("/", lophocphan.Them);
    router.put("/:idLop", lophocphan.Sua);
    router.delete("/:idLop", lophocphan.Dung);
    router.get("/:idLop", lophocphan.Xem);
    router.get("/", lophocphan.TimKiem);
    app.use("/api/lophocphan", router);
  };
  