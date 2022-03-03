const CtDaoTao = require("../models/ctdaotao.model.js");

exports.Them = (req, res) => {
  if (!req.body.idKhoa || !req.body.tenctdt || !req.body.moTa) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    CtDaoTao.Them(new CtDaoTao(null, req.body), (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Có lỗi khi thêm chương trình đào tạo.",
        });
      else res.send(data);
    });
};

exports.Sua = (req, res) => {
  if (!req.body.idKhoa || !req.body.tenctdt || !req.body.moTa) {
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

exports.XemChiTiet = (req, res) => {
  CtDaoTao.XemChiTiet(req.params.idctdt, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `không tìm thấy chi tiết chương trình đào tạo ${req.params.idctdt}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Lỗi khi tìm chi tiết chương trình đào tạo id " + req.params.idctdt,
        });
      }
    } else res.send(data);
  });
};

exports.ThemChiTiet = (req, res) => {
  if (!req.body.idctdt || !req.body.idmh) {
    res.status(400).send({
      message: "Nội dung trống 1!",
    });
  } else
    CtDaoTao.ThemChiTiet(req.body.idctdt, req.body.idmh, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message ||
            `Có lỗi khi thêm môn học idmh ${idmh} vào chương trình đào tạo idctdt ${idctdt}`,
        });
      else res.send(data);
    });
};

exports.XoaChiTiet = (req, res) => {
  if (!req.body.idctdt || !req.body.idmh) {
    res.status(400).send({
      message: "Nội dung trống 1!",
    });
  } else {
    let idmh = req.body.idmh;
    let idctdt = req.body.idctdt;
    CtDaoTao.XoaChiTiet(req.body.idctdt, req.body.idmh, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `không tìm thấy môn học idmh ${idmh} trong chương trình đào tạo idctdt ${idctdt}`,
          });
        } else {
          res.status(500).send({
            message: `Không thể xóa môn học idmh ${idmh} khỏi chương trình đào tạo idctdt ${idctdt}`,
          });
        }
      } else
        res.send({
          message: `Đã xóa môn học idmh ${idmh} khỏi chương trình đào tạo idctdt ${idctdt}`,
        });
    });
  }
};
