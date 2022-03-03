const LopHocPhan = require("../models/lophocphan.model.js");

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
  LopHocPhan.Them(new LopHocPhan(req.body), (err, data) => {
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
  LopHocPhan.Sua(req.params.idLop, new LopHocPhan(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy lớp id ${req.params.idLop}.`,
          });
        } else {
          res.status(500).send({
            message: "Lỗi cập nhật lớp id " + req.params.idLop,
          });
        }
      } else res.send(data);
    });
};

exports.Dung = (req, res) => {
  LopHocPhan.Dung(req.params.idLop, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy lớp id ${req.params.idLop}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi dừng lớp id " + req.params.idLop,
        });
      }
    } else
      res.send({
        message: `Dừng thành công lớp ${req.params.idLop}!`,
      });
  });
};
exports.Xem = (req, res) => {
  LopHocPhan.Xem(req.params.idLop, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy lớp id ${req.params.idLop}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi khi tìm lớp id " + req.params.idLop,
        });
      }
    } else res.send(data);
  });
};
exports.TimKiem = (req, res) => {
  const tenLop = req.query.tenLop;
  LopHocPhan.TimKiem(tenLop, (err, data) => {
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
