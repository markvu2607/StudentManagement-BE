import { queryDB } from "../../database.js";


const MonHoc = function (monHoc) {
  this.tenMon = monHoc.tenMon;
  this.tlMonHoc = monHoc.tlMonHoc;
  this.soTinChi = monHoc.soTinChi;
  this.tienHoc = monHoc.tienHoc;
};

MonHoc.Them = (monHocMoi, result) => {
  queryDB(
    "INSERT INTO monhoc SET tenMon = ?, tlMonHoc = ?, soTinChi = ?, tienHoc = ?",
    [
      monHocMoi.tenMon,
      monHocMoi.tlMonHoc,
      monHocMoi.soTinChi,
      monHocMoi.tienHoc,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo môn học: ", { idmh: res.insertId, ...monHocMoi });
      result(null, { idmh: res.insertId, ...monHocMoi });
    }
  );
};

MonHoc.Sua = (idmh, monHoc, result) => {
  queryDB(
    "UPDATE monhoc SET tenMon = ?, tlMonHoc = ?, soTinChi = ?, tienHoc = ? WHERE idmh = ?",
    [monHoc.tenMon, monHoc.tlMonHoc, monHoc.soTinChi, monHoc.tienHoc, idmh],
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
      console.log("Đã cập nhật môn học: ", { idmh: idmh, ...monHoc });
      result(null, { idmh: idmh, ...monHoc });
    }
  );
};

MonHoc.Xem = (idmh, result) => {
  queryDB(`SELECT * FROM monhoc WHERE idmh = ${idmh}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Xem môn học: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

MonHoc.TimKiem = (tenMon, result) => {
  let query = "SELECT * FROM monhoc";
  if (tenMon) {
    query += ` WHERE tenmh LIKE '%${tenMon}%'`;
  }
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Tìm thấy môn học: ", res);
    result(null, res);
  });
};

export default MonHoc;
