import Khoa from "../models/khoa.model.js";

const KhoaController = {
  Them: (req, res) => {
    if (!req.body.tenKhoa) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      Khoa.Them(new Khoa(req.body), (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "ERROR",
          });
        else res.send(data);
      });
  },
  Sua: (req, res) => {
    if (!req.body.tenKhoa) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      Khoa.Sua(req.params.idKhoa, new Khoa(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Không tìm thấy khoa id ${req.params.idKhoa}.`,
            });
          } else {
            res.status(500).send({
              message: res.message || "ERROR",
            });
          }
        } else res.send(data);
      });
  },
  Xem: (req, res) => {
    Khoa.Xem(req.params.idKhoa, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy khoa id ${req.params.idKhoa}.`,
          });
        } else {
          res.status(500).send({
            message: res.message || "ERROR",
          });
        }
      } else res.send(data);
    });
  },
  TimKiem: (req, res) => {
    const tuKhoa = req.query.tukhoa;
    Khoa.TimKiem(tuKhoa, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy khoa với từ khóa ${tuKhoa}.`,
          });
        } else {
          res.status(500).send({
            message: res.message || "ERROR",
          });
        }
      } else res.send(data);
    });
  },
};

export default KhoaController;
