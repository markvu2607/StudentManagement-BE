const DiemDanh = require("../models/diemdanh.model.js");

exports.Them = (req, res) => {
  console.log(req.body);
  if (!req.body.thoiGianBd || !req.body.thoiGianKt || !req.body.idLop) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    DiemDanh.Them(new DiemDanh(req.body), (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Có lỗi khi thêm điểm danh.",
        });
      else res.send(data);
    });
};

exports.Sua = (req, res) => {
  if (
    !req.params.idDiemDanh ||
    !req.body.thoiGianBd ||
    !req.body.thoiGianKt ||
    !req.body.idLop
  ) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  }
  DiemDanh.Sua(req.params.idDiemDanh, new DiemDanh(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Không tìm thấy điểm danh.",
        });
      } else {
        res.status(500).send({
          message: err.message || "Lỗi cập nhật điểm danh.",
        });
      }
    } else res.send(data);
  });
};

exports.Xem = (req, res) => {
  if (!req.params.idDiemDanh) {
    res.status(400).send({
      message: "Nội dung trống!",
    });
  } else
    DiemDanh.Xem(req.params.idDiemDanh, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Không tìm thấy điểm danh.",
          });
        } else {
          res.status(500).send({
            message: err.message || "Lỗi khi tìm điểm danh.",
          });
        }
      } else res.send(data);
    });
};

exports.XemDanhSach = (req, res) => {
  DiemDanh.XemDanhSach(req.query.idLop, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Không tìm thấy điểm danh nào.",
        });
      } else {
        res.status(500).send({
          message: err.message || "Lỗi khi tìm điểm danh.",
        });
      }
    } else res.send(data);
  });
};

// exports.SvXemDiemDanh = (req, res) => {
//   if (!req.params.idctdt || !req.body.idmh)
//     CtDaoTao.XemChiTiet(req.params.idctdt, (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: "Không tìm thấy chi tiết chương trình đào tạo.",
//           });
//         } else {
//           res.status(500).send({
//             message:
//               err.message || "Lỗi khi tìm chi tiết chương trình đào tạo id.",
//           });
//         }
//       } else res.send(data);
//     });
// };

// exports.SvDiemDanh = (req, res) => {
//   if (!req.body.idctdt || !req.body.idmh) {
//     res.status(400).send({
//       message: "Nội dung trống!",
//     });
//   } else
//     CtDaoTao.ThemChiTiet(req.body.idctdt, req.body.idmh, (err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Có lỗi khi thêm môn học vào chương trình đào tạo.",
//         });
//       else res.send(data);
//     });
// };
