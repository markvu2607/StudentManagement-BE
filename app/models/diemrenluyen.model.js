const sql = require("./db.js");

const DiemRenLuyen = function (diemRenLuyen) {
  this.idsv = diemRenLuyen.idsv;
  this.kyHoc = diemRenLuyen.kyHoc;
  this.diem = diemRenLuyen.diem;
};

DiemRenLuyen.Them = (diemRenLuyen, result) => {
  sql.query(
    "INSERT INTO diemrenluyen SET idsv = ?, kyHoc = ?, diem = ?",
    [diemRenLuyen.idsv, diemRenLuyen.kyHoc, diemRenLuyen.diem],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã thêm điểm rèn luyện: ", {
        iddrl: res.insertId,
        ...diemRenLuyen,
      });
      result(null, { iddrl: res.insertId, ...diemRenLuyen });
    }
  );
};
DiemRenLuyen.Xem = (idKhoa, kyHoc, result) => {
  let query =
    "SELECT diemrenluyen.idsv, sinhvien.tensv, khoa.tenKhoa, diemrenluyen.kyHoc, diemrenluyen.diem" +
    " FROM diemrenluyen INNER JOIN (sinhvien INNER JOIN khoa ON sinhvien.idKhoa = khoa.idKhoa) ON diemrenluyen.idsv = sinhvien.idsv";
  if (idKhoa || kyHoc) {
    query += ` WHERE`;
    if (idKhoa) {
      query += ` sinhvien.idKhoa = '${idKhoa}'`;
    }
    if (kyHoc) {
      query += ` diemrenluyen.kyHoc LIKE '%${kyHoc}%'`;
    }
  } else if (idKhoa && kyHoc)
    query += ` WHERE sinhvien.idKhoa = '%${idKhoa}%' AND diemrenluyen.kyHoc LIKE '%${kyHoc}%'`;
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
module.exports = DiemRenLuyen;
