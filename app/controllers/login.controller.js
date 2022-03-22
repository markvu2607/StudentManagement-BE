import { queryDB } from "../../database.js";
import bcript from "bcrypt";

export const login = (req, res) => {
  try {
    queryDB(`SELECT * FROM taikhoan`, (err, result) => {
      const listAccount = [...JSON.parse(JSON.stringify(result))];
      const account = listAccount.find(
        (account) => account.tenDangNhap == req.body.username
      );

      if (!account) {
        res.status(200).json({ error: "Account not exist" });
      } else {
        const validPass = bcript.compareSync(
          req.body.password,
          account.matKhau
        );
        if (!validPass) {
          res.status(200).json({ error: "Password incorrect" });
        } else {
          if (account.chucNang == "giangvien")
            queryDB(
              `SELECT * FROM giangvien WHERE idtk = ?`,
              account.idtk,
              (err, result) => {
                const user = JSON.parse(JSON.stringify(result[0]));
                user.taiKhoan = JSON.parse(JSON.stringify(account));
                delete user.idtk;
                res.status(200).json(user);
              }
            );
          else if (account.chucNang == "sinhvien")
            queryDB(
              `SELECT * FROM sinhvien WHERE idtk = ?`,
              account.idtk,
              (err, result) => {
                const user = JSON.parse(JSON.stringify(result[0]));
                user.taiKhoan = JSON.parse(JSON.stringify(account));
                delete user.idtk;
                res.status(200).json(user);
              }
            );
          else {
            const user = {};
            user.taiKhoan = JSON.parse(JSON.stringify(account));
            res.status(200).json(user);
          }
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
