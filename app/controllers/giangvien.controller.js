import GiangVien from "../models/giangvien.model.js";

const GiangVienController = {
  Them: (req, res) => {
    if (
      !req.body.tengv ||
      !req.body.ngaySinh ||
      !req.body.laNam === "" ||
      !req.body.queQuan ||
      !req.body.diaChi ||
      !req.body.sdt ||
      !req.body.cccd ||
      !req.body.email ||
      !req.body.idKhoa ||
      !req.body.idtk
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else {
      GiangVien.Them(new GiangVien({ ...req.body }), (err, data) => {
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
      !req.body.tengv ||
      !req.body.ngaySinh ||
      !req.body.laNam === "" ||
      !req.body.queQuan ||
      !req.body.diaChi ||
      !req.body.sdt ||
      !req.body.cccd ||
      !req.body.email ||
      !req.body.idKhoa ||
      !req.body.idtk ||
      !req.params.idgv
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      GiangVien.Sua(
        req.params.idgv,
        new GiangVien({ ...req.body }),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Không tìm thấy giảng viên id ${req.params.idgv}.`,
              });
            } else {
              res.status(500).send({
                message: err.message || "ERROR",
              });
            }
          } else res.send(data);
        }
      );
  },
  Xem: (req, res) => {
    GiangVien.Xem(req.params.idgv, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy giảng viên id ${req.params.idgv}.`,
          });
        } else {
          res.status(500).send({
            message: err.message || "ERROR",
          });
        }
      } else res.send(data);
    });
  },
  TimKiem: (req, res) => {
    const tuKhoa = req.query.tukhoa;
    console.log(tuKhoa);
    GiangVien.TimKiem(tuKhoa, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy giảng viên với từ khóa ${tuKhoa}.`,
          });
        } else {
          res.status(500).send({
            message: err.message || "ERROR",
          });
        }
      } else res.send(data);
    });
  },
};

export default GiangVienController;
