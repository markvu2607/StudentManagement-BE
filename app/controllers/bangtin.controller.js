const BangTin = require("../models/bangtin.model.js");
exports.Them = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không được để trống thông tin!",
    });
  }
  const bangTin = new BangTin({
    noiDung: req.body.noiDung,
  });
  BangTin.Them(bangTin, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Có lỗi khi thêm bản tin.",
      });
    else res.send(data);
  });
};

exports.Xem = (req, res) => {
  BangTin.Xem((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Có lỗi khi xem bản tin",
      });
    else res.send(data);
  });
};
