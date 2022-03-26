import { queryDB } from "../../database.js";

const GiangVien = function (giangVien) {
  this.tengv = giangVien.tengv;
  this.tenLop = giangVien.tenLop;
  this.tengv = giangVien.tengv;
  this.ngaySinh = giangVien.ngaySinh;
  this.laNam = giangVien.laNam;
  this.queQuan = giangVien.queQuan;
  this.diaChi = giangVien.diaChi;
  this.sdt = giangVien.sdt;
  this.cccd = giangVien.cccd;
  this.email = giangVien.email;
  this.idKhoa = giangVien.idKhoa;
  this.idtk = giangVien.idtk;
};

GiangVien.Them = (giangVienMoi, result) => {
  queryDB(
    "INSERT INTO giangvien SET tengv = ?, ngaySinh = ?, laNam = ?, queQuan = ?, diaChi = ?, sdt = ?, cccd = ?, email = ?, idKhoa = ?, idtk =?",
    [
      giangVienMoi.tengv,
      giangVienMoi.ngaySinh,
      giangVienMoi.laNam,
      giangVienMoi.queQuan,
      giangVienMoi.diaChi,
      giangVienMoi.sdt,
      giangVienMoi.cccd,
      giangVienMoi.email,
      giangVienMoi.idKhoa,
      giangVienMoi.idtk,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã thêm giảng viên: ", { idgv: res.insertId, ...giangVienMoi });
      result(null, { idgv: res.insertId, ...giangVienMoi });
    }
  );
};

GiangVien.Sua = (idgv, giangVien, result) => {
  queryDB(
    "UPDATE giangvien SET tengv = ?, ngaySinh = ?, laNam = ?, queQuan = ?, diaChi = ?, sdt = ?, cccd = ?, email = ?, idKhoa = ?, idtk =? WHERE idgv = ?",
    [
      giangVien.tengv,
      giangVien.ngaySinh,
      giangVien.laNam,
      giangVien.queQuan,
      giangVien.diaChi,
      giangVien.sdt,
      giangVien.cccd,
      giangVien.email,
      giangVien.idKhoa,
      giangVien.idtk,
      idgv,
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
      console.log("Đã cập nhật giảng viên: ", { idgv: idgv, ...giangVien });
      result(null, { idgv: idgv, ...giangVien });
    }
  );
};

GiangVien.Xem = (idgv, result) => {
  queryDB(`SELECT *,taikhoan.tenDangNhap FROM giangvien,taikhoan WHERE giangvien.idgv = ${idgv} and taikhoan.idtk = giangvien.idtk`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Xem giảng viên: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

GiangVien.TimKiem = (tuKhoa, result) => {
  let query = "SELECT * FROM giangvien";
  if (tuKhoa) {
    query += ` WHERE tengv LIKE '%${tuKhoa}%'`;
  }
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Tìm thấy giảng viên: ", res);
    result(null, res);
  });
};

export default GiangVien;
