const TaiKhoan = require("../models/taikhoan.model.js");
const bcrypt = require("bcrypt");

exports.Them = (req, res) => {
  if (
    !req.body.tenDangNhap ||
    !req.body.matKhau ||
    !req.body.chucNang ||
    !req.body.trangThai
  ) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else {
    const taiKhoan = new TaiKhoan({
      tenDangNhap: req.body.tenDangNhap,
      matKhau: bcrypt.hashSync(req.body.matKhau, 10),
      chucNang: req.body.chucNang,
      trangThai: req.body.trangThai,
    });
    TaiKhoan.Them(taiKhoan, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Có lỗi khi tạo tài khoản.",
        });
      else res.send(data);
    });
  }
};

exports.Sua = (req, res) => {
  if (
    !req.body.tenDangNhap ||
    !req.body.matKhau ||
    !req.body.chucNang ||
    !req.body.trangThai
  ) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else {
    const taiKhoan = new TaiKhoan({
      tenDangNhap: req.body.tenDangNhap,
      matKhau: bcrypt.hashSync(req.body.matKhau, 10),
      chucNang: req.body.chucNang,
      trangThai: req.body.trangThai,
    });
    TaiKhoan.Sua(req.params.id, taiKhoan, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy tải khoản id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Lỗi cập nhật tài khoản id " + req.params.id,
          });
        }
      } else res.send(data);
    });
  }
};

exports.Khoa = (req, res) => {
  TaiKhoan.Khoa(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy tài khoản id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Không thể khóa tài khoản id " + req.params.id,
        });
      }
    } else
      res.send({
        message: `Khóa tài khoản thành công tài khoản ${req.params.id}!`,
      });
  });
};
