const sql = require("./db.js");

const CtDaoTao = function (ctDaoTao) {
  this.idk = ctDaoTao.idk;
  this.tenctdt = ctDaoTao.tenctdt;
  this.noiDung = ctDaoTao.noiDung;
};

CtDaoTao.Them = (ctDaoTaoMoi, result) => {
  sql.query(
    "INSERT INTO chuongtrinhdaotao SET IDKHOA = ?, TENCTDT = ?, NOIDUNG = ?",
    [ctDaoTaoMoi.idk, ctDaoTaoMoi.tenctdt, ctDaoTaoMoi.noiDung],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã thêm chương trình đào tạo: ", {
        idtk: res.insertId,
        ...ctDaoTaoMoi,
      });
      result(null, { idtk: res.insertId, ...ctDaoTaoMoi });
    }
  );
};

CtDaoTao.Sua = (id, ctDaoTao, result) => {
  sql.query(
    "UPDATE chuongtrinhdaotao SET IDKHOA = ?, TENCTDT = ?, NOIDUNG = ?",
    [ctDaoTao.idk, ctDaoTao.tenctdt, ctDaoTao.noiDung, id],
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
        id: id,
        ...ctDaoTao,
      });
      result(null, { id: id, ...ctDaoTao });
    }
  );
};

CtDaoTao.TimKiem = (tenctdt, result) => {
  let query = "SELECT * FROM chuongtrinhdaotao";
  if (tenctdt) {
    query += ` WHERE TENCTDT LIKE '%${tenctdt}%'`;
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
