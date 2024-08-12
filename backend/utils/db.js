// import dotenv from 'dotenv';
// dotenv.config();
import mongoose from "mongoose"
const dbconnection = () => {
    const connection = async () => {
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("mongodb connected successfully");
        }).catch((err) => {
            console.log(err)
        })
    }
    connection();
}

export default dbconnection;