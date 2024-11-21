import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
const app = express()
dotenv.config()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy: false
}))

const port = 8000 || process.env.PORT


app.get('/',(req, res)=>{
  res.json({message: "hello world !"})
})

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log("server is starting on port", port)
    })
})
