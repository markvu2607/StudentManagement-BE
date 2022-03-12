import CtDaoTao from "../models/ctdaotao.model.js";

const CtDaoTaoController = {
  Them: (req, res) => {
    if (!req.body.idKhoa || !req.body.tenctdt) {
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
  },
  Sua: (req, res) => {
    if (!req.body.idKhoa || !req.body.tenctdt) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    }
    CtDaoTao.Sua(
      req.params.idctdt,
      new CtDaoTao({ ...req.body }),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Không tìm thấy chương trình đào tạo id ${req.params.idctdt}.`,
            });
          } else {
            res.status(500).send({
              message:
                "Lỗi cập nhật chương trình đào tạo id " + req.params.idctdt,
            });
          }
        } else res.send(data);
      }
    );
  },
  Xem: (req, res) => {
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
  },
  TimKiem: (req, res) => {
    CtDaoTao.TimKiem(req.query.idKhoa, req.query.tenctdt, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy chương trình đào tạo`,
          });
        } else {
          res.status(500).send({
            message: "Lỗi khi tìm chương trình đào tạo ",
          });
        }
      } else res.send(data);
    });
  },
  XemChiTiet: (req, res) => {
    CtDaoTao.XemChiTiet(req.params.idctdt, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Không tìm thấy chi tiết chương trình đào tạo.",
          });
        } else {
          res.status(500).send({
            message:
              err.message || "Lỗi khi tìm chi tiết chương trình đào tạo id.",
          });
        }
      } else res.send(data);
    });
  },
  ThemChiTiet: (req, res) => {
    if (!req.body.idctdt || !req.body.idmh) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      CtDaoTao.ThemChiTiet(req.body.idctdt, req.body.idmh, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message ||
              "Có lỗi khi thêm môn học vào chương trình đào tạo.",
          });
        else res.send(data);
      });
  },
  XoaChiTiet: (req, res) => {
    if (!req.params.idctdt || !req.body.idmh) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else {
      CtDaoTao.XoaChiTiet(req.params.idctdt, req.body.idmh, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: "Không tìm thấy môn học trong chương trình đào tạo",
            });
          } else {
            res.status(500).send({
              message:
                err.message ||
                "Không thể xóa môn học khỏi chương trình đào tạo",
            });
          }
        } else
          res.send({
            message: "Đã xóa môn học khỏi chương trình đào tạo",
          });
      });
    }
  },
};

export default CtDaoTaoController;
