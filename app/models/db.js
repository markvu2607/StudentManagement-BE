const mysql = require("mysql");
const dbConfig = require("../config/db_config.js");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Kết nối thành công tới cơ sở dữ liệU.");
});
module.exports = connection;