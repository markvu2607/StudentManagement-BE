import { queryDB } from "../../database.js";

const TaiLieu = function (taiLieu) {
  this.tenTaiLieu = taiLieu.tenTaiLieu;
  this.duongDan = taiLieu.duongDan;
  this.thoiGianDang = taiLieu.thoiGianDang;
  this.idLop = taiLieu.idLop;
};

TaiLieu.Them = (taiLieuMoi, result) => {
  queryDB(
    "INSERT INTO taiLieu SET tenTaiLieu = ?, duongDan = ?, idLop = ?",
    [taiLieuMoi.tenTaiLieu, taiLieuMoi.duongDan, taiLieuMoi.idLop],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã thêm tài liệu: ", { idtl: res.insertId, ...taiLieuMoi });
      result(null, { idtl: res.insertId, ...taiLieuMoi });
    }
  );
};

TaiLieu.XemTheoLop = (idLop, result) => {
  queryDB(
    `SELECT taiLieu.*, lophocphan.tenLop FROM taiLieu INNER JOIN lophocphan ON taiLieu.idLop = lophocphan.idLop WHERE idLop = ${idLop}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Xem tài liệu theo lớp: ", res);
      result(null, res);
      return;
    }
  );
};

TaiLieu.Xem = (idtl, result) => {
  queryDB(`SELECT * FROM taiLieu WHERE idtl = ${idtl}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Xem tài liệu: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

export default TaiLieu;
