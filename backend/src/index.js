import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app,server} from './lib/socket.js';

app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(cors(
    {
        origin:process.env.FRONTEND_URL,
        credentials:true,
    }
))
const PORT = process.env.PORT || 5000;
connectDB();
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)