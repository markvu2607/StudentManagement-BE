const MonHoc = require("../models/monhoc.model.js");
exports.Them = (req, res) => {
  if (
    !req.body.tenMon ||
    !req.body.tlMonHoc ||
    !req.body.soTinChi ||
    !req.body.tienHoc
  ) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    MonHoc.Them(new MonHoc(req.body), (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Có lỗi khi thêm môn học.",
        });
      else res.send(data);
    });
};
exports.Sua = (req, res) => {
  if (
    !req.body.tenMon ||
    !req.body.tlMonHoc ||
    !req.body.soTinChi ||
    !req.body.tienHoc
  ) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    MonHoc.Sua(req.params.id, new MonHoc(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy môn học id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Lỗi cập nhật môn học id " + req.params.id,
          });
        }
      } else res.send(data);
    });
};
exports.Xem = (req, res) => {
  MonHoc.Xem(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy môn học id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi khi tìm môn học id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
exports.TimKiem = (req, res) => {
  const tenMon = req.query.tenMon;
  MonHoc.TimKiem(tenMon, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy môn ${tenMon}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi khi tìm môn " + tenMon,
        });
      }
    } else res.send(data);
  });
};
