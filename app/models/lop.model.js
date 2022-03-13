import { queryDB } from "../../database.js";

const Lop = function (lop) {
  this.idmh = lop.idmh;
  this.tenLop = lop.tenLop;
  this.phongHoc = lop.phongHoc;
  this.soLuong = lop.soLuong;
  this.thoiGianBd = lop.thoiGianBd;
  this.thoiGianKt = lop.thoiGianKt;
  this.trangThai = lop.trangThai;
  this.idgv = lop.idgv;
  this.idky = lop.idky;
};

Lop.Them = (lopMoi, result) => {
  queryDB(
    "INSERT INTO lophocphan SET idmh = ?, tenLop = ?, phongHoc = ?, soLuong = ?, thoiGianBd = ?, thoiGianKt = ?, trangThai = ?, idgv = ?, idky = ?",
    [
      lopMoi.idmh,
      lopMoi.tenLop,
      lopMoi.phongHoc,
      lopMoi.soLuong,
      lopMoi.thoiGianBd,
      lopMoi.thoiGianKt,
      lopMoi.trangThai,
      lopMoi.idgv,
      lopMoi.idky,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo lớp: ", { idLop: res.insertId, ...lopMoi });
      result(null, { idLop: res.insertId, ...lopMoi });
    }
  );
};

Lop.Sua = (idLop, lop, result) => {
  queryDB(
    "UPDATE lophocphan SET idmh = ?, tenLop = ?, phongHoc = ?, soLuong = ?, thoiGianBd = ?, thoiGianKt = ?, trangThai = ?, idgv = ?, idky = ? WHERE idLop = ?",
    [
      lop.idmh,
      lop.tenLop,
      lop.phongHoc,
      lop.soLuong,
      lop.thoiGianBd,
      lop.thoiGianKt,
      lop.trangThai,
      lop.idgv,
      lop.idky,
      idLop,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(res);
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Đã cập nhật lớp: ", { idLop: idLop, ...lop });
      result(null, { idLop: idLop, ...lop });
    }
  );
};

Lop.Dung = (idLop, result) => {
  queryDB("UPDATE lophocphan SET trangThai = 0 WHERE idLop = ?", idLop, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Đã dừng lớp: ", { idLop: idLop });
    result(null, idLop);
  });
};

Lop.Xem = (idLop, result) => {
  queryDB(`SELECT lophocphan.*, monhoc.tenMon, giangvien.tengv, kyHoc.tenKyHoc
  FROM lophocphan INNER JOIN kyHoc ON lophocphan.idky = kyHoc.idky
  INNER JOIN giangvien ON lophocphan.idgv = giangvien.idgv
  INNER JOIN monhoc ON monhoc.idmh = monhoc.idmh
  WHERE idLop = ${idLop}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Xem lớp: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Lop.TimKiem = (idky, tenLop, result) => {
  let query = `SELECT lophocphan.*, monhoc.tenMon, giangvien.tengv, kyHoc.tenKyHoc`+
  ` FROM lophocphan INNER JOIN kyHoc ON lophocphan.idky = kyHoc.idky`+
  ` INNER JOIN giangvien ON lophocphan.idgv = giangvien.idgv`+
  ` INNER JOIN monhoc ON lophocphan.idmh = monhoc.idmh`;
  if (idky || tenLop) {
    query += ` WHERE kyHoc.idky LIKE '${idky}' AND lophocphan.tenLop LIKE '%${tenLop}%'`;
  }
  console.log(query);
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Tìm thấy lớp: ", res);
    result(null, res);
  });
};


export default Lop;
