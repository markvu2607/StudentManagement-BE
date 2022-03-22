import { queryDB } from "../../database.js";

const LichThi = function (lichThi) {
  this.thoiGian = lichThi.thoiGian;
  this.phongThi = lichThi.phongThi;
  this.idLop = lichThi.idLop

};

LichThi.Them = (lichThi, result) => {
  queryDB(
    "INSERT INTO lichthi SET phongThi = ?, thoiGian = ?, idLop = ?",
    [lichThi.phongThi, lichThi.thoiGian, lichThi.idLop],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Đã tạo lịch thi");
      result(null, { idlt: res.insertId, ...lichThi });
    });
};

LichThi.Sua = (lichThi, result) => {
  queryDB(
    "UPDATE lichthi SET phongThi = ?, thoiGian = ? WHERE idLop = ?",
    [lichThi.phongThi, lichThi.thoiGian, lichThi.idLop],
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
      console.log("Đã cập nhật lich thi cho lop id: ", lichThi.idLop);
      result(null, { ...lichThi });
    }
  );
};

LichThi.getByIDLop = (idLop, result) => {
  queryDB("Select * from lichthi where idLop = ?", idLop,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Xem lịch thi: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
}

export default LichThi;