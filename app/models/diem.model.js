const sql = require("./db.js");

const Diem = function (diem) {
  this.diemQuaTrinh = diem.diemQuaTrinh;
  this.diemThi = diem.diemThi;
  this.diemTrungBinh = diem.diemTrungBinh;
  this.diemHeSo4 = diem.diemHeSo4;
  this.idsv = diem.idsv;
  this.idLop = diem.idLop;
};

Diem.Them = (diemMoi, result) => {
  sql.query(
    "INSERT INTO diem SET diemQuaTrinh = ?, diemThi = ?, diemTrungBinh = ?, diemHeSo4 = ?, idsv = ?, idLop = ?",
    [
      diemMoi.diemQuaTrinh,
      diemMoi.diemThi,
      diemMoi.diemTrungBinh,
      diemMoi.diemHeSo4,
      diemMoi.idsv,
      diemMoi.idLop,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã thêm điểm: ", {
        idDiem: res.insertId,
        ...diemMoi,
      });
      result(null, { idDiem: res.insertId, ...diemMoi });
    }
  );
};

Diem.Sua = (idDiem, diem, result) => {
  sql.query(
    "UPDATE diem SET diemQuaTrinh = ?, diemThi = ?, diemTrungBinh = ?, diemHeSo4 = ?, idsv = ?, idLop = ? WHERE idDiem = ?",
    [
      diem.diemQuaTrinh,
      diem.diemThi,
      diem.diemTrungBinh,
      diem.diemHeSo4,
      diem.idsv,
      diem.idLop,
      idDiem,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã sửa điểm: ", {
        idDiem: idDiem,
        ...diem,
      });
      result(null, { idDiem: idDiem, ...diem });
    }
  );
};

Diem.Xem = (idsv, result) => {
  sql.query(
    "SELECT diem.idDiem, sinhvien.idsv, sinhvien.tenSv, lophocphan.idmh, diem.diemQuaTrinh, diem.diemThi, diem.diemTrungBinh, diem.diemHeSo4" +
      " FROM sinhvien INNER JOIN (diem INNER JOIN lophocphan ON diem.idLop = lophocphan.idLop) ON sinhvien.idsv = diem.idsv" +
      " WHERE sinhvien.idsv = ?",
    idsv,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Thống kê điểm rèn luyện: ", res);
      result(null, res);
    }
  );
};

Diem.TimKiem = (tuKhoa, result) => {
  let query =
    "SELECT lophocphan.idmh, lophocphan.tenLop, sinhvien.idsv, sinhvien.tensv, diem.diemQuaTrinh, diem.diemThi, diem.diemTrungBinh, diem.diemHeSo4" +
    " FROM sinhvien INNER JOIN (diem INNER JOIN lophocphan ON diem.idLop = lophocphan.idLop) ON sinhvien.idsv = diem.idsv";
  if (tuKhoa) query += ` WHERE lophocphan.tenLop LIKE '%${tuKhoa}%' OR lophocphan.idLop LIKE '%${tuKhoa}%'`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Thống kê điểm rèn luyện: ", res);
    result(null, res);
  });
};
module.exports = Diem;
