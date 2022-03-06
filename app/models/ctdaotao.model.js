const sql = require("./db.js");

const CtDaoTao = function (idctdt, ctDaoTao) {
  this.tenctdt = ctDaoTao.tenctdt;
  this.moTa = ctDaoTao.moTa;
  this.idKhoa = ctDaoTao.idKhoa;
};

CtDaoTao.Them = (ctDaoTaoMoi, result) => {
  sql.query(
    "INSERT INTO ctdaotao SET tenctdt = ?, moTa = ?, idKhoa = ?",
    [ctDaoTaoMoi.tenctdt, ctDaoTaoMoi.moTa, ctDaoTaoMoi.idKhoa],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      let ctdt = { idctdt: res.insertId, ...ctDaoTaoMoi };
      console.log("Đã thêm chương trình đào tạo: ", ctdt);
      result(null, ctdt);
    }
  );
};

CtDaoTao.Sua = (idctdt, ctDaoTao, result) => {
  sql.query(
    "UPDATE ctdaotao SET tenctdt = ?, moTa = ?, idKhoa = ? WHERE = ?",
    [ctDaoTao.tenctdt, ctDaoTao.moTa, ctDaoTao.idKhoa, idctdt],
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
      let ctdt = { idctdt: idctdt, ...ctDaoTao };
      console.log("Đã cập nhật chương trình đào tạo: ", ctdt);
      result(null, ctdt);
    }
  );
};

CtDaoTao.Xem = (idctdt, result) => {
  sql.query(`SELECT * FROM ctdaotao WHERE idctdt = ${idctdt}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      let ctdt = { idctdt: idctdt, ...res[0] };
      console.log("Xem chương trình đào tạo: ", ctdt);
      result(null, ctdt);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

CtDaoTao.TimKiem = (tenctdt, result) => {
  let query = "SELECT * FROM ctdaotao";
  if (tenctdt) {
    query += ` WHERE tenctdt LIKE '%${tenctdt}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Tìm thấy chương trình đào tạo: ", res);
    result(null, res);
  });
};
module.exports = CtDaoTao;

CtDaoTao.XemChiTiet = (idctdt, result) => {
  sql.query(
    `SELECT monhoc.* FROM ctchuongtrinh INNER JOIN monhoc ON ctchuongtrinh.idmh = monhoc.idmh WHERE ctchuongtrinh.idctdt = ${idctdt};`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Xem chi tiết chương trình đào tạo: ", res);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

CtDaoTao.ThemChiTiet = (idctdt, idmh, result) => {
  sql.query(
    "INSERT INTO ctchuongtrinh SET idctdt = ?, idmh = ?",
    [idctdt, idmh],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log(
        `Đã thêm môn học idmh ${idmh} vào chương trình đào tạo idctdt ${idctdt}`
      );
      result(null, { idctdt: idctdt, idmh: idmh });
    }
  );
};

CtDaoTao.XoaChiTiet = (idctdt, idmh, result) => {
  sql.query(
    `DELETE FROM ctchuongtrinh WHERE (idctdt = ?) and (idmh = ?);`,
    [idctdt, idmh],
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
      console.log("Đã xóa môn học khỏi chương trình đào tạo.");
      result(null, res);
    }
  );
};
