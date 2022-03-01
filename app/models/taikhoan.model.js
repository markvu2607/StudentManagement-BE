const sql = require("./db.js");

const TaiKhoan = function (taiKhoan) {
  this.tenDangNhap = taiKhoan.tenDangNhap;
  this.matKhau = taiKhoan.matKhau;
  this.chucNang = taiKhoan.chucNang;
  this.trangThai = taiKhoan.trangThai;
};

TaiKhoan.Them = (taiKhoanMoi, result) => {
  sql.query(
    "INSERT INTO taikhoan SET TENDANGNHAP = ?, MATKHAU = ?, CHUCNANG = ?, TRANGTHAI = ?",
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

TaiKhoan.Sua = (id, taiKhoan, result) => {
  sql.query(
    "UPDATE taikhoan SET TENDANGNHAP = ?, MATKHAU = ?, CHUCNANG = ?, TRANGTHAI = ? WHERE IDTK = ?",
    [
      taiKhoan.tenDangNhap,
      taiKhoan.matKhau,
      taiKhoan.chucNang,
      taiKhoan.trangThai,
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
      console.log("Đã cập nhật tài khoản: ", { id: id, ...taiKhoan });
      result(null, { id: id, ...taiKhoan });
    }
  );
};

TaiKhoan.Khoa = (id, result) => {
  sql.query(
    "UPDATE taikhoan SET TRANGTHAI = 0 WHERE IDTK = ?", id,
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
      console.log("Đã khóa tài khoản: ", { id: id });
      result(null, id);
    }
  );
};
module.exports = TaiKhoan;
