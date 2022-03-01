const sql = require("./db.js");

const BangTin = function (sinhVien) {
  this.noiDung = sinhVien.noiDung;
};

BangTin.Them = (bangTinMoi, result) => {
  sql.query(
    "INSERT INTO bangtin SET NOIDUNG = ?",
    [bangTinMoi.noiDung],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo tài khoản: ", { id: res.insertId, ...bangTinMoi });
      result(null, { id: res.insertId, ...bangTinMoi });
    }
  );
};

BangTin.Xem = (result) => {
  sql.query("SELECT * FROM bangtin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Xem bảng tin: ", res);
    result(null, res);
  });
};
module.exports = BangTin;