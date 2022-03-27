import SinhVien from "../models/sinhvien.model.js";

const SinhVienController = {
  Them: (req, res) => {
    if (
      !req.body.tenSV ||
      !req.body.ngaySinh ||
      !req.body.laNam === "" ||
      !req.body.kyTucXa === "" ||
      !req.body.queQuan ||
      !req.body.diaChi ||
      !req.body.sdt ||
      !req.body.cccd ||
      !req.body.tenBo ||
      !req.body.namSinhBo ||
      !req.body.ngheNghiepBo ||
      !req.body.sdtBo ||
      !req.body.tenMe ||
      !req.body.namSinhMe ||
      !req.body.ngheNghiepMe ||
      !req.body.sdtMe ||
      !req.body.idKhoa ||
      !req.body.idtk
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else {
      SinhVien.Them(new SinhVien({ ...req.body }), (err, data) => {
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
      !req.body.tenSV ||
      !req.body.ngaySinh ||
      !req.body.laNam === "" ||
      !req.body.kyTucXa === "" ||
      !req.body.queQuan ||
      !req.body.diaChi ||
      !req.body.sdt ||
      !req.body.cccd ||
      !req.body.tenBo ||
      !req.body.namSinhBo ||
      !req.body.ngheNghiepBo ||
      !req.body.sdtBo ||
      !req.body.tenMe ||
      !req.body.namSinhMe ||
      !req.body.ngheNghiepMe ||
      !req.body.sdtMe ||
      !req.body.idKhoa ||
      !req.body.idtk
    ) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      SinhVien.Sua(
        req.params.idsv,
        new SinhVien({ ...req.body }),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Không tìm thấy sinh viên id ${req.params.idsv}.`,
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
    SinhVien.Xem(req.params.idsv, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Không tìm thấy sinh viên id ${req.params.idsv}.`,
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
    SinhVien.TimKiem(tuKhoa, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "ERROR",
        });
      }
      res.send(data);
    });
  },
  ThongKeKTX: (req, res) => {
    SinhVien.ThongKeKTX(req.query.kytucxa, (err, data) => {
      console.log(err);
      if (err)
        res.status(500).send({
          message:
            err.message || "Lỗi khi thống kê sinh viên ở trong ký túc xá.",
        });
      else res.send(data);
    });
  },
  ThongKeHocBong: (req, res) => {
    SinhVien.ThongKeHocBong(
      req.query.idKhoa,
      req.query.idky,
      req.query.gioiHan,
      (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Lỗi khi thống kê sinh viên có học bổng.",
          });
        else res.send(data);
      }
    );
  },
  ThongKeHocPhi: (req, res) => {
    SinhVien.ThongKeHocPhi(
      req.query.idKhoa,
      req.query.idky,
      req.query.tinhTrang,
      (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Lỗi khi thống kê tình trạng học phí sinh viên.",
          });
        else res.send(data);
      }
    );
  },
  ThongKeTheoLop: (req, res) => {
    if (!req.params.idLop) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      SinhVien.ThongKeTheoLop(req.params.idLop, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Lỗi khi xem sinh viên theo lớp.",
          });
        else res.send(data);
      });
  },
  DaDangKyHoc: (req, res) => {
    if (!req.query.idsv) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      SinhVien.DaDangKyHoc(req.query.idsv, req.query.idky, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Lỗi khi xem học phần đã đăng ký",
          });
        else res.send(data);
      });
  },
  CoTheDangKyHoc: (req, res) => {
    console.log(res.body);
    if (!req.query.idsv) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      SinhVien.CoTheDangKyHoc(req.query.idmh, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Lỗi khi xem học phần có thể đăng ký",
          });
        else res.send(data);
      });
  },
  DangKyHoc: (req, res) => {
    if (!req.query.idsv || !req.query.idLop) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      SinhVien.DangKyHoc(req.query.idsv, req.query.idLop, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Lỗi khi đăng ký học phần",
          });
        else res.send(data);
      });
  },
  HuyHocPhan: (req, res) => {
    if (!req.query.idsv || !req.query.idLop) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      SinhVien.HuyHocPhan(req.query.idsv, req.query.idLop, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Lỗi khi hủy học phần",
          });
        else res.send(data);
      });
  },
};
export default SinhVienController;
