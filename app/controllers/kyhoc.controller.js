import KyHoc from "../models/kyhoc.model.js"

const KyHocController = {
  Them: (req, res) => {
    if (
      !req.body.tenKyHoc
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else {
        KyHoc.Them(new KyHoc(req.body), (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "ERROR",
          });
        else res.send(data);
      });
    }
  },
  Sua: (req, res) => {
    if (
      !req.body.tenKyHoc ||
      !req.params.idky
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else {
        console.log("a");
        KyHoc.Sua(req.params.idky, new KyHoc(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Không tìm thấy kỳ học id ${req.params.idky}.`,
            });
          } else {
            res.status(500).send({
              message: res.message || "Lỗi cập nhật kỳ học " + req.params.idky,
            });
          }
        } else res.send(data);
      });
    }
  },
  XemDanhSach: (req, res) => {
    KyHoc.XemDanhSach((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(500).send({
            message: res.message || "Lỗi khi xem danh sách kỳ học ",
          });
        }
      } else res.send(data);
    })
  },
  Xem: (req, res) => {
    KyHoc.Xem(req.params.idky, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy kỳ học id ${req.params.idky}.`,
          });
        } else {
          res.status(500).send({
            message: res.message || "Lỗi tìm kỳ học id " + req.params.idky,
          });
        }
      } else res.send(data);
    });
  }
}

export default KyHocController