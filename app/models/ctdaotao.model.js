const sql = require("./db.js");

const CtDaoTao = function (ctDaoTao) {
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
      console.log("Đã thêm chương trình đào tạo: ", {
        idctdt: res.insertId,
        ...ctDaoTaoMoi,
      });
      result(null, { idctdt: res.insertId, ...ctDaoTaoMoi });
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
      console.log("Đã cập nhật chương trình đào tạo: ", {
        idctdt: idctdt,
        ...ctDaoTao,
      });
      result(null, { idctdt: idctdt, ...ctDaoTao });
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
      console.log("Xem chương trình đào tạo: ", res[0]);
      result(null, res[0]);
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
