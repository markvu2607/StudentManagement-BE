import DiemRenLuyen from "../models/diemrenluyen.model.js"

const DiemRenLuyenController = {
  Them: (req, res) => {
    if (!req.body.idsv || !req.body.idky || !req.body.diem) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      DiemRenLuyen.Them(new DiemRenLuyen(req.body), (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Có lỗi khi thêm điểm.",
          });
        else res.send(data);
      });
  },
  TimKiem: (req, res) => {
    DiemRenLuyen.TimKiem(
      req.query.idKhoa,
      req.query.idKhoa,
      req.query.tensv,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Không tìm thấy điểm rèn luyện nào.`,
            });
          } else {
            res.status(500).send({
              message: res.message || "Lỗi khi thông kê điểm rèn luyện",
            });
          }
        } else res.send(data);
      }
    );
  }
};

export default DiemRenLuyenController