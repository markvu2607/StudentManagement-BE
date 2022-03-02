const SinhVien = require("../models/sinhvien.model.js");
exports.Them = (req, res) => {
  if (req.body) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  }
  const sinhVien = new SinhVien({
    tenSV: req.body.tenSV,
    ngaySinh: req.body.ngaySinh,
    gioiTinh: req.body.gioiTinh,
    queQuan: req.body.queQuan,
    diaChi: req.body.diaChi,
    sdt: req.body.sdt,
    cccd: req.body.cccd,
    idtk: req.body.idtk,
    tenBo: req.body.tenBo,
    namSinhBo: req.body.namSinhBo,
    ngheNghiepBo: req.body.ngheNghiepBo,
    sdtBo: req.body.sdtBo,
    tenMe: req.body.tenMe,
    namSinhMe: req.body.namSinhMe,
    ngheNghiepMe: req.body.ngheNghiepMe,
    sdtMe: req.body.sdtMe,
  });
  SinhVien.Them(sinhVien, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Có lỗi khi tạo tài khoản.",
      });
    else res.send(data);
  });
};

exports.Sua = (req, res) => {
  if (req.body) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  }
  console.log(req.body);
  SinhVien.Sua(req.params.id, new SinhVien(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy sinh viên id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi cập nhật sinh viên id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.Xem = (req, res) => {
  SinhVien.Xem(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy sinh viên id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi tìm sinh viên id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.TimKiem = (req, res) => {
  const tuKhoa = req.query.tuKhoa;
  SinhVien.TimKiem(tuKhoa, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy sinh viên với từ khóa ${tuKhoa}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi khi tìm sinh viên với từ khóa " + tuKhoa,
        });
      }
    } else res.send(data);
  });
};
