import mongoose from "mongoose";
const connectToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to DB: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connecting to DB in connectToDB: ", error);
        process.exit(1);
    }
}

export default connectToMongoDB;