import { queryDB } from "../../database.js";

const CtDaoTao = function (ctDaoTao) {
  this.tenctdt = ctDaoTao.tenctdt;
  this.idKhoa = ctDaoTao.idKhoa;
};

CtDaoTao.Them = (ctDaoTaoMoi, result) => {
  queryDB(
    "INSERT INTO ctdaotao SET tenctdt = ?, idKhoa = ?",
    [ctDaoTaoMoi.tenctdt, ctDaoTaoMoi.moTa, ctDaoTaoMoi.idKhoa],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã thêm chương trình đào tạo: ", {
        idctdt: res.insertId,
        ...ctDaoTaoMoi,
      });
      result(null, { idctdt: res.insertId, ...ctDaoTaoMoi });
    }
  );
};

CtDaoTao.Sua = (idctdt, ctDaoTao, result) => {
  queryDB(
    "UPDATE ctdaotao SET tenctdt = ?, idKhoa = ? WHERE idctdt = ?",
    [ctDaoTao.tenctdt, ctDaoTao.moTa, ctDaoTao.idKhoa, idctdt],
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
        idctdt: idctdt,
        ...ctDaoTao,
      });
      result(null, { idctdt: idctdt, ...ctDaoTao });
    }
  );
};

CtDaoTao.Xem = (idctdt, result) => {
  queryDB(`SELECT * FROM ctdaotao WHERE idctdt = ${idctdt}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Xem chương trình đào tạo: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

CtDaoTao.TimKiem = (idKhoa, tenctdt, result) => {
  let query = "SELECT ctdaotao.*, khoa.tenKhoa FROM ctdaotao INNER JOIN khoa ON khoa.idKhoa = ctdaotao.idKhoa";
  if (tenctdt || idKhoa) {
    query += ` WHERE khoa.idKhoa LIKE '%${idKhoa}%' AND ctdaotao.tenctdt LIKE '%${tenctdt}%'`;
  }
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Tìm thấy chương trình đào tạo: ", res);
    result(null, res);
  });
};

CtDaoTao.XemChiTiet = (idctdt, result) => {
  queryDB(
    `SELECT monhoc.* FROM ctchuongtrinh INNER JOIN monhoc ON ctchuongtrinh.idmh = monhoc.idmh WHERE ctchuongtrinh.idctdt = ${idctdt};`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Xem chi tiết chương trình đào tạo: ", res);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

CtDaoTao.ThemChiTiet = (idctdt, idmh, result) => {
  queryDB(
    "INSERT INTO ctchuongtrinh SET idctdt = ?, idmh = ?",
    [idctdt, idmh],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log(
        `Đã thêm môn học idmh ${idmh} vào chương trình đào tạo idctdt ${idctdt}`
      );
      result(null, { idctdt: idctdt, idmh: idmh });
    }
  );
};

CtDaoTao.XoaChiTiet = (idctdt, idmh, result) => {
  queryDB(
    `DELETE FROM ctchuongtrinh WHERE (idctdt = ?) and (idmh = ?);`,
    [idctdt, idmh],
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
      console.log("Đã xóa môn học khỏi chương trình đào tạo.");
      result(null, res);
    }
  );
};
export default CtDaoTao;
