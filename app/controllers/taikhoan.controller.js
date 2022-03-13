import TaiKhoan from "../models/taikhoan.model.js"
import bcrypt from "bcrypt"

const TaiKhoanController = {
  Them: (req, res) => {
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
  },
  Sua: (req, res) => {
    if (
      !req.body.chucNang ||
      !req.body.trangThai
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else {
      const taiKhoan = new TaiKhoan({
        chucNang: req.body.chucNang,
        trangThai: req.body.trangThai,
      });
      TaiKhoan.Sua(req.params.idtk, taiKhoan, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Không tìm thấy tải khoản id ${req.params.idtk}.`,
            });
          } else {
            res.status(500).send({
              message: "Lỗi cập nhật tài khoản id " + req.params.idtk,
            });
          }
        } else res.send(data);
      });
    }
  },
  Khoa: (req, res) => {
    TaiKhoan.Khoa(req.params.idtk, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy tài khoản id ${req.params.idtk}.`,
          });
        } else {
          res.status(500).send({
            message: "Không thể khóa tài khoản id " + req.params.idtk,
          });
        }
      } else
        res.send({
          message: `Khóa tài khoản thành công tài khoản ${req.params.idtk}!`,
        });
    });
  },
  TimKiem: (req, res) => {
    TaiKhoan.TimKiem(req.query.chucNang, req.query.tenDangNhap, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy tài khoản`,
          });
        } else {
          res.status(500).send({
            message: req.message || "Lỗi khi tìm tài khoản",
          });
        }
      } else res.send(data);
    })
  },
  Xem: (req, res) => {
    TaiKhoan.Xem(req.params.idtk, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy tài khoản id ${req.params.idtk}.`,
          });
        } else {
          res.status(500).send({
            message: res.message || "Lỗi tìm tài khoản id " + req.params.idtk,
          });
        }
      } else res.send(data);
    });
  }
}

export default TaiKhoanController