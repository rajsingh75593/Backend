// require('dotenv').config({path:"./env"})
import dotenv from "dotenv";
import connectDB from "./db_connect.js";
import { app } from "./app.js";

dotenv.config({
  path: ".env", 
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDb Connection Fail!!!", error);
  });






  



//Method second 👍

// import mongoose from 'mongoose';
// import express from 'express'
// import { DB_NAME } from './constants';

// const app = express()

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//         app.on('error', (error) => console.log('ERROR', error))
//         app.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${process.env.PORT}`))

//     } catch (error) {
//         console.error("ERROR", error)
//         throw error
//     }
// })()
