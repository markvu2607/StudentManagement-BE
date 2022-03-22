import LichThi from "../models/lichthi.model.js"

const LichThiController = {
  Them: (req, res) => {
    if (!req.body.phongThi || !req.body.thoiGian || !req.body.idLop) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      LichThi.Them(new LichThi(req.body), (err, data) => {
        if (err)
          res.status(500).send({
            message: res.message || "ERROR",
          });
        else res.send(data);
      });
  },
  Sua: (req, res) => {
    if (!req.body.phongThi || !req.body.thoiGian) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      LichThi.Sua(new LichThi({ ...req.body, 'idLop': req.params.idLop }), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Không tìm thấy lich thi cua lop ${req.params.idLop}.`,
            });
          } else {
            res.status(500).send({
              message: res.message || "ERROR",
            });
          }
        } else res.send(data);
      });
  },
  getByIDLop: (req, res) => {
    LichThi.getByIDLop(req.params.idLop, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy lich thi cua lop ${req.params.idLop}.`,
          });
        } else {
          res.status(500).send({
            message: res.message || "ERROR",
          });
        }
      } else res.send(data);
    })
  }
}

export default LichThiController
