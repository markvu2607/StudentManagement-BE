import { queryDB } from "../../database.js";

const BangTin = function (bangTin) {
  this.noiDung = bangTin.noiDung;
  this.thoiGianTao = new Date();
};

BangTin.Them = (bangTinMoi, result) => {
  queryDB(
    "INSERT INTO bangtin SET noiDung = ?, thoiGianTao = ?",
    [bangTinMoi.noiDung, bangTinMoi.thoiGianTao],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo tài khoản: ", { idbt: res.insertId, ...bangTinMoi });
      result(null, { idbt: res.insertId, ...bangTinMoi });
    }
  );
};

BangTin.Xem = (result) => {
  queryDB("SELECT * FROM bangtin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Xem bảng tin: ", res);
    result(null, res);
  });
};

export default BangTin