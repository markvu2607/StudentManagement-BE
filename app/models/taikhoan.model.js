const sql = require("./db.js");

const TaiKhoan = function (taiKhoan) {
  this.tenDangNhap = taiKhoan.tenDangNhap;
  this.matKhau = taiKhoan.matKhau;
  this.chucNang = taiKhoan.chucNang;
  this.trangThai = taiKhoan.trangThai;
};

TaiKhoan.Them = (taiKhoanMoi, result) => {
  sql.query(
    "INSERT INTO taikhoan SET tenDangNhap = ?, matKhau = ?, chucNang = ?, trangThai = ?",
    [
      taiKhoanMoi.tenDangNhap,
      taiKhoanMoi.matKhau,
      taiKhoanMoi.chucNang,
      taiKhoanMoi.trangThai,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo tài khoản: ", { idtk: res.insertId, ...taiKhoanMoi });
      result(null, { idtk: res.insertId, ...taiKhoanMoi });
    }
  );
};

TaiKhoan.Sua = (idtk, taiKhoan, result) => {
  sql.query(
    "UPDATE taikhoan SET tenDangNhap = ?, matKhau = ?, chucNang = ?, trangThai = ? WHERE idtk = ?",
    [
      taiKhoan.tenDangNhap,
      taiKhoan.matKhau,
      taiKhoan.chucNang,
      taiKhoan.trangThai,
      idtk,
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
      console.log("Đã cập nhật tài khoản: ", { idtk: idtk, ...taiKhoan });
      result(null, { idtk: idtk, ...taiKhoan });
    }
  );
};

TaiKhoan.Khoa = (idtk, result) => {
  sql.query(
    "UPDATE taikhoan SET trangThai = 0 WHERE idtk = ?", idtk,
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
      console.log("Đã khóa tài khoản: ", { idtk: idtk });
      result(null, idtk);
    }
  );
};
module.exports = TaiKhoan;
