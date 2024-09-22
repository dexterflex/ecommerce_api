// getting-started.js
import mongoose from "mongoose";

async function main() {
    const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/ecommerce-api'
    try {
        await mongoose.connect(DB_URL);
        console.log("mongoose connected");
    }
    catch (err) {
        console.log(err.message)
    }
}

export default main;