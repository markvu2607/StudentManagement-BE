const sql = require("./db.js");

const SinhVien = function (sinhVien) {
  this.tenSV = sinhVien.tenSV;
  this.ngaySinh = sinhVien.ngaySinh;
  this.laNam = sinhVien.laNam;
  this.kyTucXa = sinhVien.kyTucXa;
  this.queQuan = sinhVien.queQuan;
  this.diaChi = sinhVien.diaChi;
  this.sdt = sinhVien.sdt;
  this.cccd = sinhVien.cccd;
  this.tenBo = sinhVien.tenBo;
  this.namSinhBo = sinhVien.namSinhBo;
  this.ngheNghiepBo = sinhVien.ngheNghiepBo;
  this.sdtBo = sinhVien.sdtBo;
  this.tenMe = sinhVien.tenMe;
  this.namSinhMe = sinhVien.namSinhMe;
  this.ngheNghiepMe = sinhVien.ngheNghiepMe;
  this.sdtMe = sinhVien.sdtMe;
  this.idKhoa = sinhVien.idKhoa;
  this.idtk = sinhVien.idtk;
};

SinhVien.Them = (sinhVienMoi, result) => {
  sql.query(
    "INSERT INTO sinhvien SET tenSV = ?, ngaySinh = ?, laNam = ?, kyTucXa = ?, queQuan = ?, diaChi = ?, sdt = ?, cccd = ?, " +
      "tenBo = ?, namSinhBo = ?, ngheNghiepBo = ?, sdtBo = ?, tenMe = ?, namSinhMe = ?, ngheNghiepMe = ?, sdtMe = ?, idKhoa = ?, idtk = ?",
    [
      sinhVienMoi.tenSV,
      sinhVienMoi.ngaySinh,
      sinhVienMoi.laNam,
      sinhVienMoi.kyTucXa,
      sinhVienMoi.queQuan,
      sinhVienMoi.diaChi,
      sinhVienMoi.sdt,
      sinhVienMoi.cccd,
      sinhVienMoi.tenBo,
      sinhVienMoi.namSinhBo,
      sinhVienMoi.ngheNghiepBo,
      sinhVienMoi.sdtBo,
      sinhVienMoi.tenMe,
      sinhVienMoi.namSinhMe,
      sinhVienMoi.ngheNghiepMe,
      sinhVienMoi.sdtMe,
      sinhVienMoi.idKhoa,
      sinhVienMoi.idtk,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã thêm sinh viên: ", { idsv: res.insertId, ...sinhVienMoi });
      result(null, { idsv: res.insertId, ...sinhVienMoi });
    }
  );
};

SinhVien.Sua = (idsv, sinhVien, result) => {
  sql.query(
    "UPDATE sinhvien SET tenSV = ?, ngaySinh = ?, laNam = ?, kyTucXa = ?, queQuan = ?, diaChi = ?, sdt = ?, cccd = ?, " +
    "tenBo = ?, namSinhBo = ?, ngheNghiepBo = ?, sdtBo = ?, tenMe = ?, namSinhMe = ?, ngheNghiepMe = ?, sdtMe = ?, idKhoa = ?, idtk = ? WHERE idsv = ?",
    [
      sinhVien.tenSV,
      sinhVien.ngaySinh,
      sinhVien.laNam,
      sinhVien.kyTucXa,
      sinhVien.queQuan,
      sinhVien.diaChi,
      sinhVien.sdt,
      sinhVien.cccd,
      sinhVien.tenBo,
      sinhVien.namSinhBo,
      sinhVien.ngheNghiepBo,
      sinhVien.sdtBo,
      sinhVien.tenMe,
      sinhVien.namSinhMe,
      sinhVien.ngheNghiepMe,
      sinhVien.sdtMe,
      sinhVien.idKhoa,
      sinhVien.idtk,
      idsv,
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
      console.log("Đã cập nhật sinh viên: ", { idsv: idsv, ...sinhVien });
      result(null, { idsv: idsv, ...sinhVien });
    }
  );
};

SinhVien.Xem = (idsv, result) => {
  sql.query(`SELECT * FROM sinhvien WHERE idsv = ${idsv}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Xem sinh viên: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

SinhVien.TimKiem = (tuKhoa, result) => {
  let query = "SELECT * FROM sinhvien";
  if (tuKhoa) {
    query += ` WHERE tensv LIKE '%${tuKhoa}%' OR idsv LIKE '%${tuKhoa}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Tìm thấy sinh viên: ", res);
    result(null, res);
  });
};
module.exports = SinhVien;
