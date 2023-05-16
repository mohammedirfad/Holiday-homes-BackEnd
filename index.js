import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import mongoose from 'mongoose';
import DBconnect from './config/DbConnection.js';
import AuthRoute from './routes/auth.js';
import Host from './routes/user/Host.js';
import bodyParser from 'body-parser';
import AdminRoute from './routes/admin/admin.js';
import chatRoute from './routes/user/ChatRoute.js';
import Message from './routes/user/MessageRoute.js';





const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("tiny"));
// app.use(express.urlencoded({ limit: "300kb", extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const corsOptions = {
    origin: 'https://holiday-homes-frondend.onrender.com',
    // origin: '',
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
app.use(cors(corsOptions))


app.use("/", AuthRoute);
app.use('/become-a-host/',Host);
app.use('/admin/',AdminRoute);
app.use('/chat/',chatRoute);
app.use('/message',Message)


DBconnect();
mongoose.connection.on("disconnected", () =>{
    console.log("mongo disconnected!")
})




app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
})