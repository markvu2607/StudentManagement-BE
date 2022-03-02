const Lop = require("../models/lop.model.js");

exports.Them = (req, res) => {
  if (
    !req.body.idmh ||
    !req.body.tenLop ||
    !req.body.phongHoc ||
    !req.body.soLuong ||
    !req.body.thoiGianBd ||
    !req.body.thoiGianKt ||
    !req.body.trangThai
  ) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    Lop.Them(new Lop(req.body), (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Có lỗi khi tạo tài khoản.",
        });
      else res.send(data);
    });
};

exports.Sua = (req, res) => {
  if (
    !req.body.idmh ||
    !req.body.tenLop ||
    !req.body.phongHoc ||
    !req.body.soLuong ||
    !req.body.thoiGianBd ||
    !req.body.thoiGianKt ||
    !req.body.trangThai
  ) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    Lop.Sua(req.params.id, new Lop(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy lớp id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Lỗi cập nhật lớp id " + req.params.id,
          });
        }
      } else res.send(data);
    });
};

exports.Dung = (req, res) => {
  Lop.Dung(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy lớp id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi dừng lớp id " + req.params.id,
        });
      }
    } else
      res.send({
        message: `Dừng thành công lớp ${req.params.id}!`,
      });
  });
};

exports.TimKiem = (req, res) => {
  const tenLop = req.query.tenLop;
  Lop.TimKiem(tenLop, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy lớp ${tenLop}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi khi tìm lớp " + tenLop,
        });
      }
    } else res.send(data);
  });
};
