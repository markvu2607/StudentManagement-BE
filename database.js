import mysql from 'mysql'

export const queryDB = (...params) => {
  const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  });

  con.connect(function (err) {
    if (err) throw err;
    con.query(...params);

    con.end()
  });
}