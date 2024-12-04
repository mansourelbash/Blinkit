import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import orderRouter from './route/order.route.js'
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

app.use('/api/user',userRouter)
app.use('/api/user',orderRouter)

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log("server is starting on port", port)
    })
})
