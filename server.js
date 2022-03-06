const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Chào Mừng Bạn Đã Đến Với Hệ Thống Quản Lý Sinh Viên." });
});

require("./app/routes/taikhoan.routes.js")(app);
require("./app/routes/sinhvien.routes.js")(app);
require("./app/routes/khoa.routes.js")(app);
require("./app/routes/ctdaotao.routes.js")(app);
require("./app/routes/bangtin.routes.js")(app);
require("./app/routes/monhoc.routes.js")(app);
require("./app/routes/lophocphan.routes.js")(app);
require("./app/routes/diemdanh.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}.`);
});
