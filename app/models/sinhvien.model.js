const sql = require("./db.js");

const SinhVien = function (sinhVien) {
  this.tenSV = sinhVien.tenSV;
  this.ngaySinh = sinhVien.ngaySinh;
  this.gioiTinh = sinhVien.gioiTinh;
  this.queQuan = sinhVien.queQuan;
  this.diaChi = sinhVien.diaChi;
  this.sdt = sinhVien.sdt;
  this.cccd = sinhVien.cccd;
  this.idtk = sinhVien.idtk;
  this.tenBo = sinhVien.tenBo;
  this.namSinhBo = sinhVien.namSinhBo;
  this.ngheNghiepBo = sinhVien.ngheNghiepBo;
  this.sdtBo = sinhVien.sdtBo;
  this.tenMe = sinhVien.tenMe;
  this.namSinhMe = sinhVien.namSinhMe;
  this.ngheNghiepMe = sinhVien.ngheNghiepMe;
  this.sdtMe = sinhVien.sdtMe;
};

SinhVien.Them = (sinhVienMoi, result) => {
  sql.query(
    "INSERT INTO sinhvien SET TENSV = ?, NGAYSINH = ?, GIOITINH = ?, QUEQUAN = ?, DIACHI = ?, SDT = ?, CCCD = ?, IDTK = ?, " +
      "TENBO = ?, NAMSINHBO = ?, NGHENGHIEPBO = ?, SDTBO = ?, TENME = ?, NAMSINHME = ?, NGHENGHIEPME = ?, SDTME = ?",
    [
      sinhVienMoi.tenSV,
      sinhVienMoi.ngaySinh,
      sinhVienMoi.gioiTinh,
      sinhVienMoi.queQuan,
      sinhVienMoi.diaChi,
      sinhVienMoi.sdt,
      sinhVienMoi.cccd,
      sinhVienMoi.idtk,
      sinhVienMoi.tenBo,
      sinhVienMoi.namSinhBo,
      sinhVienMoi.ngheNghiepBo,
      sinhVienMoi.sdtBo,
      sinhVienMoi.tenMe,
      sinhVienMoi.namSinhMe,
      sinhVienMoi.ngheNghiepMe,
      sinhVienMoi.sdtMe,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo tài khoản: ", { idtk: res.insertId, ...sinhVienMoi });
      result(null, { idtk: res.insertId, ...sinhVienMoi });
    }
  );
};

SinhVien.Sua = (id, sinhVien, result) => {
  sql.query(
    "UPDATE sinhvien SET TENSV = ?, NGAYSINH = ?, GIOITINH = ?, QUEQUAN = ?, DIACHI = ?, SDT = ?, CCCD = ?, IDTK = ?, " +
      "TENBO = ?, NAMSINHBO = ?, NGHENGHIEPBO = ?, SDTBO = ?, TENME = ?, NAMSINHME = ?, NGHENGHIEPME = ?, SDTME = ? WHERE IDSV = ?",
    [
      sinhVien.tenSV,
      sinhVien.ngaySinh,
      sinhVien.gioiTinh,
      sinhVien.queQuan,
      sinhVien.diaChi,
      sinhVien.sdt,
      sinhVien.cccd,
      sinhVien.idtk,
      sinhVien.tenBo,
      sinhVien.namSinhBo,
      sinhVien.ngheNghiepBo,
      sinhVien.sdtBo,
      sinhVien.tenMe,
      sinhVien.namSinhMe,
      sinhVien.ngheNghiepMe,
      sinhVien.sdtMe,
      id,
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
      console.log("Đã cập nhật sinh viên: ", { id: id, ...sinhVien });
      result(null, { id: id, ...sinhVien });
    }
  );
};

SinhVien.Xem = (id, result) => {
  sql.query(`SELECT * FROM sinhvien WHERE IDSV = ${id}`, (err, res) => {
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
    query += ` WHERE TENSV LIKE '%${tuKhoa}%' OR IDSV LIKE '%${tuKhoa}%'`;
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
