const MonHoc = require("../models/monhoc.model.js");
exports.Them = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không được để trống thông tin!",
    });
  }
  const monHoc = new MonHoc({
    tenMon: req.body.tenMon,
    tlMonHoc: req.body.tlMonHoc,
    soTinChi: req.body.soTinChi,
    tienHoc: req.body.tienHoc
  });
  MonHoc.Them(monHoc, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Có lỗi khi thêm môn học.",
      });
    else res.send(data);
  });
};
exports.Sua = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  }
  console.log(req.body);
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
