const DiemDanh = require("../models/diemdanh.model.js");

exports.Them = (req, res) => {
  console.log(req.body);
  if (!req.body.thoiGianBd || !req.body.thoiGianKt || !req.body.idLop) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    DiemDanh.Them(new DiemDanh(req.body), (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Có lỗi khi thêm điểm danh.",
        });
      else res.send(data);
    });
};

exports.Sua = (req, res) => {
  if (
    !req.params.idDiemDanh ||
    !req.body.thoiGianBd ||
    !req.body.thoiGianKt ||
    !req.body.idLop
  ) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  }
  DiemDanh.Sua(req.params.idDiemDanh, new DiemDanh(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Không tìm thấy điểm danh.",
        });
      } else {
        res.status(500).send({
          message: err.message || "Lỗi cập nhật điểm danh.",
        });
      }
    } else res.send(data);
  });
};

exports.Xem = (req, res) => {
  if (!req.params.idDiemDanh) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    DiemDanh.Xem(req.params.idDiemDanh, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Không tìm thấy điểm danh.",
          });
        } else {
          res.status(500).send({
            message: err.message || "Lỗi khi tìm điểm danh.",
          });
        }
      } else res.send(data);
    });
};

exports.XemDanhSach = (req, res) => {
  DiemDanh.XemDanhSach(req.query.idLop, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Không tìm thấy điểm danh nào.",
        });
      } else {
        res.status(500).send({
          message: err.message || "Lỗi khi tìm điểm danh.",
        });
      }
    } else res.send(data);
  });
};  

exports.SvDiemDanh = (req, res) => {
  console.log(1);
  if (!req.params.idsv || !req.body.idDiemDanh) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    DiemDanh.SvDiemDanh(req.params.idsv, req.body.idDiemDanh, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Có lỗi khi điểm danh sinh viên",
        });
      else res.send(data);
    });
};
