module.exports = (app) => {
  const taiKhoan = require("../controllers/taikhoan.controller.js");
  var router = require("express").Router();
  router.post("/", taiKhoan.Them);
  router.put("/:idtk", taiKhoan.Sua);
  router.get("/:idtk", taiKhoan.Xem);
  router.delete("/:idtk", taiKhoan.Khoa);
  app.use("/api/taikhoan", router);
};
