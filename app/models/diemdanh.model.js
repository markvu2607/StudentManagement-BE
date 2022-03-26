import { queryDB } from "../../database.js";

const DiemDanh = function (diemDanh) {
  if (diemDanh.idDiemDanh) this.idDiemDanh = diemDanh.idDiemDanh;
  this.thoiGianBd = diemDanh.thoiGianBd;
  this.thoiGianKt = diemDanh.thoiGianKt;
  this.idLop = diemDanh.idLop;
};

DiemDanh.Them = (diemDanhMoi, result) => {
  queryDB(
    "CALL SP_GvTaoDiemDanh(?, ?, ?);",
    [diemDanhMoi.thoiGianBd, diemDanhMoi.thoiGianKt, diemDanhMoi.idLop],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo điểm danh: ", res[0]);
      result(null, res[0]);
    }
  );
};

DiemDanh.Sua = (idDiemDanh, diemDanh, result) => {
  queryDB(
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
  queryDB(
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

DiemDanh.XemChiTietDiemDanh = (idDiemDanh, result) => {
    let query = `SELECT sinhvien.idsv, sinhvien.tensv, ctdiemdanh.trangThai
    FROM diemdanh 
    INNER JOIN ctdiemdanh ON diemdanh.idDiemDanh = ctdiemdanh.idDiemDanh
    INNER JOIN sinhvien ON ctdiemdanh.idsv = sinhvien.idsv
    Where ctdiemdanh.idDiemDanh = ${idDiemDanh};`;
    queryDB(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Xem điểm danh theo lượt điểm danh: ", res);
      result(null, res);
    });
  };

DiemDanh.XemDanhSach = (idLop, result) => {
  let query = "SELECT diemdanh.*, ctdiemdanh.trangThai FROM diemdanh INNER JOIN ctdiemdanh ON diemdanh.idDiemDanh = ctdiemdanh.idDiemDanh WHERE diemdanh.idLop = " + idLop;
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Xem điểm danh theo lớp: ", res);
    result(null, res);
  });
};

DiemDanh.SvDiemDanh = (idsv, idDiemDanh, result) => {
  queryDB("CALL SP_SvDiemDanh(?, ?);", [idsv, idDiemDanh], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Sinh viên điểm danh: ", res[0]);
    result(null, res[0]);
  });
};

export default DiemDanh;
