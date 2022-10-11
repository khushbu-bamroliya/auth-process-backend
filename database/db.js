import mongoose from "mongoose";

const connectDB = async (userName, password) => {
  const URL = `mongodb+srv://rishiv:rishiv%4017@cluster0.pie4pxq.mongodb.net/auth`;
  try {
    mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("Connected Successfully..");
  } catch (error) {
    console.log("error while connecting database", error);
  }
};

export default connectDB;
