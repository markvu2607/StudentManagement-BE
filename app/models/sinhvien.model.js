import { queryDB } from "../../database.js";

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
  queryDB(
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
      console.log("Đã thêm sinh viên: ", {
        idsv: res.insertId,
        ...sinhVienMoi,
      });
      result(null, { idsv: res.insertId, ...sinhVienMoi });
    }
  );
};

SinhVien.Sua = (idsv, sinhVien, result) => {
  queryDB(
    "UPDATE sinhvien SET tenSV = ?, ngaySinh = ?, laNam = ?, kyTucXa = ?, queQuan = ?, diaChi = ?, sdt = ?, cccd = ?, " +
      "tenBo = ?, namSinhBo = ?, ngheNghiepBo = ?, sdtBo = ?, tenMe = ?, namSinhMe = ?, ngheNghiepMe = ?, sdtMe = ?, idKhoa = ? WHERE idsv = ?",
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
  queryDB(`SELECT * FROM sinhvien WHERE idsv = ${idsv}`, (err, res) => {
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
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Tìm thấy sinh viên: ", res);
    result(null, res);
  });
};

SinhVien.ThongKeTheoLop = (idLop, result) => {
  queryDB(
    `SELECT sinhvien.idsv, sinhvien.tensv, khoa.tenKhoa, lophocphan.tenLop, lophocphan.trangThai
  FROM sinhvien
  INNER JOIN khoa ON sinhvien.idKhoa = khoa.idKhoa
  INNER JOIN dkyhocphan ON sinhvien.idsv = dkyhocphan.idsv
  INNER JOIN lophocphan ON dkyhocphan.idLop = lophocphan.idLop WHERE lophocphan.idLop = ${idLop}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Xem sinh viên theo lớp học phần: ", res);
      result(null, res);
    }
  );
};

SinhVien.ThongKeKTX = (kyTucXa, result) => {
  let query = "SELECT * FROM sinhvien";
  if (kyTucXa) query += ` WHERE kyTucXa = ${kyTucXa};`;
  console.log(query);
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Sinh viên hiện ở trong ktx: ", res);
    result(null, res);
  });
};

SinhVien.ThongKeHocBong = (idKhoa, idky, gioiHan, result) => {
  let query =
    `SELECT sinhvien.idsv, sinhvien.tensv, khoa.tenKhoa, kyHoc.tenKyHoc, diem.diemTichLuy AS DiemTichLuy, diemrenluyen.diem AS DiemRenLuyen` +
    ` FROM sinhvien` +
    ` INNER JOIN (SELECT * FROM khoa WHERE khoa.idKhoa = ${idKhoa}) AS khoa ON sinhvien.idKhoa = khoa.idKhoa` +
    ` INNER JOIN (SELECT avg(F_ConvertCtoN(diem.diemHeSo4)) AS diemTichLuy, idsv, idLop FROM diem GROUP BY idsv, idLop) AS diem ON sinhvien.idsv = diem.idsv` +
    ` INNER JOIN diemrenluyen ON sinhvien.idsv = diemrenluyen.idsv` +
    ` INNER JOIN (SELECT * FROM kyHoc WHERE kyHoc.idky = '${idky}) AS kyHoc ON diemrenluyen.idky = kyHoc.idky` +
    ` WHERE diem.diemTichLuy > 3.2 AND diemrenluyen.diem > 70` +
    ` Group By sinhvien.idsv, kyHoc.tenKyHoc, diem.diemTichLuy` +
    ` ORDER BY (diem.diemTichLuy + diemrenluyen.diem) DESC`;
  if (gioiHan) query += ` LIMIT ${gioiHan};`;
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Sinh viên có học bổng: ", res);
    result(null, res);
  });
};

SinhVien.ThongKeHocPhi = (idKhoa, idky, tinhTrang, result) => {
  let query =
    `SELECT sinhvien.idsv, sinhvien.tensv, kyHoc.tenKyHoc, khoa.tenKhoa, hocphi.tongTien, hocphi.tinhTrang` +
    ` FROM sinhvien` +
    ` INNER JOIN khoa ON sinhvien.idKhoa = khoa.idKhoa` +
    ` INNER JOIN hocphi ON sinhvien.idsv = hocphi.idsv` +
    ` INNER JOIN kyHoc ON hocphi.idky = kyHoc.idky`;
  if (idKhoa || idky || tinhTrang) {
    query += ` WHERE khoa.idKhoa LIKE '${idKhoa}' AND kyHoc.idky LIKE '${idky}' AND hocphi.tinhTrang LIKE '${tinhTrang}'`;
  }
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Sinh viên: ", res);
    result(null, res);
  });
};

SinhVien.DaDangKyHoc = (idsv, idky, result) => {
  let query = `SELECT lophocphan.idLop, lophocphan.tenLop, lophocphan.thoiGianBd, lophocphan.thoiGianKt, lophocphan.phongHoc, giangvien.tengv, (concat(dangKy.soSinhVien, "/",lophocphan.soLuong)) AS siSo, monhoc.soTinChi, monhoc.tienHoc
  FROM lophocphan
  INNER JOIN monhoc ON lophocphan.idmh = monhoc.idmh
  INNER JOIN giangvien ON lophocphan.idgv = giangvien.idgv
  INNER JOIN (SELECT idlop, count(idLop) AS soSinhVien FROM dkyhocphan GROUP BY idLop) AS dangKy ON lophocphan.idLop = dangKy.idLop
  INNER JOIN dkyhocphan ON lophocphan.idLop = dkyhocphan.idLop
  WHERE dkyhocphan.idsv = ${idsv}`;
  if (idky) {
    query += ` AND lophocphan.idky = ${idky}`;
  }
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Học phần đã đăng ký: ", res);
    result(null, res);
  });
};

SinhVien.CoTheDangKyHoc= (idmh, result) => {
  let query = `SELECT lophocphan.idLop, lophocphan.tenLop, lophocphan.thoiGianBd, lophocphan.thoiGianKt, lophocphan.phongHoc, giangvien.tengv, lophocphan.idLop, COALESCE(dkyhocphan.soSinhVien,'0') AS daDangKy ,lophocphan.soLuong, monhoc.soTinChi, monhoc.tienHoc
  FROM lophocphan
  INNER JOIN monhoc ON lophocphan.idmh = monhoc.idmh
  INNER JOIN giangvien ON lophocphan.idgv = giangvien.idgv
  LEFT JOIN (SELECT idsv, idlop, count(idLop) AS soSinhVien FROM dkyhocphan GROUP BY idLop, idsv) AS dkyhocphan 
  ON lophocphan.idLop = dkyhocphan.idLop OR (soSinhVien is null)
  WHERE lophocphan.trangThai = "dangky"`;
  if (idmh) {
    query += ` AND lophocphan.idmh = ${idmh}`;
  }
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Học phần có thể đăng ký: ", res);
    result(null, res);
  });
};


SinhVien.DangKyHoc = (idsv, idLop, result) => {
  let query = `INSERT INTO dkyhocphan SET idsv = ${idsv}, idLop = ${idLop};`;
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Đăng ký học phần: ", { res });
    result(null, res);
  });
};

SinhVien.HuyHocPhan = (idsv, idlop, result) => {
  let query = `DELETE FROM dkyhocphan WHERE idsv = ${idsv} AND idLop = ${idlop};`;
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Hủy học phần: ", res);
    result(null, res);
  });
};

export default SinhVien;
