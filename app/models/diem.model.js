import { queryDB } from "../../database.js";

const Diem = function (diem) {
  this.diemQuaTrinh = diem.diemQuaTrinh;
  this.diemThi = diem.diemThi;
  this.diemTrungBinh = diem.diemTrungBinh;
  this.diemHeSo4 = diem.diemHeSo4;
  this.idsv = diem.idsv;
  this.idLop = diem.idLop;
};

Diem.Them = (idDiem, diemMoi, result) => {
  queryDB(
    "UPDATE diem SET diemQuaTrinh = ?, diemThi = ?, diemTrungBinh = ?, diemHeSo4 = ?, idsv = ?, idLop = ? WHERE idDiem = ?",
    [
      diemMoi.diemQuaTrinh,
      diemMoi.diemThi,
      diemMoi.diemTrungBinh,
      diemMoi.diemHeSo4,
      diemMoi.idsv,
      diemMoi.idLop,
      idDiem,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã thêm điểm: ", {
        idDiem: idDiem,
        ...diemMoi,
      });
      result(null, { idDiem: idDiem, ...diemMoi });
    }
  );
};

Diem.Sua = (idDiem, diem, result) => {
  queryDB(
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
  queryDB(
    "SELECT diem.idDiem, sinhvien.idsv, sinhvien.tenSv, lophocphan.idmh, lophocphan.tenLop, diem.diemQuaTrinh, diem.diemThi, diem.diemTrungBinh, diem.diemHeSo4" +
      " FROM sinhvien INNER JOIN (diem INNER JOIN lophocphan ON diem.idLop = lophocphan.idLop) ON sinhvien.idsv = diem.idsv" +
      " WHERE sinhvien.idsv = ?",
    idsv,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Thống kê điểm: ", res);
      result(null, res);
    }
  );
};

Diem.TimKiem = (tenLop, idky, result) => {
  let query =
    "SELECT diem.idDiem, sinhvien.idsv, sinhvien.tensv, lophocphan.idLop, lophocphan.tenLop, diem.diemQuaTrinh, diem.diemThi, diem.diemTrungBinh, diem.diemHeSo4" +
    " FROM sinhvien" +
    " INNER JOIN diem ON sinhvien.idsv = diem.idsv" +
    " INNER JOIN lophocphan ON diem.idLop = lophocphan.idLop";
  if (tenLop || idky)
    query += ` WHERE lophocphan.tenLop LIKE '%${tenLop}%' AND lophocphan.idky LIKE '%${idky}%'`;
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Thống kê điểm: ", res);
    result(null, res);
  });
};
export default Diem;
