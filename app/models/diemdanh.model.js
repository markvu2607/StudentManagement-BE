const sql = require("./db.js");

const DiemDanh = function (diemDanh) {
  this.thoiGianBd = diemDanh.thoiGianBd;
  this.thoiGianKt = diemDanh.thoiGianKt;
  this.idLop = diemDanh.idLop;
};

// const CtDiemDanh = function (ctDiemDanh) {
//   this.thoiGianDd = ctDiemDanh.thoiGianDd;
//   this.trangThai = ctDiemDanh.trangThai;
//   this.idDiemDanh = ctDiemDanh.idDiemDanh;
//   this.idsv = ctDiemDanh.idsv;
// };

DiemDanh.Them = (diemDanhMoi, result) => {
  sql.query(
    "INSERT INTO diemdanh SET thoiGianBd = ?, thoiGianKt = ?, idLop = ?;",
    [diemDanhMoi.thoiGianBd, diemDanhMoi.thoiGianKt, diemDanhMoi.idLop],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo điểm danh: ", {
        idDiemDanh: res.insertId,
        ...diemDanhMoi,
      });
      result(null, { idDiemDanh: res.insertId, ...diemDanhMoi });
    }
  );
};

DiemDanh.Sua = (idDiemDanh, diemDanh, result) => {
  sql.query(
    "UPDATE diemdanh SET thoiGianBd = ?, thoiGianKt = ?, idLop = ? WHERE idDiemDanh = ?",
    [diemDanh.thoiGianBd, diemDanh.thoiGianKt, diemDanh.idLop, idDiemDanh],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Đã cập nhật lớp: ", { idDiemDanh: idDiemDanh, ...diemDanh });
      result(null, { idDiemDanh: idDiemDanh, ...diemDanh });
    }
  );
};

DiemDanh.Xem = (idDiemDanh, result) => {
  sql.query(
    `SELECT * FROM diemdanh WHERE idDiemDanh = ${idDiemDanh}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Xem điểm danh: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

DiemDanh.XemDanhSach = (idLop, result) => {
  let query = "SELECT * FROM diemdanh";
  if (idLop) query += " WHERE idLop = " + idLop;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Xem điểm danh theo lớp: ", res);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

// DiemDanh.SvXemDiemDanh = (idLop, result) => {
//   sql.query(`SELECT * FROM ctdiemdanh WHERE idDiemDanh = ${idLop}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
//     if (res.length) {
//       console.log("Sinh viên xem điểm danh theo lớp: ", res);
//       result(null, res[0]);
//       return;
//     }
//     result({ kind: "not_found" }, null);
//   });
// };

// DiemDanh.SvDiemDanh = (CtDiemDanh, result) => {
//   sql.query(
//     "INSERT INTO ctdiemdanh SET trangThai = ?, thoiGianDd = ?, idsv = ?, idDiemDanh = ?;",
//     [
//       CtDiemDanh.trangThai,
//       CtDiemDanh.thoiGianDd,
//       CtDiemDanh.idsv,
//       CtDiemDanh.idDiemDanh,
//     ],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//       }
//       console.log("Đã thêm chi tiết điểm danh: ", { CtDiemDanh });
//       result(null, { CtDiemDanh });
//     }
//   );
// };

module.exports = DiemDanh;
