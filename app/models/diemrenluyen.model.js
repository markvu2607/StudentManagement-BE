import { queryDB } from "../../database.js";

const DiemRenLuyen = function (diemRenLuyen) {
  this.idsv = diemRenLuyen.idsv;
  this.idky = diemRenLuyen.idky;
  this.diem = diemRenLuyen.diem;
};

DiemRenLuyen.Them = (diemRenLuyen, result) => {
  queryDB(
    "INSERT INTO diemrenluyen SET idsv = ?, idky = ?, diem = ?",
    [diemRenLuyen.idsv, diemRenLuyen.idky, diemRenLuyen.diem],
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
      result(null, {  ...diemRenLuyen });
    }
  );
};
DiemRenLuyen.TimKiem = (idKhoa, idky, tensv, result) => {
  let query =
    "SELECT diemrenluyen.idsv, sinhvien.tensv, khoa.tenKhoa, kyHoc.tenKyHoc, diemrenluyen.diem" +
    " FROM diemrenluyen INNER JOIN sinhvien ON diemrenluyen.idsv = sinhvien.idsv" +
    " INNER JOIN khoa ON sinhvien.idKhoa = khoa.idKhoa" +
    " INNER JOIN kyHoc ON kyHoc.idky = diemrenluyen.idky";
 if (idKhoa || idky || tensv)
    query += ` WHERE sinhvien.idKhoa LIKE '%${idKhoa}%' AND kyHoc.idky LIKE '%${idky}%' AND sinhvien.tensv LIKE '%${tensv}%'`;
    console.log(query);
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Thống kê điểm rèn luyện: ", res);
    result(null, res);
  });
};

export default DiemRenLuyen;
