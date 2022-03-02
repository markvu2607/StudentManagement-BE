const sql = require("./db.js");

const Lop = function (lop) {
  this.idmh = lop.idmh;
  this.tenLop = lop.tenLop;
  this.phongHoc = lop.phongHoc;
  this.soLuong = lop.soLuong;
  this.thoiGianBd = lop.thoiGianBd;
  this.thoiGianKt = lop.thoiGianKt;
  this.trangThai = lop.trangThai;
};

Lop.Them = (lopMoi, result) => {
  sql.query(
    "INSERT INTO lop SET IDMH = ?, TENLOP = ?, PHONGHOC = ?, SOLUONG = ?, THOIGIANBD = ?, THOIGIANKT = ?, TRANGTHAI = ?",
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
      console.log("Đã tạo lớp: ", { id: res.insertId, ...lopMoi });
      result(null, { id: res.insertId, ...lopMoi });
    }
  );
};

Lop.Sua = (id, lop, result) => {
  sql.query(
    "UPDATE lop SET IDMH = ?, TENLOP = ?, PHONGHOC = ?, SOLUONG = ?, THOIGIANBD = ?, THOIGIANKT = ?, TRANGTHAI = ? WHERE IDLOP = ?",
    [
      lop.idmh,
      lop.tenLop,
      lop.phongHoc,
      lop.soLuong,
      lop.thoiGianBd,
      lop.thoiGianKt,
      lop.trangThai,
      id,
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
      console.log("Đã cập nhật lớp: ", { id: id, ...lop });
      result(null, { id: id, ...lop });
    }
  );
};

Lop.Dung = (id, result) => {
    sql.query(
      "UPDATE lop SET TRANGTHAI = 0 WHERE IDLOP = ?", id,
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
        console.log("Đã dừng lớp: ", { id: id });
        result(null, id);
      }
    );
  };

Lop.TimKiem = (tenLop, result) => {
  let query = "SELECT * FROM lop";
  if (tenLop) {
    query += ` WHERE TENLOP LIKE '%${tenLop}%'`;
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
module.exports = Lop;
