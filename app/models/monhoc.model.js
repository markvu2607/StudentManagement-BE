const sql = require("./db.js");

const MonHoc = function (monHoc) {
  this.tenMon = monHoc.tenMon;
  this.tlMonHoc = monHoc.tlMonHoc;
};

MonHoc.Them = (monHocMoi, result) => {
  sql.query(
    "INSERT INTO monhoc SET TENMON = ?, TLMONHOC = ?",
    [monHocMoi.tenMon, monHocMoi.tlMonHoc],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo môn học: ", { id: res.insertId, ...monHocMoi });
      result(null, { id: res.insertId, ...monHocMoi });
    }
  );
};

MonHoc.Sua = (id, monHoc, result) => {
  sql.query(
    "UPDATE monhoc SET TENMON = ?, TLMONHOC = ? WHERE IDMH = ?",
    [monHoc.tenMon, monHoc.tlMonHoc, id],
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
      console.log("Đã cập nhật môn học: ", { id: id, ...monHoc });
      result(null, { id: id, ...monHoc });
    }
  );
};

MonHoc.TimKiem = (tenMon, result) => {
  let query = "SELECT * FROM monhoc";
  if (tenMon) {
    query += ` WHERE TENMON LIKE '%${tenMon}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Tìm thấy môn học: ", res);
    result(null, res);
  });
};
module.exports = MonHoc;
