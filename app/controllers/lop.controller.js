import Lop from "../models/lop.model.js"

const LopController = {
  Them: (req, res) => {
    if (
      !req.body.idmh ||
      !req.body.tenLop ||
      !req.body.phongHoc ||
      !req.body.soLuong ||
      !req.body.thoiGianBd ||
      !req.body.thoiGianKt ||
      !req.body.trangThai === "" ||
      !req.body.idgv||
      !req.body.idky
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      Lop.Them(new Lop(req.body), (err, data) => {
        if (err)
          res.status(500).send({
            message: req.message || "ERROR",
          });
        else res.send(data);
      });
  },
  Sua: (req, res) => {
    if (
      !req.body.idmh ||
      !req.body.tenLop ||
      !req.body.phongHoc ||
      !req.body.soLuong ||
      !req.body.thoiGianBd ||
      !req.body.thoiGianKt ||
      !req.body.trangThai === "" ||
      !req.body.idgv ||
      !req.body.idky
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      Lop.Sua(req.params.idLop, new Lop(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Không tìm thấy lớp id ${req.params.idLop}.`,
            });
          } else {
            res.status(500).send({
              message: req.message || "ERROR",
            });
          }
        } else res.send(data);
      });
  },
  Dung: (req, res) => {
    Lop.Dung(req.params.idLop, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy lớp id ${req.params.idLop}.`,
          });
        } else {
          res.status(500).send({
            message: req.message || "ERROR",
          });
        }
      } else
        res.send({
          message: `Dừng thành công lớp ${req.params.idLop}!`,
        });
    });
  },
  Xem: (req, res) => {
    Lop.Xem(req.params.idLop, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy lớp id ${req.params.idLop}.`,
          });
        } else {
          res.status(500).send({
            message: req.message || "ERROR",
          });
        }
      } else res.send(data);
    });
  },
  TimKiem: (req, res) => {
    Lop.TimKiem(req.query.idky, req.query.tenlop, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy lớp.`,
          });
        } else {
          res.status(500).send({
            message: req.message || "ERROR",
          });
        }
      } else res.send(data);
    });
  }
}

export default LopController
