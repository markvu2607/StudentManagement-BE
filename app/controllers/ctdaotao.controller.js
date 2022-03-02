const CtDaoTao = require("../models/ctdaotao.model.js");

exports.Them = (req, res) => {
  if (!req.body.idKhoa || !req.body.tenctdt || !req.body.noiDung) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    CtDaoTao.Them(new CtDaoTao(req.body), (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Có lỗi khi thêm chương trình đào tạo.",
        });
      else res.send(data);
    });
};

exports.Sua = (req, res) => {
  if (!req.body.idKhoa || !req.body.tenctdt || !req.body.noiDung) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  }
  CtDaoTao.Sua(req.params.idctdt, new CtDaoTao(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy chương trình đào tạo id ${req.params.idctdt}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi cập nhật chương trình đào tạo id " + req.params.idctdt,
        });
      }
    } else res.send(data);
  });
};
exports.Xem = (req, res) => {
  CtDaoTao.Xem(req.params.idctdt, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy chương trình đào tạo id ${req.params.idctdt}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi khi tìm chương trình đào tạo id " + req.params.idctdt,
        });
      }
    } else res.send(data);
  });
};
exports.TimKiem = (req, res) => {
  const tenctdt = req.query.tenctdt;
  CtDaoTao.TimKiem(tenctdt, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Không tìm thấy chương trình đào tạo ${tenctdt}.`,
        });
      } else {
        res.status(500).send({
          message: "Lỗi khi tìm chương trình đào tạo " + tenctdt,
        });
      }
    } else res.send(data);
  });
};
