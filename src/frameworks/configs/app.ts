
import  express,{ Express }  from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import adminRouter from "../routes/adminRouter";
import userRouter from "../routes/usersRouter";



const app:Express=express()


//parce json bodys
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser

app.use(cookieParser())

//cors

app.use(
    cors({
        origin:"http://localhost:5000",
        credentials:true,
    })
)

// Routes
app.use("/user", userRouter);
app.use('/admin',adminRouter);


export default app;