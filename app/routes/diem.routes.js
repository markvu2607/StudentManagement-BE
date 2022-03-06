module.exports = (app) => {
    const diem = require("../controllers/diem.controller");
    var router = require("express").Router();
    router.post("/", diem.Them);
    router.put("/:idDiem", diem.Sua);
    router.get("/:idsv", diem.Xem);
    router.get("/", diem.TimKiem);
    app.use("/api/diem", router);
  };
  