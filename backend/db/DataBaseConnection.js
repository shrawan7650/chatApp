import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
export const connectDb = ()=>{
try {
    mongoose.connect(process.env.MONGO_URI)
console.log("Database Coonect Suusccesfully")
} catch (error) {
  console.log(error.message);
  process.exit(1);
}

}
