
// require('dotenv').config({path:"./env"})
import dotenv from 'dotenv'
import connectDB from './db/db_connect.js'


dotenv.config({
    path:"./env"
})

connectDB()












// import mongoose from 'mongoose';
// import express from 'express'
// import { DB_NAME } from './constants';


// const app = express()

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//         app.on('error', (error) => console.log('ERROR', error))
//         app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))

//     } catch (error) {
//         console.error("ERROR", error)
//         throw error
//     }
// })()