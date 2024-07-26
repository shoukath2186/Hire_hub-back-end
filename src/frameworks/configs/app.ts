
import  express,{ Express }  from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import adminRouter from "../routes/adminRouter";




const app:Express=express()


//parce json bodys

app.use(express.json());

app.use(express.urlencoded({extended:true}));

// cookie parser

app.use(cookieParser())

//cors

app.use(
    cors({
        origin:"http://localhost:5000",
        credentials:true,
    })
)

app.use('/admin',adminRouter)


export default app;