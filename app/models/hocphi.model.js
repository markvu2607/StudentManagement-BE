import { queryDB } from "../../database.js";

const HocPhi = function () {
};

HocPhi.DaThu = (idsv, result) => {
    let query = `SELECT hocphi.*, kyHoc.tenKyHoc 
    FROM hocphi INNER JOIN kyHoc ON hocphi.idky = kyHoc.idky 
    WHERE hocphi.tinhTrang = 'dathu' AND hocphi.idsv = ${idsv}`;
    queryDB(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Học phí đã thu: ", res);
      result(null, res);
    });
  };

HocPhi.ChuaThu = (idsv, result) => {
  let query = `SELECT hocphi.*, kyHoc.tenKyHoc 
  FROM hocphi INNER JOIN kyHoc ON hocphi.idky = kyHoc.idky
  WHERE hocphi.tinhTrang = 'chuathu' AND hocphi.idsv = ${idsv}`;
  queryDB(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Học phí chưa thu: ", res);
    result(null, res);
  });
};

export default HocPhi;
