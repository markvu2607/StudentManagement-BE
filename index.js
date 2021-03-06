
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mysql from 'mysql'
import dotenv from 'dotenv'
import loginRoutes from './app/routers/login.routes.js'
import taiKhoanRoutes from "./app/routers/taikhoan.routes.js"
import sinhVienRoutes from "./app/routers/sinhvien.routes.js"
import khoaRoutes from "./app/routers/khoa.routes.js"
import ctDaoTaoRoutes from "./app/routers/ctdaotao.routes.js"
import bangTinRoutes from "./app/routers/bangtin.routes.js"
import monHocRoutes from "./app/routers/monhoc.routes.js"
import lopRoutes from "./app/routers/lop.routes.js"
import giangVienRoutes from "./app/routers/giangvien.routes.js"
import kyHocRoutes from "./app/routers/kyhoc.routes.js"
import diemRenLuyenRoutes from "./app/routers/diemrenluyen.routes.js"
import diemRoutes from "./app/routers/diem.routes.js"
import lichThiRoutes from "./app/routers/lichthi.routes.js"
import ctLichThiRoutes from "./app/routers/ctlichthi.routes.js"
import diemDanhRoutes from "./app/routers/diemdanh.routes.js"
import taiLieuRoutes from "./app/routers/tailieu.routes.js"
import hocPhiRoutes from "./app/routers/hocphi.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '30mb'
}))
app.use(cors())

app.use('/api/login', loginRoutes)
app.use('/api/taikhoan', taiKhoanRoutes)
app.use('/api/sinhvien', sinhVienRoutes)
app.use("/api/khoa", khoaRoutes);
app.use("/api/ctdaotao", ctDaoTaoRoutes);
app.use("/api/bangtin", bangTinRoutes);
app.use("/api/monhoc", monHocRoutes);
app.use("/api/lophocphan", lopRoutes);
app.use("/api/giangvien", giangVienRoutes);
app.use("/api/kyhoc", kyHocRoutes);
app.use("/api/diemrenluyen", diemRenLuyenRoutes);
app.use("/api/diem", diemRoutes);
app.use("/api/lichthi", lichThiRoutes)
app.use("/api/ctlichthi", ctLichThiRoutes)
app.use("/api/diemdanh", diemDanhRoutes);
app.use("/api/tailieu", taiLieuRoutes);
app.use("/api/hocphi", hocPhiRoutes);

mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
}).connect(err => {
    if (err) throw err
    console.log('Connected to DB')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})

