module.exports = (app) => {
    const diemrenluyen = require("../controllers/diemrenluyen.controller");
    var router = require("express").Router();
    router.post("/", diemrenluyen.Them);
    router.get("/", diemrenluyen.Xem);
    app.use("/api/diemrenluyen", router);
  };
  