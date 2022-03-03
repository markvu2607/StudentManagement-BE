const sql = require("./db.js");

const LopHocPhan = function (lop) {
  this.idmh = lop.idmh;
  this.tenLop = lop.tenLop;
  this.phongHoc = lop.phongHoc;
  this.soLuong = lop.soLuong;
  this.thoiGianBd = lop.thoiGianBd;
  this.thoiGianKt = lop.thoiGianKt;
  this.trangThai = lop.trangThai;
};

LopHocPhan.Them = (lopMoi, result) => {
  sql.query(
    "INSERT INTO lophocphan SET idmh = ?, tenLop = ?, phongHoc = ?, soLuong = ?, thoiGianBd = ?, thoiGianKt = ?, trangThai = ?",
    [
      lopMoi.idmh,
      lopMoi.tenLop,
      lopMoi.phongHoc,
      lopMoi.soLuong,
      lopMoi.thoiGianBd,
      lopMoi.thoiGianKt,
      lopMoi.trangThai,
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

LopHocPhan.Sua = (idLop, lop, result) => {
  sql.query(
    "UPDATE lophocphan SET idmh = ?, tenLop = ?, phongHoc = ?, soLuong = ?, thoiGianBd = ?, thoiGianKt = ?, trangThai = ? WHERE idLop = ?",
    [
      lop.idmh,
      lop.tenLop,
      lop.phongHoc,
      lop.soLuong,
      lop.thoiGianBd,
      lop.thoiGianKt,
      lop.trangThai,
      idLop,
    ],
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
      console.log("Đã cập nhật lớp: ", { idLop: idLop, ...lop });
      result(null, { idLop: idLop, ...lop });
    }
  );
};

LopHocPhan.Dung = (idLop, result) => {
  sql.query("UPDATE lophocphan SET trangThai = 0 WHERE idLop = ?", idLop, (err, res) => {
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

LopHocPhan.Xem = (idLop, result) => {
  sql.query(`SELECT * FROM lophocphan WHERE idLop = ${idLop}`, (err, res) => {
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

LopHocPhan.TimKiem = (tenLop, result) => {
  let query = "SELECT * FROM lophocphan";
  if (tenLop) {
    query += ` WHERE tenLop LIKE '%${tenLop}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Tìm thấy lớp: ", res);
    result(null, res);
  });
};
module.exports = LopHocPhan;
