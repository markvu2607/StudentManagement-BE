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
            message: err.message || "Có lỗi khi thêm bản tin.",
          });
        else res.send(data);
      });
  },
  Xem: (req, res) => {
    BangTin.Xem((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Có lỗi khi xem bản tin",
        });
      else res.send(data);
    });
  }
}

export default BangTinController
