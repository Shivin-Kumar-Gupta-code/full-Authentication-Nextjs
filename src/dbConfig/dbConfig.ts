import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });


export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MONGODB CONNECTED !");
    });

    connection.on("error", (err) => {
      console.log("MONGODB CONNECTION FAILED" + err);
      console.log("Mongo URI:", process.env.MONGO_URI);
      process.exit();
    });
  } catch (error) {
    console.log("Something went Wrong !");
    console.log(error);
  }
}
