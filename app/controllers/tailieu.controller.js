import TaiLieu from "../models/tailieu.model.js";

const TaiLieuController = {
  Them: (req, res) => {
    if (!req.body.tenTaiLieu || !req.body.duongDan || !req.body.idLop) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else {
      TaiLieu.Them(new TaiLieu(req.body), (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Có lỗi thêm tài liệu.",
          });
        else res.send(data);
      });
    }
  },
  XemTheoLop: (req, res) => {
    TaiLieu.XemTheoLop(req.params.idLop, (err, data) => {
      if (err) {
        res.status(500).send({
          message: res.message || "ERROR",
        });
      } else res.send(data);
    });
  },
  Xem: (req, res) => {
    TaiLieu.Xem(req.params.idtl, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy tài liệu id ${req.params.idtl}.`,
          });
        } else {
          res.status(500).send({
            message: res.message || "Lỗi tìm tài liệu id " + req.params.idtl,
          });
        }
      } else res.send(data);
    });
  },
};

export default TaiLieuController;
