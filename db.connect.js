import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://arun:arun2nly2@school.b6qkdnb.mongodb.net/football-udemy?retryWrites=true&w=majority"
    );

    console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
  }
};

export { connectDB };
