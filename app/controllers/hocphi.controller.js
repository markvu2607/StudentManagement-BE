import HocPhi from "../models/hocphi.model.js";

const HocPhiController = {
  ChuaThu: (req, res) => {
    if (!req.query.idsv) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      HocPhi.ChuaThu(req.query.idsv, (err, data) => {
        if (err) {
          res.status(500).send({
            message: res.message || "ERROR",
          });
        } else res.send(data);
      });
  },
  DaThu: (req, res) => {
    if (!req.query.idsv) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      HocPhi.DaThu(req.query.idsv, (err, data) => {
        if (err) {
          res.status(500).send({
            message: res.message || "ERROR",
          });
        } else res.send(data);
      });
  },
};

export default HocPhiController;
