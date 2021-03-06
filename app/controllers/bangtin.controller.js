import BangTin from "../models/bangtin.model.js"

const BangTinController = {
  Them: (req, res) => {
    if (!req.body.noiDung) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      BangTin.Them(new BangTin(req.body), (err, data) => {
        if (err)
          res.status(500).send({
            message: req.message || "ERROR",
          });
        else res.send(data);
      });
  },
  Xem: (req, res) => {
    BangTin.Xem((err, data) => {
      if (err)
        res.status(500).send({
          message: req.message || "ERROR",
        });
      else res.send(data);
    });
  },
  Xoa: (req, res) => {
    BangTin.Xoa(req.params.idbt, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy bảng tin ${req.params.idbt}.`,
          });
        } else {
          res.status(500).send({
            message: res.message || "Không thể xóa bảng tin " + req.params.idbt,
          });
        }
      } else
        res.send({
          message: `Xóa thành công bảng tin ${req.params.idbt}!`,
        });
    });
  }
}

export default BangTinController
