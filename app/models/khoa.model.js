const sql = require("./db.js");

const Khoa = function (khoa) {
  this.tenKhoa = khoa.tenKhoa;
};

Khoa.Them = (khoaMoi, result) => {
  sql.query("INSERT INTO khoa SET TENKHOA = ?", khoaMoi.tenKhoa, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Đã tạo khoa: ", { id: res.insertId, ...khoaMoi });
    result(null, { id: res.insertId, ...khoaMoi });
  });
};

Khoa.Sua = (id, khoa, result) => {
  sql.query(
    "UPDATE khoa SET TENKHOA = ? WHERE IDKHOA = ?",
    [khoa.tenKhoa, id],
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
      console.log("Đã cập nhật khoa: ", { id: id, ...khoa });
      result(null, { id: id, ...khoa });
    }
  );
};

Khoa.TimKiem = (tuKhoa, result) => {
  let query = "SELECT * FROM khoa";
  if (tuKhoa) {
    query += ` WHERE TENKHOA LIKE '%${tuKhoa}%' OR IDKHOA LIKE '%${tuKhoa}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Tìm thấy khoa: ", res);
    result(null, res);
  });
};
module.exports = Khoa;
