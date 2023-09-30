// Async_Express_DB_Client_ES6.mjs
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectionString = process.env.ATLAS_URI || "";

mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        console.log("Connectied to MongoDB database"); 
    })
    .catch((e) => console.log(e.message));

const client = mongoose.connection;

export default client;