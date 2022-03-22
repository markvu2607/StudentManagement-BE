import Diem from "../models/diem.model.js";

const DiemController = {
  Them: (req, res) => {
    if (
      !req.params.idDiem ||
      !req.body.diemQuaTrinh ||
      !req.body.diemThi ||
      !req.body.diemTrungBinh ||
      !req.body.diemHeSo4 ||
      !req.body.idsv ||
      !req.body.idLop
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      Diem.Them(req.params.idDiem, new Diem(req.body), (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Có lỗi khi thêm điểm.",
          });
        else res.send(data);
      });
  },

  Sua: (req, res) => {
    if (
      !req.params.idDiem ||
      !req.body.diemQuaTrinh ||
      !req.body.diemThi ||
      !req.body.diemTrungBinh ||
      !req.body.diemHeSo4 ||
      !req.body.idsv ||
      !req.body.idLop
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      Diem.Sua(req.params.idDiem, new Diem(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: "Không tìm thấy điểm",
            });
          } else {
            res.status(500).send({
              message: res.message || "Lỗi khi cập nhật điểm ",
            });
          }
        } else res.send(data);
      });
  },

  Xem: (req, res) => {
    if (!req.params.idsv) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      Diem.Xem(req.params.idsv, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Không tìm thấy điểm nào.`,
            });
          } else {
            res.status(500).send({
              message: res.message || "Lỗi khi thông kê điểm",
            });
          }
        } else res.send(data);
      });
  },
  TimKiem: (req, res) => {
    Diem.TimKiem(req.query.tenlop, req.query.idky, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy điểm`,
          });
        } else {
          res.status(500).send({
            message: res.message || "Lỗi khi tìm điểm",
          });
        }
      } else res.send(data);
    });
  },
};
export default DiemController;
