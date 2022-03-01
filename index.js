
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mysql from 'mysql'
import dotenv from 'dotenv'
import login from './routers/login.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '30mb'
}))
app.use(cors())

app.use('/login', login)

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

db.connect(err => {
    if (err) throw err
    console.log('Connected to DB')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})

