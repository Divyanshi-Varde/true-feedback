import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const url = process.env.MONGODB_URI!;

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database!");
    return;
  }

  try {
    const db = await mongoose.connect(url);
    console.log(db);
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
