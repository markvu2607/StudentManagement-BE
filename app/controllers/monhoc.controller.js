import MonHoc from "../models/monhoc.model.js"

const MonHocController = {
  Them: (req, res) => {
    if (
      !req.body.tenMon ||
      !req.body.soTinChi ||
      !req.body.tienHoc
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      MonHoc.Them(new MonHoc(req.body), (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Có lỗi khi thêm môn học.",
          });
        else res.send(data);
      });
  },
  Sua: (req, res) => {
    if (
      !req.body.tenMon ||
      !req.body.soTinChi ||
      !req.body.tienHoc
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      MonHoc.Sua(req.params.idmh, new MonHoc(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Không tìm thấy môn học id ${req.params.idmh}.`,
            });
          } else {
            res.status(500).send({
              message: "Lỗi cập nhật môn học id " + req.params.idmh,
            });
          }
        } else res.send(data);
      });
  },
  Xem: (req, res) => {
    MonHoc.Xem(req.params.idmh, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy môn học id ${req.params.idmh}.`,
          });
        } else {
          res.status(500).send({
            message: "Lỗi khi tìm môn học id " + req.params.idmh,
          });
        }
      } else res.send(data);
    });
  },
  TimKiem: (req, res) => {
    const tenMon = req.query.tukhoa;
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
  }
}

export default MonHocController
