import express from "express"
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors';
import mongoose from "mongoose"
import router from "./router"
import session from "express-session"
import { corsMiddleware } from "./cors"




const app = express()




app.use(cookieParser())
app.use(bodyParser.json())
app.use(corsMiddleware);



const server = http.createServer(app)


server.listen(8000, () => { 
    console.log("Server running on port http://localhost:8000/")
})

const MONGO_URL = 'mongodb+srv://glakuta:Muflonik345@database1.rwstfu3.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)

mongoose.connection.on('error', (error: Error) => console.log("Error!"))



app.use('/', router())
