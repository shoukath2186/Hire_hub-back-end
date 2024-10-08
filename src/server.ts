import app from './frameworks/configs/app'
import connectDB from "./frameworks/configs/db";
import * as dotenv from 'dotenv';


dotenv.config();
connectDB();


const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
   
  console.log(`server started running ${PORT}`); 

});