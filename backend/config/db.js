// const mongoose = require('mongoose');

// const connectDB = async() => {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/book-recommendation',{
//             userNewUrlParser: true,
//             userUnifiedTopology: true,
//         });
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.error('MongoDB connection failed :',err.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;


//MongoDB Connection...
// import mongoose from "mongoose";

import mongoose from "mongoose";

const Connection = async () => {
  const URI =
    "mongodb+srv://touqeeransari:Ansari@cluster0.fgmlj61.mongodb.net/?retryWrites=true&w=majority";

  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully...");
  } catch (error) {
    console.error("Error while connecting to the database:", error.message);
  }
};

export default Connection;