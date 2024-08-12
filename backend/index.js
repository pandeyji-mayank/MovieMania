import express from 'express';
import dotenv from 'dotenv';
import dbconnection from './utils/db.js'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
dotenv.config();
dbconnection();

const app = express();
const PORT = process.env.PORT;


//middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
}

app.use(cors(corsOptions));

//api
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})