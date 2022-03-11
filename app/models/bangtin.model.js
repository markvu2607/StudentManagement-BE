import { queryDB } from "../../database.js";

const BangTin = function (bangTin) {
  this.noiDung = bangTin.noiDung;
};

BangTin.Them = (bangTinMoi, result) => {
  queryDB(
    "INSERT INTO bangtin SET noiDung = ?",
    [bangTinMoi.noiDung, bangTinMoi.thoiGianTao],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo bản tin: ", { idbt: res.insertId, ...bangTinMoi });
      result(null, { idbt: res.insertId, ...bangTinMoi });
    }
  );
};

BangTin.Xem = (result) => {
  queryDB("SELECT * FROM bangtin ORDER BY thoiGianTao DESC LIMIT 5", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Xem bảng tin: ", res);
    result(null, res);
  });
};

BangTin.Xoa = (idbt, result) => {
  queryDB(
    "DELETE FROM bangtin WHERE idbt=?;", idbt,
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
      console.log("Đã khóa bảng tin: ", { idbt: idbt });
      result(null, idbt);
    }
  );
};

export default BangTin