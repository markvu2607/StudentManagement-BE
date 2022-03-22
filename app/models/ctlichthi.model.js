import { queryDB } from "../../database.js";

const CtLichThi = function (ctLichThi) {
  this.idsv = ctLichThi.idsv
  this.idlt = ctLichThi.idlt
  this.sbd = ctLichThi.sbd
};

CtLichThi.Them = (ctLichThi, result) => {
  queryDB(
    "INSERT INTO ctlichthi SET idsv = ?, idlt = ?, sbd = ?",
    [ctLichThi.idsv, ctLichThi.idlt, ctLichThi.sbd],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo chi tiet lịch thi");
      result(null, { idlt: res.insertId, ...ctLichThi });
    });
};

export default CtLichThi;