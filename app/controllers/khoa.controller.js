const Khoa = require("../models/khoa.model.js");
exports.Them = (req, res) => {
  if (!req.body.tenKhoa) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    Khoa.Them(new Khoa(req.body), (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Có lỗi khi tạo khoa.",
        });
      else res.send(data);
    });
};
exports.Sua = (req, res) => {
  if (!req.body.tenKhoa) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    Khoa.Sua(req.params.id, new Khoa(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy khoa id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Lỗi cập nhật khoa id " + req.params.id,
          });
        }
      } else res.send(data);
    });
};
exports.TimKiem = (req, res) => {
  const tuKhoa = req.query.tuKhoa;
  Khoa.TimKiem(tuKhoa, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy khoa với từ khóa ${tuKhoa}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi khi tìm khoa với từ khóa " + tuKhoa,
        });
      }
    } else res.send(data);
  });
};
