module.exports = (app) => {
  const taiKhoan = require("../controllers/taikhoan.controller.js");
  var router = require("express").Router();
  router.post("/", taiKhoan.Them);
  router.put("/:id", taiKhoan.Sua);
  router.delete("/:id", taiKhoan.Khoa);
  app.use("/api/taikhoan", router);
};
