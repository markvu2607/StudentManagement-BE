import { queryDB } from "../database.js"

export const login = (req, res) => {
  try {
    queryDB(`SELECT * FROM taikhoan`, (err, result, fields) => {
      const listAccount = [...JSON.parse(JSON.stringify(result))];
      const account = listAccount.find(account => account.tendangnhap == req.body.username)

      if (!account) {
        res.status(200).json({ "error": "Account not exist" })
      } else {
        if (account.password != req.body.password) {
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