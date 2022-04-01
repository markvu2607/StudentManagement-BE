import { queryDB } from "../../database.js";

const Khoa = function (khoa) {
  this.tenKhoa = khoa.tenKhoa;
};

Khoa.Them = (khoaMoi, result) => {
  queryDB("INSERT INTO khoa SET tenKhoa = ?", khoaMoi.tenKhoa, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Đã tạo khoa: ", { idKhoa: res.insertId, ...khoaMoi });
    result(null, { idKhoa: res.insertId, ...khoaMoi });
  });
};

Khoa.Sua = (idKhoa, khoa, result) => {
  queryDB(
    "UPDATE khoa SET tenKhoa = ? WHERE idKhoa = ?",
    [khoa.tenKhoa, idKhoa],
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
      console.log("Đã cập nhật khoa: ", { idKhoa: idKhoa, ...khoa });
      result(null, { idKhoa: idKhoa, ...khoa });
    }
  );
};

Khoa.Xem = (idKhoa, result) => {
  queryDB(`SELECT * FROM khoa WHERE idKhoa = ${idKhoa}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Xem khoa: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Khoa.TimKiem = (tuKhoa, result) => {
  let query = "SELECT * FROM khoa";
  if (tuKhoa) {
    query += ` WHERE tenKhoa LIKE '%${tuKhoa}%' OR idKhoa LIKE '%${tuKhoa}%'`;
  }
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Tìm thấy khoa: ", res);
    result(null, res);
  });
};

export default Khoa;
