import { queryDB } from "../../database.js";

const KyHoc = function (kyHoc) {
  this.tenKyHoc = kyHoc.tenKyHoc;
};

KyHoc.Them = (kyHocMoi, result) => {
  queryDB(
    "INSERT INTO kyHoc SET tenKyHoc = ?",
    [kyHocMoi.tenKyHoc],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo kỳ học: ", { idky: res.insertId, ...kyHocMoi });
      result(null, { idky: res.insertId, ...kyHocMoi });
    }
  );
};

KyHoc.Sua = (idky, kyHoc, result) => {
  queryDB(
    "UPDATE kyHoc SET tenKyHoc = ? WHERE idky = ?",
    [
        kyHoc.tenKyHoc,
        idky,
    ],
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
      console.log("Đã cập nhật kỳ học: ", { idky: idky, ...kyHoc });
      result(null, { idky: idky, ...kyHoc });
    }
  );
};

KyHoc.XemDanhSach = (result) => {
  queryDB("SELECT * FROM kyHoc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

KyHoc.Xem = (idky, result) => {
  queryDB(`SELECT * FROM kyHoc WHERE idky = ${idky}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Xem kỳ học: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

export default KyHoc;
