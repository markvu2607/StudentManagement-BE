import { queryDB } from "../../database.js"
import bcript from "bcrypt"

export const login = (req, res) => {
  try {
    queryDB(`SELECT * FROM taikhoan`, (err, result) => {
      const listAccount = [...JSON.parse(JSON.stringify(result))];
      const account = listAccount.find(account => account.tenDangNhap == req.body.username)

      if (!account) {
        res.status(200).json({ "error": "Account not exist" })
      } else {
        const validPass = bcript.compareSync(req.body.password, account.matKhau)
        if (!validPass) {
          res.status(200).json({ "error": "Password incorrect" })
        } else {
          res.status(200).json(account)
        }
      }
    })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}